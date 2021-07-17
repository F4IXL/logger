<template>
  <div class="bg-white dark:bg-gray-800 w-72">
    <nav class="px-6">
      <SettingsMenuItem to="/user">
        User Settings
      </SettingsMenuItem>
      <div>
        <p class="menu-title">
          LOG
        </p>
        <SettingsMenuItem to="/station">
          Station informations
        </SettingsMenuItem>

        <SettingsMenuItem to="/log">
          Log & Contest
        </SettingsMenuItem>

        <SettingsMenuItem to="/log/list">
          Logs List
        </SettingsMenuItem>

        <SettingsMenuItem to="/export">
          Import / Export
        </SettingsMenuItem>
      </div>
      <div>
        <p class="menu-title">
          APPLICATION (v0.0.1)
        </p>
        <SettingsMenuItem to="/about">
          About
        </SettingsMenuItem>
        <SettingsMenuItem href="https://github.com/f4ixl">
          Documentation
        </SettingsMenuItem>
        <SettingsMenuItem href="https://github.com/f4ixl">
          Github
        </SettingsMenuItem>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import SettingsMenuItem from './SettingsMenuItem.vue'

export default defineComponent({
  components: {
    SettingsMenuItem
  }
})
</script>

<style lang="postcss">
  .menu-title {
    @apply text-gray-300 ml-2 w-full border-b-2 pb-2 border-gray-100 mb-4 text-base font-normal
  }
</style>
