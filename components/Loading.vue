<template>
  <span
    class="loading dots"
    aria-hidden="true"
    role="progressbar"
    aria-label="Loading..."
  ></span>
</template>

<script>
import Vue from 'vue'
import 'text-spinners'

export default Vue.extend({})
</script>

<style scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
