import { keymap } from 'prosemirror-keymap'
import { Extension } from 'tiptap'
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from 'y-prosemirror'
import * as Y from 'yjs'
import { Awareness } from 'y-protocols/awareness'

type Provider = {
  awareness: Awareness
}
export default class Realtime extends Extension {
  provider: Provider
  ytype: Y.XmlFragment

  constructor(options: { ydoc: Y.Doc; provider: Provider }) {
    super(options)

    this.ytype = options.ydoc.getXmlFragment('prosemirror')
    this.provider = options.provider
  }

  get name() {
    return 'realtime'
  }

  get plugins() {
    return [
      ySyncPlugin(this.ytype),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ]
  }
}
