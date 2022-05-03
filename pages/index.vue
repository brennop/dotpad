<template>
  <div class="home">
    <Title>dotpad</Title>
    <h1>dotpad</h1>

    <p class="subtitle">a dontpad.com clone</p>

    <form @submit.prevent="handleSubmit">
      <input v-model="input" />
      <button>go</button>
    </form>

    <ul>
      <li v-for="page in recent">
        <a :href="page">
          {{ page }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const router = useRouter();

const input = ref("");

const recent = JSON.parse(localStorage.getItem("visited"))

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

ul {
  width: 320px;
}

li a {
  display: block;
}
</style>
