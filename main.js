import "./style.scss";

import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { lowlight } from "lowlight";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";

const INIT_CONN_TIMEOUT = 3000;
const server = import.meta.env.VITE_DOTPAD_SERVER;

const app = document.querySelector("#app");
const name = location.pathname.slice(1);

if (name === "") {
  const visited = localStorage.getItem("visited");
  const visitedList = visited ? JSON.parse(visited) : [];

  app.innerHTML = `
    <div class="home">
      <h1>dotpad</h1>
      <form>
        <input></input>
        <button>go</button>
      </form>
      <h3>recent files</h3>
      <ul class="visited-list">
        ${visitedList
          .map(
            (link) => `
          <li>
            <a href="/${link}">
              <p>${link}</p>
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;

  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const path = document.querySelector("input").value;
    location.assign(path);
  });
} else {
  document.title = `${name} - dotpad`;

  app.innerHTML = `
  <div class="spinner">
    <span class="loader"></span>
  </div>
    `;

  const doc = new Y.Doc();
  const provider = new WebsocketProvider(server, name, doc);
  const _persistence = new IndexeddbPersistence(name, doc);

  async function notifyConnection() {
    return new Promise((resolve) => {
      setTimeout(resolve, INIT_CONN_TIMEOUT);

      const handleStatus = (event) => {
        if (event.status == "connected") {
          provider.off("status", handleStatus);
          resolve();
        }
      };

      provider.on("status", handleStatus);
    });
  }

  async function init() {
    await notifyConnection();

    const isEmpty = doc.getXmlFragment("default").length === 0;

    app.innerHTML = `
      <nav>
        <a href="/">dotpad</a>
      </nav>
      <div class="editor"></div>
    `;

    new Editor({
      element: document.querySelector(".editor"),
      extensions: [
        StarterKit.configure({
          history: false, // Collaboration comes with its own history extension
          codeBlock: false,
          document,
        }),
        Collaboration.configure({
          document: doc,
          field: "prosemirror",
        }),
        Image,
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
      ],
      content: "",
      autofocus: isEmpty,
    });
  }

  init();
}
