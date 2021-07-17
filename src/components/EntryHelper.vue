<template>
  <div
    v-if="country"
    class="dark:text-white"
  >
    {{ country.name }} ({{ country.continent }})
  </div>
</template>

<script>
import { computed, defineComponent, toRefs } from '@vue/runtime-core'
import { prefixes } from '../files/wl_cty'

export default defineComponent({
  props: {
    call: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const { call } = toRefs(props)

    const country = computed(() => {
      let c = null
      let i = (call.value && call.value.length) || 0

      while (c == null && i > 0) {
        const prefix = call.value.substring(0, i)
        c = prefixes[prefix] || null
        if (!c) {
          i--
        }
      }

      return c || null
    })
    return {
      country: country || {}
    }
  }
})
</script>
