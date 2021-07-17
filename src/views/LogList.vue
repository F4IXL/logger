<template>
  <SettingsPartial>
    <h1>Logs list</h1>
    <div class="py-5 rounded-t">
      <div class="overflow-hidden bg-white shadow dark:bg-gray-800 sm:rounded-md">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="log in logList"
            :key="log.id"
          >
            <a class="block hover:bg-gray-50 dark:hover:bg-gray-900">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p class="text-gray-700 text-md dark:text-white md:truncate">
                    <strong>{{ log.name }}</strong> ({{ log.call }})
                  </p>
                  <div class="flex flex-shrink-0 ml-2">
                    <p
                      v-if="log.id == currentLog"
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full"
                    >
                      Active
                    </p>
                    <div
                      v-else
                    >
                      <button
                        class="inline-flex px-2 mr-2 text-xs font-semibold leading-5 text-white bg-indigo-700 shadow-md rounded-xl"
                        @click="loadLog(log.id)"
                      >
                        Load
                      </button>
                      <button
                        class="inline-flex px-2 text-xs font-semibold leading-5 text-white bg-red-500 shadow-md rounded-xl"
                        @click="deleteLog(log.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <p class="flex items-center font-light text-gray-500 text-md dark:text-gray-300">
                      Last update {{ log.lastUpdate.year }}-{{ log.lastUpdate.month }}-{{ log.lastUpdate.day }} {{ log.lastUpdate.time }} UTC. Contains {{ log.qsoCount }} QSO's
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </SettingsPartial>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import SettingsPartial from '../components/SettingsPartial.vue'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

export default defineComponent({
  components: {
    SettingsPartial
  },
  setup () {
    const datetimeToEpoch = (datetime) => {
      return new Date(`${datetime.year}-${datetime.month}-${datetime.day} ${datetime.time}`).getTime()
    }
    const store = useStore()
    const currentLog = computed(() => store.state.user.currentLog)
    const logList = computed(() => {
      return store.state.logList.map((log) => {
        return {
          id: log.id,
          name: log.name,
          call: log.station.call,
          qsoCount: store.state.qsoList.filter((qso) => qso.logId === log.id).length,
          lastUpdate: store.state.qsoList.length &&
            store.state.qsoList.sort((a, b) => datetimeToEpoch(a) - datetimeToEpoch(b)).reverse()[0].datetime
        }
      })
    })

    const loadLog = (id:IDBValidKey) => {
      store.dispatch(ActionTypes.UpdateUser, {
        currentLog: id
      })
    }

    const deleteLog = (id:IDBValidKey) => {
      store.dispatch(ActionTypes.DeleteLog, id)
    }

    return {
      logList,
      currentLog,
      loadLog,
      deleteLog
    }
  }
})
</script>
