<template>
  <SettingsPartial>
    <h1>About (gh)</h1>
    <p>
      F4IXL Logger is an offline web logger. It was mainly inspired by <a
        href="https://n1mmwp.hamdocs.com/"
        target="_blank"
      >N1MMM+</a> smart features
      and made to make logging easier on multiple platforms.
    </p>
    <p>
      The goal is to make it the perfect logger for avergage contesters, DXers, chasers, activators and any operators that
      does not need advanced settings like other loggers can provide. Onboarding shoud be easy to anyone and
      further development will keep this in mind.
    </p>
    <p>
      You can explore features in the Documentation. This software is open source and you can help
      make it better or request features using code hosting platform <a href="https://github.com/f4ixl">Github</a>.
    </p>
  </SettingsPartial>
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
