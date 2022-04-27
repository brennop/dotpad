<template>
  <div>
    <Link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
    />
    <NuxtPage />
  </div>
</template>

<script>
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-sans/400-italic.css"
import "@fontsource/dm-sans/700-italic.css"
import "@fontsource/dm-mono"
</script>

<style>
body {
  font-family: "DM Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  margin: 0;
  padding: 0;
  font-size: 18px;

  color: #212526;
  background: #f6f6f6;
  transition: color 0.15s ease-out, background 0.15s ease-out;
}

* {
  box-sizing: border-box;
}

a,
a:visited {
  color: inherit;
}

@media (prefers-color-scheme: dark) {
  body {
    background: #222626;
    color: #e6e6e6;
  }
}
</style>
