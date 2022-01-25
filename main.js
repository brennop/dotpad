import './style.css'

import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";

const server = 'wss://dotpad.fly.dev';

const name = location.pathname.slice(1);

const doc = new Y.Doc();
new WebsocketProvider('ws://localhost:1234', name, doc)
const provider = new IndexeddbPersistence(name, doc)

provider.on('synced', mount);

function mount() {
  const isEmpty = doc.getXmlFragment('default').length == 0;
  new Editor({
    element: document.querySelector('.editor'),
    extensions: [
      StarterKit.configure({
        history: false, // Collaboration comes with its own history extension
        document
      }),
      Collaboration.configure({
        document: doc
      })
    ],
    content: '',
    autofocus: isEmpty,
  })
}
