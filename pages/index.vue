<template>
  <div class="home">
    <h1>dotpad</h1>

    <p class="subtitle">a dontpad.com clone</p>

    <form @submit.prevent="handleSubmit">
      <input v-model="input"/>
      <button>go</button>
    </form>
  </div>
</template>

<script setup>
const router = useRouter();

const input = ref("");

function handleSubmit() {
  router.push(input.value)
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px;
  min-height: 100vh
}

.subtitle {
  font-family: 14px;
  color: #3F3F46;
}

input {
  padding: 4px 6px;
}

button {
  padding: 4px 6px;
}
</style>
