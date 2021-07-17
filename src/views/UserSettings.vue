<template>
  <div>
    <SettingsPartial>
      <h1 class="mb-10 border-b">
        User Settings
      </h1>
      <!--
        Default Preset (Last Used, List of presets)
       -->
    </SettingsPartial>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import SettingsPartial from '../components/SettingsPartial.vue'

export default defineComponent({
  components: {
    SettingsPartial
  }
})
</script>
