import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

export default class Realtime extends Extension {
  provider: WebsocketProvider
  ytype: Y.XmlFragment

  constructor(options: { document?: string } = {}) {
    super(options)

    const serverUrl = process.env.NUXT_ENV_WEBSOCKET_SERVER

    if (!serverUrl) throw new Error('No server URL.')
    if (!options.document) throw new Error('No document name.')

    const ydoc = new Y.Doc()
    this.provider = new WebsocketProvider(serverUrl, options.document, ydoc)
    this.ytype = ydoc.getXmlFragment('prosemirror')
  }

  get name() {
    return 'realtime'
  }

  get plugins() {
    return [
      ySyncPlugin(this.ytype),
      yCursorPlugin(this.provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ]
  }
}
