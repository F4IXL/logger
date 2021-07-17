<template>
  <div
    v-if="station"
    class="flex flex-col text-gray-200"
  >
    <div class="text-4xl">
      <strong>{{ station.call }}</strong> <span v-if="station.grid">({{ station.grid }})</span>
    </div>
    <div class="text-2xl">
      {{ qsoCount }} QSOs
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '../store'

export default defineComponent({
  setup () {
    const store = useStore()
    const qsoCount = computed(() => store.getters.qsoCount)
    const station = computed(() => store.getters.station)
    return {
      qsoCount,
      station
    }
  }
})
</script>
