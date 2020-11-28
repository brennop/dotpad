<template>
  <header>
    <nuxt-link to="/">🏠 Home</nuxt-link>
    <button @click="switchMode">{{ buttonContent }}</button>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    currentMode() {
      return this.$colorMode.value
    },
    buttonContent() {
      switch (this.currentMode) {
        case 'dark':
          return '☀ Light Mode'
        case 'light':
          return '🌙 Dark Mode'
        default:
          return '🌙 Dark Mode'
      }
    },
  },
  methods: {
    switchMode() {
      if (this.currentMode === 'dark') this.$colorMode.preference = 'light'
      if (this.currentMode === 'light') this.$colorMode.preference = 'dark'
    },
  },
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  padding: 0.8em;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: 0.4s ease-out;

  &:hover {
    opacity: 1;
  }
}

button {
  border: none;
  background: none;
  border-radius: none;
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}
</style>
