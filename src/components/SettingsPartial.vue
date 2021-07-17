<template>
  <div class="relative flex min-h-screen">
    <SettingsMenu />
    <div class="flex-1 p-10 bg-gray-700">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import SettingsMenu from './SettingsMenu.vue'

export default defineComponent({
  components: {
    SettingsMenu
  }
})
</script>
