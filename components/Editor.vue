.
<template>
  <editor-content :editor="editor" class="editor" @click="editor.focus()" />
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
import { Doc } from 'yjs'
import { WebsocketProvider } from 'y-websocket'

export default {
  components: {
    EditorContent,
  },
  props: {
    ydoc: {
      type: Doc,
      required: true,
    },
    provider: {
      type: WebsocketProvider,
      required: true,
    },
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
          new TodoItem({
            nested: true,
          }),
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
          new Realtime({ ydoc: this.ydoc, provider: this.provider }),
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
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
.editor {
  max-width: 720px;
  margin: auto;
  padding: 96px 16px;

  &:focus,
  & > :focus-within {
    outline: none;
  }
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

.editor blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}

.editor blockquote > :first-child {
  margin-top: 0;
}

.editor blockquote > :last-child {
  margin-bottom: 0;
}
.editor p {
  margin-top: 0;
  margin-bottom: 10px;
}

.editor ol,
.editor ul {
  padding-left: 2em;
}

.editor li {
  word-wrap: break-all;
}

.editor img {
  max-width: 100%;
  border-radius: 4px;
  display: block;
  margin: 18px auto;
  transition: 0.1s ease-out;
}

img.ProseMirror-selectednode {
  box-shadow: 0px 0px 0px 3px #46c4f7;
  filter: brightness(0.95);
}

.editor h1,
.editor h2,
.editor h3,
.editor h4,
.editor h5,
.editor h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.editor pre {
  background: #8882;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  font-family: 'SFMono-Regular', Menlo, Consolas, 'PT Mono', 'Liberation Mono',
    Courier, monospace;
}

.editor :not(pre) > code {
  color: #eb5757;
  background: #8882;
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  font-weight: bold;
  font-family: 'SFMono-Regular', Menlo, Consolas, 'PT Mono', 'Liberation Mono',
    Courier, monospace;
  border-radius: 3px;
}

ul[data-type='todo_list'] {
  padding-left: 0;
}

li[data-type='todo_item'] {
  display: flex;
  flex-direction: row;
}

.todo-checkbox {
  border: 2px solid var(--color);
  height: 0.9em;
  width: 0.9em;
  box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.1em;
  background-color: transparent;
  transition: 0.2s background ease-out;
}

.todo-content {
  flex: 1;
  > p:last-of-type {
    margin-bottom: 0;
  }
  > ul[data-type='todo_list'] {
    margin: 0.5rem 0;
  }
}

li[data-done='true'] {
  > .todo-content {
    > p {
      text-decoration: line-through;
    }
  }
  > .todo-checkbox {
    background-color: var(--color);
  }
}
li[data-done='false'] {
  text-decoration: none;
}
</style>
