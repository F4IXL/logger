<template>
  <router-link
    class="menu-item"
    :to="to || '/'"
  >
    <span class="text-left">
      <svg
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 2048 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#5e72e4"
          d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
        />
      </svg>
    </span>
    <span class="mx-4 font-normal text-md">
      <slot />
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    to: {
      type: String || Object || null,
      default: null
    }
  }
})
</script>

<style scoped lang="postcss">
  .menu-item {
    @apply hover:text-gray-800 font-thin text-gray-500 dark:text-gray-400 hover:bg-gray-100 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start
  }

  .menu-item.active {
    @apply text-gray-600 bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 my-6 dark:hover:bg-gray-600 dark:text-white
  }
</style>
