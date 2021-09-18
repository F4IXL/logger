<template>
  <div class="flex flex-col flex-1 p-5 overflow-hidden bg-gray-700 home">
    <div class="flex flex-row space-x-5">
      <VFO
        v-model="vfo"
        class="mb-10"
      />
      <LogHelper />
    </div>
    <Log
      :call="entry.call.value"
      class="flex-1"
    />
    <Master
      class="mb-5"
      :call="entry.call.value"
      @callClick="setCall"
    />
    <Entry
      ref="entryElement"
      v-model="entry"
      :mode="vfo.mode"
      @submit="onSubmit"
      @frequencyUpdate="onFrequencyUpdate"
      @modeUpdate="onModeUpdate"
      @wipe="wipe"
    />
    <EntryHelper :call="entry.call.value" />
  </div>
</template>

<script lang="ts">
import { useStore } from '../store'
import { computed, defineComponent, nextTick, ref, watch } from '@vue/runtime-core'

import Entry from '../components/Entry.vue'
import Log from '../components/Log.vue'
import LogHelper from '../components/LogHelper.vue'
import VFO from '../components/VFO.vue'
import Master from '../components/Master.vue'
import EntryHelper from '../components/EntryHelper.vue'
import { ActionTypes } from '../store/actions'
import { VfoMode } from '../store/types'

export default defineComponent({
  name: 'Home',
  components: {
    Entry,
    Log,
    LogHelper,
    VFO,
    Master,
    EntryHelper
  },
  setup () {
    const store = useStore()

    // State
    const vfo = computed(() => store.state.vfo)

    const entry = ref({
      call: {
        required: true,
        value: ''
      },
      sentRst: {
        required: true,
        value: ''
      },
      rcvdRst: {
        required: true,
        value: ''
      }
    })

    // Template ref
    const entryElement = ref(null)

    // Computed
    const contest = computed(() => store.getters.contest)
    const qso = computed(() => {
      const qso = {}
      Object.keys(entry.value).forEach((key) => {
        qso[key] = entry.value[key].value
      })
      return {
        ...qso
      }
    })

    // Watch
    watch(contest, () => {
      buildModels()
    })

    // Methods
    const buildModels = () => {
      Object.assign(entry, Object.keys(contest.value.entry).reduce((obj, key) => {
        obj[key] = {
          ...contest.value.entry[key],
          value: ''
        }
        return obj
      }, {}))
    }

    const updateQso = (value) => store.dispatch(ActionTypes.UpdateQso, value)

    const wipe = () => {
      Object.keys(entry.value).forEach((key) => {
        entry.value[key].value = null
      })
      entryElement.value.reset() // Will focus callsign
    }

    const setCall = (value) => {
      console.log('setcall', value)
      entry.value.call.value = value
      nextTick(() => {
        entryElement.value.focus()
      })
    }

    const onSubmit = () => {
      console.log('submitting...')
      const date = new Date()
      console.log('submitting adding qso value', qso.value)
      updateQso({
        ...qso.value,
        // @hack Partial attempt to get closer to Qso type. More refactoring needed
        vfo: {
          frequency: vfo.value.frequency,
          mode: vfo.value.mode
        },
        datetime: {
          year: date.getUTCFullYear(),
          month: `00${date.getUTCMonth() + 1}`.slice(-2),
          day: `00${date.getUTCDate()}`.slice(-2),
          time: `${('00' + date.getUTCHours()).slice(-2)}${('00' + date.getUTCMinutes()).slice(-2)}`
        }
      })
      wipe()
    }

    const onFrequencyUpdate = () => {
      vfo.value.frequency = Number(entry.value.call.value)
      wipe()
    }

    const onModeUpdate = () => {
      vfo.value.mode = entry.value.call.value as VfoMode
      wipe()
    }

    return {
      vfo,
      entry,
      entryElement,
      contest,
      qso,
      wipe,
      setCall,
      onSubmit,
      onFrequencyUpdate,
      onModeUpdate
    }
  }
})
</script>
