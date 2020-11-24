<template>
  <editor-content :editor="editor" class="editor" />
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
} from 'tiptap-extensions'

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
        ],
        content: '<p>Initial editor content</p>',
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.editor {
  max-width: 720px;
  margin: auto;
  padding: 96px 16px;
}
</style>
