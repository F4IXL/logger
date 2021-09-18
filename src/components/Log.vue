<template>
  <div
    ref="root"
    class="flex mb-5 overflow-scroll"
  >
    <!-- First table is full log -->
    <table
      v-if="contest && contest.entry"
      ref="table"
      class="flex-1 outline-none select-none"
      tabindex="0"
      @keyup.escape="wipeSelection"
      @keyup.delete="deleteSelection"
    >
      <thead>
        <tr>
          <th>
            MM-DD HH:MM
          </th>
          <th>
            Call
          </th>
          <th>
            Freq
          </th>
          <th>
            Mode
          </th>
          <th
            v-for="field in filteredFields"
            :key="field"
          >
            {{ contest.entry[field].name || field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <LogRow
          v-for="qso in qsoList"
          :key="qso.id"
          :selected="isSelected(qso.id)"
          :editable="isEditable(qso.id)"
          :fields="filteredFields"
          :qso="qso"
          @click.exact="onRowClick(qso)"
          @click.shift="onRowShiftClick(qso)"
          @click.alt="onRowAltClick(qso)"
          @click.meta="onRowAltClick(qso)"
          @edit="onRowEdit"
          @wipe="wipeEditable"
        />
      </tbody>

      <!-- Third table is filtered view of current callsign in OTHER LOGS -->
      <tbody v-if="filteredQsoListOtherLogs">
        <tr
          v-for="qso in filteredQsoListOtherLogs"
          :key="qso.id"
          class="bg-red-200"
        >
          <td>
            {{ qso.datetime.month }}-{{ qso.datetime.day }} {{ prettyTime(qso.datetime.time) }}
          </td>
          <td v-html="matchCall(qso.call)" />
          <td>{{ qso.vfo.frequency }}</td>
          <td>{{ qso.vfo.mode }}</td>
          <td
            v-for="field in filteredFields"
            :key="field"
          >
            {{ qso[field] }}
          </td>
        </tr>
      </tbody>

      <!-- Second table is filtered view of current callsign -->
      <tbody v-if="filteredQsoList">
        <tr
          v-for="qso in filteredQsoList"
          :key="qso.id"
          class="bg-green-100"
        >
          <td>{{ qso.datetime.month }}-{{ qso.datetime.day }} {{ prettyTime(qso.datetime.time) }}</td>
          <td v-html="matchCall(qso.call)" />
          <td>{{ qso.vfo.frequency }}</td>
          <td>{{ qso.vfo.mode }}</td>
          <td
            v-for="field in filteredFields"
            :key="field"
          >
            {{ qso[field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import LogRow from './LogRow.vue'
import { useStore } from '../store'
import { computed, defineComponent, nextTick, onMounted, onUnmounted, reactive, ref, toRefs, watch } from '@vue/runtime-core'
import { ActionTypes } from '../store/actions'
import { MasterContest } from '../store/contests'
import { QsoList } from '../store/types'

export default defineComponent({
  components: {
    LogRow
  },
  props: {
    call: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const store = useStore()
    const state = reactive({
      selected: [],
      selectedData: [], // Used to override data
      editableRow: null
    })

    // Hooks
    onMounted(() => {
      document.addEventListener('copy', onCopy)
    })
    onUnmounted(() => {
      document.removeEventListener('copy', onCopy)
    })

    const root = ref(null)

    // MapState
    const currentLog = computed(() => store.state.user.currentLog)
    const qsoList = computed(() => store.state.qsoList.filter((qso) => qso.logId === currentLog.value) as QsoList)
    const qsoListOtherLogs = computed(() => store.state.qsoList.filter((qso) => qso.logId != currentLog.value) as QsoList)
    const contest = computed(() => store.getters.contest as MasterContest)

    // Computed
    const filteredQsoList = computed(() => {
      if (!props.call) return
      const regex = RegExp(`^${props.call.replaceAll('?', '[\\dA-Z]')}.*$`, 'gm')
      return props.call && qsoList.value.filter((qso) => {
        return qso.call && qso.call.match(regex)
      })
    })

    const filteredQsoListOtherLogs = computed(() => {
      if (!props.call) return
      const regex = RegExp(`^${props.call.replaceAll('?', '[\\dA-Z]')}.*$`, 'gm')
      return props.call && qsoListOtherLogs.value.filter((qso) => {
        return qso.call && qso.call.match(regex)
      })
    })

    const filteredFields = computed(() => {
      const exclude = ['call']
      return Object.keys(contest.value.entry).filter((key) => {
        return !exclude.includes(key) &&
          !contest.value.entry[key].exclude &&
          !contest.value.entry[key].hide
      })
    })

    const formattedSelection = computed(() => {
      let content = 'datetime\tcall\tfreq\tmode\t'
      filteredFields.value.forEach((field) => {
        content += `${field || ''}\t`
      })
      return state.selected.reduce((content, id) => {
        const qso = qsoArray.value.find(qso => qso.id === id)
        content += `${qso.datetime.month}-${qso.datetime.day} ${qso.datetime.time}\t${qso.call}\t${qso.vfo.frequency}\t${qso.vfo.mode}\t`
        filteredFields.value.forEach((field) => {
          content += `${qso[field] || ''}\t`
        })
        return `${content.slice(0, -1)}\n`
      }, `${content.slice(0, -1)}\n`)
    })

    const qsoArray = computed(() => Object.keys(qsoList.value).map((key) => qsoList.value[key]))
    const qsoIds = computed(() => qsoArray.value.map((qso) => qso.id))

    // Watchers
    watch(qsoList, () => scrollToBottom())
    watch(() => props.call, () => scrollToBottom())
    watch(() => state.selected, () => {
      state.selectedData = state.selected.map((id) => {
        return qsoArray.value.find((qso) => qso.id === id)
      })
    })

    // MapActions
    const updateQso = (data) => store.dispatch(ActionTypes.UpdateQso, JSON.parse(JSON.stringify(data))) // @todo: find a better way to avoid Proxies in objects
    const deleteQso = (data) => store.dispatch(ActionTypes.DeleteQso, data)

    const scrollToBottom = () => nextTick(() => {
      root.value.scrollTop = root.value.scrollHeight
    })

    const matchCall = (call) => {
      const regex = RegExp(`^(${props.call.replaceAll('?', '[\\dA-Z]')})`, 'gm')
      const [match] = call.match(regex)
      const index = call.indexOf(match)
      const length = props.call.length
      return `${call.slice(0, index)}<strong>${call.slice(index, index + length)}</strong>${call.slice(index + length)}`
    }

    // @todo: put this function in "useTime" composable?
    const prettyTime = (time) => `${time.slice(0, 2)}:${time.slice(2)}`

    const onRowClick = (qso) => {
      if (state.editableRow !== qso.id) {
        if (isSelected(qso.id)) {
          state.selected = []
          console.log('will set editable', qso)
          setEditable(qso.id)
        } else {
          wipeEditable()
          state.selected = [qso.id]
        }
      }
    }

    const onRowShiftClick = (qso) => {
      if (!state.selected.length) return onRowClick(qso)
      const index = qsoIds.value.indexOf(qso.id)
      const lowerIndex = qsoIds.value.indexOf(Math.min.apply(Math, state.selected))
      const higherIndex = qsoIds.value.indexOf(Math.max.apply(Math, state.selected))

      if (index < higherIndex) {
        state.selected = qsoIds.value.slice(index, lowerIndex + 1)
      } else {
        state.selected = qsoIds.value.slice(higherIndex, index + 1)
      }
    }

    const onRowAltClick = (qso) => {
      if (!isSelected(qso.id)) state.selected.push(qso.id)
      else state.selected.splice(state.selected.indexOf(qso.id), 1)
    }

    const isSelected = (id) => state.selected.includes(id)

    const wipeSelection = () => {
      console.log('wiping...')
      state.selected = []
      wipeEditable()
    }

    const deleteSelection = () => {
      console.log('should ask confirm for delete qsos', state.selected)
      if (!state.selected.length) return
      window.confirm(`Are you sure you want to delete ${state.selected.length} qso(s)?`)
      state.selected.forEach((id) => {
        console.log(`Deleting QSO #${id}`)
        deleteQso(id)
      })
    }

    const onCopy = (event) => {
      console.log('will copy', formattedSelection.value)
      event.clipboardData.setData('text/plain', formattedSelection.value)
      event.preventDefault()
    }

    const setEditable = (id) => {
      console.log(`Editing row for id ${id}`)
      state.editableRow = id
    }

    const isEditable = (id) => state.editableRow === id

    const onRowEdit = (qso) => {
      console.log('edit triggered', state.editableRow, qso)
      if (!state.editableRow) return
      updateQso({ ...qso })
    }

    const wipeEditable = () => {
      state.editableRow = null
    }

    return {
      ...toRefs(state),
      root,
      contest,
      filteredQsoList,
      filteredQsoListOtherLogs,
      filteredFields,
      isSelected,
      qsoList,
      matchCall,
      prettyTime,
      onRowShiftClick,
      onRowAltClick,
      wipeSelection,
      deleteSelection,
      onCopy,
      onRowClick,
      isEditable,
      onRowEdit,
      wipeEditable
    }
  }
})
</script>

<style scoped lang="postcss">
  table {
    @apply table p-4 bg-white shadow
  }
  th {
    @apply p-4 whitespace-nowrap font-normal text-gray-900 sticky top-0 bg-white
  }
  tbody tr {
    @apply text-gray-700
  }
  tbody td {
    @apply border p-4
  }
  .selected {
    @apply bg-blue-300
  }
  .editable {
    @apply bg-indigo-300
  }
</style>
