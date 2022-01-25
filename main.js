import './style.css'

import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

const server = 'wss://dotpad.fly.dev';

const name = location.pathname.slice(1);

const doc = new Y.Doc();
const provider = new WebsocketProvider('ws://localhost:1234', name, doc)

provider.on('status', (event) => {
  if (event.status === 'connected') {
    mount();
  }
})

function mount() {
  const app = document.querySelector('#app');
  document.querySelector('.spinner').remove();

  const element = document.createElement('div');
  element.classList.add('editor');
  app.appendChild(element);

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
    autofocus: true,
  })
}
