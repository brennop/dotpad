<template>
  <div class="container">
    <h1 class="title">dotpad</h1>
    <form @submit.prevent="redirect" class="path">
      <label>
        <span>dotpad.vercel.app/</span>
        <input v-model="path" name="path" />
      </label>
      <button>Go</button>
    </form>

    <h2 v-if="visited.length > 0" class="recent">Recent files</h2>
    <ul class="visited-list">
      <li v-for="item in visited" :key="item">
        <router-link :to="item">{{ item }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      path: '',
    }
  },
  computed: {
    visited() {
      const visitedString = localStorage.getItem('visited') || '[]'
      return JSON.parse(visitedString)
    },
  },
  methods: {
    redirect() {
      this.$router.push(this.path)
    },
  },
})
</script>

<style>
.container {
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  display: block;
  font-size: 36px;
  margin: 24px;
}

.path {
  margin-bottom: 32px;
}

.recent {
  margin: 8px 0;
}

.visited-list {
  width: 300px;
}
</style>
