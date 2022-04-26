<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style>
body {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
  padding: 0;
  font-size: 18px;

  color: #1a1a1a;
  background: #f6f6f6;
  transition: color 0.15s ease-out, background 0.15s ease-out;
}

* {
  box-sizing: border-box;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #e6e6e6;
  }
}
</style>
