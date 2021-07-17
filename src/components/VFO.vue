<template>
  <div class="flex flex-col w-96">
    <div class="flex flex-row mb-3 flex-nowrap">
      <span
        :class="{ oob: (bandName == 'OOB') }"
        class="inline-block px-3 py-2 text-sm text-green-200 bg-green-500 border-r border-green-500 rounded-l"
      >{{ bandName }}</span>
      <input
        type="number"
        step="0.005"
        class="flex-1 h-10 min-w-0 text-3xl font-bold text-right pxl-3"
        :value="modelValue.frequency"
        @input="$emit('update:modelValue', { ...modelValue, frequency: $event.target.value })"
      >
      <span class="px-5 text-3xl bg-gray-300 rounded-r">kHz</span>
    </div>
    <div class="flex">
      <button
        v-for="mode in modes"
        :key="mode"
        :class="{ active: modelValue.mode == mode }"
        class="flex-1"
        @click="$emit('update:modelValue', { ...modelValue, mode })"
      >
        {{ mode }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watchEffect } from '@vue/runtime-core'
import useFrequencyBand from '../composables/useFrequencyBand'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
      default: () => { return {} }
    }
  },
  emits: ['update:modelValue'],
  setup (props) {
    const { modelValue } = toRefs(props)
    // @todo: use const instead of string
    const modes = ref<Array<string>>(['USB', 'LSB', 'CW', 'DIGI', 'AM', 'FM'])

    const { bandName, frequency } = useFrequencyBand()

    watchEffect(() => {
      frequency.value = modelValue.value.frequency
    })

    return {
      modes,
      bandName
    }
  }
})
</script>

<style scoped lang="postcss">
button {
  @apply text-base focus:outline-none flex justify-center px-4 py-2 font-bold cursor-pointer hover:bg-gray-200 bg-gray-500 text-gray-700 border border-gray-600
}

button:first-child {
  @apply rounded-l-md
}

button:last-child {
  @apply rounded-r-md
}

button.active {
  @apply bg-gray-200
}

.oob {
  @apply bg-red-500 text-red-200 border-red-900
}
</style>
