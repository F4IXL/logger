import { computed, ComputedRef, Ref, ref } from 'vue'

import bands, { Band } from '../files/bands.js'

export type ComputedFrequencyBand = {
  frequency: Ref<string>,
  band: ComputedRef<string>,
  bandName: ComputedRef<string>
}

const frequency = ref('')

export default function useFrequencyBand ():ComputedFrequencyBand {
  const bandSpec = computed(():[string, Band] => {
    const key = frequency.value && Object.keys(bands).find((key) => {
      const band = bands[key]
      console.log(band.range[0], band.range[1])
      return frequency.value >= band.range[0] && frequency.value < band.range[1]
    })

    return key && [key, bands[key]]
  })

  const band = computed(() => bandSpec.value && bandSpec.value[0])
  const bandName = computed(() => bandSpec.value && bandSpec.value[1].name)

  return {
    frequency,
    band,
    bandName
  }
}
