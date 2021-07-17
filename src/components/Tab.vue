<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, inject, watchEffect, getCurrentInstance, defineComponent } from 'vue'

export default defineComponent({
  name: 'Tab',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup () {
    const instance = getCurrentInstance()
    const { tabs, active } = inject('tabsState')

    const index = computed(() =>
      tabs.value.findIndex((target) => target.uid === instance.uid)
    )
    const isActive = computed(() => index.value === active.value)

    watchEffect(() => {
      if (index.value === -1) {
        tabs.value.push(instance)
      }
    })

    return {
      isActive
    }
  }
})
</script>
