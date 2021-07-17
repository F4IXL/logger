<template>
  <div class="mb-10">
    <ul class="flex space-x-2">
      <li
        v-for="(tab, i) of tabs"
        :key="i"
        :class="
          active === i
            ? 'dark:bg-gray-800 inline-block rounded-t-lg py-2 px-4 text-white font-semibold'
            : 'inline-block rounded-t-lg py-2 px-4 text-white font-semibold bg-gray-900'
        "
        @click="selectTab(i)"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <div class="p-3 bg-gray-800 rounded-md rounded-tl-none">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { provide, computed, ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Tabs',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const active = computed(() => props.modelValue)
    const tabs = ref([])

    function selectTab (tab) {
      emit('update:modelValue', tab)
    }

    provide('tabsState', {
      active,
      tabs
    })

    return {
      tabs,
      active,
      selectTab
    }
  }
})
</script>
