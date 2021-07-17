<template>
  <div>
    <ul class="space-x-2">
      <li
        v-for="result in results"
        :key="result"
        class="inline-block"
      >
        <button
          class="px-2 py-1 text-xs text-white bg-indigo-500 rounded-full"
          @click="$emit('callClick', result)"
        >
          {{ result }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import master from '../files/MASTER.SCP.txt?raw'

export default defineComponent({
  props: {
    call: {
      type: String,
      default: ''
    }
  },
  emits: ['callClick'],
  setup (props) {
    return {
      results: computed(() => {
        if (!props.call) return
        const regex = RegExp(`^${props.call.replaceAll('?', '[\\dA-Z]')}.*$`, 'gm')
        return [...master.matchAll(regex)].map(([res]) => res).splice(0, 10)
      })
    }
  }
})
</script>
