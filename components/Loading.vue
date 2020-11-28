<template>
  <div class="wrapper">
    <span
      class="loading dots"
      aria-hidden="true"
      role="progressbar"
      aria-label="Loading..."
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import 'text-spinners'

export default Vue.extend({})
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: grid;
  place-items: center;
}
</style>
