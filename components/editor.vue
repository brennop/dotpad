<template>
  <editor-content :editor="editor" class="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'

import StarterKit from '@tiptap/starter-kit'
import Collaboration from "@tiptap/extension-collaboration";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Link from "@tiptap/extension-link";

import { lowlight } from "lowlight/lib/common";

const { provider } = defineProps(["provider"])

async function notifyConnection() {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);

    const handleStatus = (event) => {
      if (event.status == "connected") {
        provider.off("status", handleStatus);
        resolve();
      }
    };

    provider.on("status", handleStatus);
  });
}

await notifyConnection();

const editor = useEditor({
  content: "",
  extensions: [
    StarterKit.configure({
      history: false, // Collaboration comes with its own history extension
      codeBlock: false,
      document,
    }),
    Collaboration.configure({
      document: provider.doc,
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
    Link,
  ]
})
</script>

<style lang="scss">
.editor {
  max-width: 72ch;
  margin: auto;
  padding: 96px 16px;

  font-family: sans-serif;

  :focus-within {
    outline: none;
  }
}

.ProseMirror {
  min-height: 200px;

  img {
    height: auto;
    max-width: 100%;
    border-radius: 0.5rem;
    margin: 2px 0;

    &.ProseMirror-selectednode {
      outline: 2px solid #68cef8;
    }
  }

  /** codeblocks */
  pre {
    background: #0d0d0ded;
    border-radius: 0.5rem;
    color: #fff;
    font-family: monospace;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }

    .hljs {
      color: #c9d1d9;
      background: #0d1117;
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
      /* prettylights-syntax-keyword */
      color: #ff7b72;
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
      /* prettylights-syntax-entity */
      color: #d2a8ff;
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-variable,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id {
      /* prettylights-syntax-constant */
      color: #79c0ff;
    }

    .hljs-regexp,
    .hljs-string,
    .hljs-meta .hljs-string {
      /* prettylights-syntax-string */
      color: #a5d6ff;
    }

    .hljs-built_in,
    .hljs-symbol {
      /* prettylights-syntax-variable */
      color: #ffa657;
    }

    .hljs-comment,
    .hljs-code,
    .hljs-formula {
      /* prettylights-syntax-comment */
      color: #8b949e;
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-tag,
    .hljs-selector-pseudo {
      /* prettylights-syntax-entity-tag */
      color: #7ee787;
    }

    .hljs-subst {
      /* prettylights-syntax-storage-modifier-import */
      color: #c9d1d9;
    }

    .hljs-section {
      /* prettylights-syntax-markup-heading */
      color: #1f6feb;
      font-weight: bold;
    }

    .hljs-bullet {
      /* prettylights-syntax-markup-list */
      color: #f2cc60;
    }

    .hljs-emphasis {
      /* prettylights-syntax-markup-italic */
      color: #c9d1d9;
      font-style: italic;
    }

    .hljs-strong {
      /* prettylights-syntax-markup-bold */
      color: #c9d1d9;
      font-weight: bold;
    }

    .hljs-addition {
      /* prettylights-syntax-markup-inserted */
      color: #aff5b4;
      background-color: #033a16;
    }

    .hljs-deletion {
      /* prettylights-syntax-markup-deleted */
      color: #ffdcd7;
      background-color: #67060c;
    }
  }

  li p {
    margin: 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }
  }

  li[data-checked="true"]>div>p {
    text-decoration: line-through;
  }

  p {
    text-align: justify;
    text-justify: auto;
  }

  a {
    cursor: pointer;
    &:visited {
      color: inherit;
    }
  }
}
</style>
