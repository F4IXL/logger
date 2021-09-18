<template>
  <SettingsPartial>
    <h1 class="mb-10 border-b">
      Export logs:
    </h1>
    <ul v-if="ready">
      <!-- <li class="dark:text-white">
        Cabrillo 3.0
        <a
          :href="cabrilloString"
          :download="filename + '.log'"
          class="inline-block px-3 py-1 mb-5 text-base text-white bg-indigo-500 rounded-full"
        >
          Export .log
        </a>
      </li> -->
      <li class="dark:text-white">
        ADIF 3.0.5
        <a
          :href="adifString"
          :download="filename + '.adi'"
          class="inline-block px-3 py-1 mb-5 text-base text-white bg-indigo-500 rounded-full"
        >
          Download {{ filename }}.adi
        </a>
      </li>
      <!-- <li class="dark:text-white">
        CSV (Tabbed)
        <a
          :href="cabrilloString"
          :download="filename + '.csv'"
          class="inline-block px-3 py-1 mb-5 text-base text-white bg-indigo-500 rounded-full"
        >
          Export .csv
        </a>
      </li>
      <li class="dark:text-white">
        TQ8 (LoTW Signed)
        <a
          class="inline-block px-3 py-1 mb-5 text-base text-white bg-indigo-500 rounded-full"
        >
          Send to LoTW
        </a>
      </li> -->
    </ul>
    <div v-else>
      Please wait...
    </div>
    <h1 class="mt-10 mb-10 border-b">
      Import logs:
    </h1>
  </SettingsPartial>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import useFrequencyBand from '../composables/useFrequencyBand'
import SettingsPartial from '../components/SettingsPartial.vue'
import { useStore } from '../store'
import { QsoList } from '../store/types'

export default defineComponent({
  components: {
    SettingsPartial
  },
  setup () {
    const store = useStore()
    const log = computed(() => store.getters.log)
    const station = computed(() => store.getters.station)
    const filename = computed(() => log.value.name)
    const currentLog = computed(() => store.state.user.currentLog)
    const qsoList = computed(() => store.state.qsoList.filter((qso) => qso.logId === currentLog.value) as QsoList)
    const ready = computed(() => log.value && station.value && qsoList.value)

    const cabrilloString = computed(() => {
      if (!log.value || !station.value) return null
      const qsoData = []
      const lines = [
        'START-OF-LOG:3.0',
        `CALLSIGN:${station.value.call}`,
        'CREATED-BY: F4IXL Logger 0.1',
        `GRID-LOCATOR: ${station.value.grid}`,
        `NAME: ${station.value.name}`,
        `ADDRESS: ${station.value.address1}`,
        `ADDRESS: ${station.value.address2}`,
        `ADDRESS-CITY: ${station.value.city}`,
        `ADDRESS-STATE-PROVINCE: ${station.value.state}`,
        // `ADDRESS-POSTALCODE: ${station.value.postalcode}`,
        `ADDRESS-COUNTRY: ${station.value.country}`,
        // `OPERATORS: ${this.
        `QSO: ${qsoData.join()}`,
        'END-OF-LOG:'
      ]
      return `data:text/plain;charset=utf-8,${encodeURIComponent(lines.join('\\n'))}`
    })

    const adifString = computed(() => {
      if (!log.value || !station.value) return null
      let lines = [
        '<adif_ver:5>3.0.5',
        '<programid:12>F4IXL Logger',
        '<eoh>' // End of Header
      ]
      qsoList.value.forEach((qso) => {
        const { bandName, frequency } = useFrequencyBand()
        const mhz = '' + (parseInt(qso.vfo.frequency) / 1000)
        frequency.value = qso.vfo.frequency
        const record = [
          `<station_callsign:${station.value.call.length}>${station.value.call}`,
          `<my_name:${station.value.name.length}>${station.value.name}`,
          `<call:${qso.call.length}>${qso.call}`,
          `<qso_date:8>${qso.datetime.year}${qso.datetime.month}${qso.datetime.day}`,
          `<time_on:4>${qso.datetime.time}`,
          `<freq:${mhz.length}>${mhz}`,
          `<band:${bandName.value.length}>${bandName.value}`,
          `<mode:${qso.vfo.mode.length}>${qso.vfo.mode}`,
          `<rst_sent:${('' + qso.sent).length}>${qso.sent}`,
          `<rst_rcvd:${('' + qso.received).length}>${qso.received}`,
          `<operator:${station.value.call.length}>${station.value.call}`
        ]

        // Other fields
        if (qso.name) record.push(`<name:${qso.name.length}>${qso.name}`)
        if (qso.comment) record.push(`<comment:${qso.comment.length}>${qso.comment}`)
        if (station.value.grid && station.value.grid.match(/^[A-Za-z]{2}\d{2}([A-Za-z]{2}(\d{2})?)?$/g)) record.push(`<gridlocator:${station.value.grid}>${station.value.grid}`)

        record.push('<eor>')

        lines = lines.concat(record)
      })
      return `data:text/plain;charset=utf-8,${encodeURIComponent(lines.join('\n'))}`
    })

    return {
      ready,
      filename,
      cabrilloString,
      adifString
    }
  }
})
</script>
