<template>
  <div>
    <SettingsPartial v-if="settings && contest.settings">
      <!-- Proposed settings

      Operator (SINGLE-OP, MULTI-OP, CHECKLOG)
      Band (ALL, 160M, 80M, 40M, 20M, 15M, 10M, LIMITED, CHECKLOG)
      Power (HIGH, LOW, QRP)
      Mode (CW, DIGI, FM, RTTY, SSB, MIXED)
      Overlay (N/A (default), CLASSIC, ROOKIE, TB-WIRES, NOVICE-TECH, OVER-50)
      Station Category (FIXED, MOBILE, PORTABLE, ROVER, EXPEDITION, HQ, SCHOOL)
      Assisted Category (ASSISTED, NON-ASSISTED)
      XMitter Category (ONE, TWO, LIMITED, UNLIMITED, SWL)
      Time Category (N/A, 6-HOURS, 12-HOURS, 24-HOURS)
      Sent Exchange
      Operators
      Soapbox comments

      Section List (for QSOPARTIES - ex. CA or Field Day ? Category Type?)

       -->

      <h1 class="mb-10 border-b">
        Log Settings
      </h1>
      <FormElement
        type="text"
        label="Log Name"
        :value="log.name"
        @update="updateLog({ name: $event })"
      />

      <Tabs v-model="activeTab">
        <Tab title="Contest Template">
          <FormElement
            type="select"
            class="-mb-0"
            :value="log.contest"
            :options="contestOptionsList"
            @update="updateLogSettings({ contest: $event })"
          />
        </Tab>
        <Tab title="Contest Definition">
          <textarea
            :value="contest.toString()"
            name=""
            cols="30"
            rows="10"
          />
        </Tab>
      </Tabs>

      <h1 class="mb-10 border-b">
        Contest Settings
      </h1>

      <!-- Operator -->
      <FormElement
        v-if="
          !contest.settings.operator.hide && !contest.settings.operator.exclude
        "
        type="select"
        label="Operator"
        :value="settings.operator"
        :options="contest.settings.operator.override"
        @update="updateLogSettings({ operator: $event })"
      />

      <!-- Band -->
      <FormElement
        v-if="!contest.settings.band.hide && !contest.settings.band.exclude"
        type="select"
        label="Band"
        :value="settings.band"
        :options="contest.settings.band.override"
        @update="updateLogSettings({ band: $event })"
      />

      <!-- Power -->
      <FormElement
        v-if="!contest.settings.power.hide && !contest.settings.power.exclude"
        type="select"
        label="Power"
        :value="settings.power"
        :options="contest.settings.power.override"
        @update="updateLogSettings({ power: $event })"
      />

      <!-- Mode -->
      <FormElement
        v-if="!contest.settings.mode.hide && !contest.settings.mode.exclude"
        type="select"
        label="Mode"
        :value="settings.mode"
        :options="contest.settings.mode.override"
        @update="updateLogSettings({ mode: $event })"
      />

      <!-- Overlay -->
      <FormElement
        v-if="
          !contest.settings.overlay.hide && !contest.settings.overlay.exclude
        "
        type="select"
        label="Overlay"
        :value="settings.overlay"
        :options="contest.settings.overlay.override"
        @update="updateLogSettings({ overlay: $event })"
      />

      <!-- Station Category -->
      <FormElement
        v-if="
          !contest.settings.stationCategory.hide &&
            !contest.settings.stationCategory.exclude
        "
        type="select"
        label="Station Category"
        :value="settings.stationCategory"
        :options="contest.settings.stationCategory.override"
        @update="updateLogSettings({ stationCategory: $event })"
      />

      <!-- Assisted Category -->
      <FormElement
        v-if="
          !contest.settings.assistedCategory.hide &&
            !contest.settings.assistedCategory.exclude
        "
        type="select"
        label="Assisted Category"
        :value="settings.assistedCategory"
        :options="contest.settings.assistedCategory.override"
        @update="updateLogSettings({ assistedCategory: $event })"
      />

      <!-- Time Category -->
      <FormElement
        v-if="
          !contest.settings.timeCategory.hide &&
            !contest.settings.timeCategory.exclude
        "
        type="select"
        label="Time Category"
        :value="settings.timeCategory"
        :options="contest.settings.timeCategory.override"
        @update="updateLogSettings({ timeCategory: $event })"
      />

      <!-- Sent Exchange -->
      <FormElement
        v-if="
          !contest.settings.sentExchange.hide &&
            !contest.settings.sentExchange.exclude
        "
        type="text"
        label="Sent Exchange"
        :value="settings.sentExchange"
        @update="updateLogSettings({ sentExchange: $event })"
      />

      <!-- Operators -->
      <FormElement
        v-if="
          !contest.settings.operators.hide &&
            !contest.settings.operators.exclude
        "
        type="text"
        label="Operators"
        :value="settings.operators"
        @update="updateLogSettings({ operators: $event })"
      />

      <!-- Soapbox comments -->
      <FormElement
        v-if="!contest.settings.soapbox.hide && !contest.settings.soapbox.exclude"
        type="textarea"
        label="Soapbox Comments"
        :value="settings.saopbox"
        @update="updateLogSettings({ saopbox: $event })"
      />
    </SettingsPartial>
  </div>
</template>

<script lang="ts">
import { useStore } from '../store'
import FormElement from '../components/FormElement.vue'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import SettingsPartial from '../components/SettingsPartial.vue'
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { ActionTypes } from '../store/actions'

export default defineComponent({
  components: {
    SettingsPartial,
    FormElement,
    Tabs,
    Tab
  },
  setup () {
    const store = useStore()

    const activeTab = ref(0)
    const log = computed(() => store.getters.log)
    const settings = computed(() => store.getters.settings)
    const contest = computed(() => store.getters.contest)
    const contestList = computed(() => store.state.contestsList)

    const contestOptionsList = computed(() => {
      return Object.keys(contestList.value).reduce((obj, key) => {
        console.log('reduce, key', obj, key)
        obj[key] = contestList.value[key].name
        return obj
      }, {})
    })

    const updateLog = (data) => store.dispatch(ActionTypes.UpdateLog, {
      ...data,
      id: log.value.id
    })
    const updateLogSettings = (data) => store.dispatch(ActionTypes.UpdateSettings, data)

    return {
      activeTab,
      log,
      contest,
      contestList,
      contestOptionsList,
      settings,
      updateLogSettings,
      updateLog
    }
  }
})
</script>
