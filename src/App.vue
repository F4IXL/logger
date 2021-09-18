<template>
  <div
    id="app"
    class="relative flex flex-col min-h-full dark"
  >
    <Header />
    <router-view />
    <ul
      v-if="errors.length"
      class="bg-gray-900"
    >
      <li
        v-for="(error, i) in erros"
        :key="i"
      >
        ({{ error.url }}:{{ error.line }}) {{ error.error }}
      </li>
    </ul>
  </div>
</template>

<script>
import Header from './components/Header.vue'

const errors = []

window.onerror = (error, url, line) => {
  errors.push({
    error, url, line
  })
}

export default {
  components: {
    Header
  },
  data () {
    return {
      errors
    }
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
