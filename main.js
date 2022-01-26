import "./style.css";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";

const INIT_CONN_TIMEOUT = 5000;
const server = "wss://dotpad.fly.dev";

const name = location.pathname.slice(1);

const doc = new Y.Doc();
const websocket = new WebsocketProvider("ws://localhost:1234", name, doc);
const provider = new IndexeddbPersistence(name, doc);

async function notifyConnection() {
  return new Promise((resolve, reject) => {
    setTimeout(reject, INIT_CONN_TIMEOUT);

    const handleStatus = (event) => {
      if (event.status == "connected") {
        websocket.off("status", handleStatus);
        resolve();
      }
    };

    websocket.on("status", handleStatus);
  });
}

provider.on("synced", async () => {
  // check if document is available locally
  const isEmpty = doc.getXmlFragment("default").length == 0;

  if (isEmpty) {
    await notifyConnection().catch(() => {
      if (!confirm("Can't connect to server. Edit offline?")) {
        location.assign("/");
      }
    });
  }

  mount(isEmpty);
});

function mount(isEmpty) {
  new Editor({
    element: document.querySelector(".editor"),
    extensions: [
      StarterKit.configure({
        history: false, // Collaboration comes with its own history extension
        document,
      }),
      Collaboration.configure({
        document: doc,
      }),
    ],
    content: "",
    autofocus: isEmpty,
  });
}
