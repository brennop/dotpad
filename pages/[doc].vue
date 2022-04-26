<template>
  <div>
    <nav>
      <a href="/">dotpad</a>
    </nav>
    <Suspense>
      <editor :provider="provider" />
    </Suspense>
  </div>
</template>

<script setup>
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";

const route = useRoute()
const name = route.params.doc;

const INIT_CONN_TIMEOUT = 3000;
const server = import.meta.env.VITE_DOTPAD_SERVER || "wss://dotpad.fly.dev";

const doc = new Y.Doc();
const provider = new WebsocketProvider(server, name, doc);
const _persistence = new IndexeddbPersistence(name, doc);
</script>

<style lang="scss">
nav {
  opacity: 0;
  padding: 0.5em;
  text-align: center;
  transition: opacity 0.2s ease-in;

  &:hover {
    opacity: 0.5;
  }

  a {
    text-decoration: none;
  }
}
</style>
