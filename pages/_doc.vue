<template>
  <editor-content :editor="editor" class="editor" @click="editor.focus()">
  </editor-content>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Image,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  TrailingNode,
  Placeholder,
} from 'tiptap-extensions'
import Realtime from '@/utils/realtime'

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new TrailingNode({
            node: 'paragraph',
            notAfter: ['paragraph'],
          }),
          new Realtime({ document: this.$route.params.doc }),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write your document here...',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        content: '',
        autoFocus: true,
      }),
    }
  },
  computed: {
    document() {
      return this.$route.params.doc
    },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.editor {
  max-width: 720px;
  margin: auto;
  padding: 96px 16px;
}

.ProseMirror {
  min-height: 200px;
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}
</style>
