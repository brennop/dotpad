<template>
  <div>
    <Header />
    <loading v-if="loading" />
    <editor v-else :ydoc="doc" :provider="provider" />
  </div>
</template>

<script>
import Vue from 'vue'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import title from 'title'
import Editor from '~/components/Editor.vue'
import Header from '~/components/Header.vue'
import Loading from '~/components/Loading.vue'

const serverUrl = process.env.NUXT_ENV_WEBSOCKET_SERVER || ''

export default Vue.extend({
  components: { Editor, Loading, Header },
  data() {
    const document = this.$route.params.pathMatch
    const doc = new Y.Doc()
    const provider = new WebsocketProvider(serverUrl, document, doc)

    return {
      doc,
      provider,
      loading: true,
    }
  },
  computed: {
    path() {
      return this.$route.params.pathMatch
    },
    documentName() {
      const [name] = this.path.split('/').slice(-1)
      return title(name)
    },
  },
  mounted() {
    this.provider.on('status', (event) => {
      if (event.status === 'connected') {
        this.loading = false
      }
    })

    const visitedString = localStorage.getItem('visited') || '[]'
    const visited = JSON.parse(visitedString)
    localStorage.setItem(
      'visited',
      JSON.stringify([...new Set([this.path, ...visited])])
    )
  },
  head() {
    return {
      title: `${this.documentName}  - dotpad`,
    }
  },
})
</script>
