<template>
  <div
    id="app"
    class="relative flex flex-col min-h-full dark"
  >
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<style lang="postcss">
html, body, #app {
  height: 100%;
  @apply dark:bg-gray-800 bg-gray-800
}

#app {
  font-family: Menlo, 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
