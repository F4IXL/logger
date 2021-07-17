<template>
  <div class="relative mb-10">
    <label
      v-if="label"
      class="text-gray-700 dark:text-white"
    >
      {{ label }}
    </label>

    <!-- Inputs -->
    <input
      v-if="tagType == 'input'"
      ref="field"
      :type="type"
      class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:indigo-purple-600 focus:border-transparent"
      :name="name"
      :placeholder="
        placeholder ? placeholder : placeholder !== false ? label : null
      "
      :class="{ error: 'ring-red-500 ring-2' }"
      :value="value"
      @blur="$refs.field.value != value && $emit('update', $refs.field.value)"
    >

    <!-- Select -->
    <select
      v-if="tagType == 'select'"
      ref="field"
      class="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm dark:text-gray-700 w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
      name="name"
      :value="value"
      @change="$refs.field.value != value && $emit('update', $refs.field.value)"
    >
      <option
        v-for="(option, key) in options"
        :key="key"
        :value="isOptionsArray ? option : key"
      >
        {{ option }}
      </option>
    </select>

    <template v-if="error.message">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="currentColor"
        class="absolute text-red-500 right-2 bottom-3"
        viewBox="0 0 1792 1792"
      >
        <path
          d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
        />
      </svg>
      <div class="absolute text-sm text-red-500 -bottom-6">
        {{ name }} is invalid
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  props: {
    label: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      // Validator and default creates bug in Vetur
      // validator (value: string): boolean {
      //   return ['text', 'select'].includes(value)
      // },
      // default (props):string {
      //   return props.options ? 'select' : 'text'
      // }
      default: 'text'
    },
    options: {
      type: [Object, Array, null],
      default: null
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    error: {
      type: Object,
      default: () => { return {} }
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      required: false,
      default: ''
    }
  },
  emits: ['update'],
  setup (props) {
    const tagType = computed<string>(() => {
      switch (props.type) {
        case 'text':
          // @todo: use constant instead of string
          return 'input'
        case 'select':
          // @todo: use constant instead of string
          return 'select'
        default:
          return 'input'
      }
    })

    const isOptionsArray = computed<boolean>(() => props.options instanceof Array)

    return {
      props,
      tagType,
      isOptionsArray
    }
  }
})
</script>
