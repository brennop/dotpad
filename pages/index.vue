<template>
  <div class="container">
    <h1 class="title">dotpad</h1>
    <form @submit.prevent="redirect">
      <span>www.dotpad.ml/</span>
      <input v-model="path" name="path" />
      <button>Go</button>
    </form>
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
</style>
