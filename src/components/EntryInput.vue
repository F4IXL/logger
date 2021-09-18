<template>
  <div>
    <label
      for="name-with-label"
      class="text-gray-700"
    >
      <input
        ref="inputElement"
        type="text"
        autocomplete="off"
        :size="size"
        :value="value"
        :class="{ 'flex-1': (size < 0)}"
        class="relative flex-1 w-full min-w-0 px-4 py-2 text-3xl text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent focus:z-10"
        :name="label"
        :placeholder="placeholder || label"
        @input="$emit('input', $event)"
        @keydown.space="onSpace"
        @keypress="onKeypress"
        @focus="$emit('focus', this)"
      >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from '@vue/runtime-core'

export default defineComponent({
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    size: {
      type: Number,
      default: 5
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputRegex: {
      type: RegExp,
      default: /.*/
    },
    regex: {
      type: RegExp,
      default: /.*/
    },
    allowSpace: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input', 'focus'],
  setup (props) {
    const inputElement = ref<HTMLInputElement>(null)

    const onKeypress = (event:KeyboardEvent) => {
      if (!event.key.match(props.inputRegex)) {
        event.preventDefault()
      }
    }

    // Setting cursor back to original place
    watch(() => props.value, () => {
      const sel = inputElement.value.selectionStart
      nextTick(() => {
        inputElement.value.setSelectionRange(sel, sel)
      })
    })

    const onSpace = (event:KeyboardEvent) => props.allowSpace && event.stopPropagation()
    const select = () => inputElement.value.select()
    const focus = () => inputElement.value.focus()

    return {
      inputElement,
      onKeypress,
      onSpace,
      select,
      focus
    }
  }
})
</script>
