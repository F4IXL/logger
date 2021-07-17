import Vuex from 'vuex'
import { contests } from '../api/Contests.js'

import idbs from './idb'

const store = new Vuex.Store({
  namespace: true,
  // modules: {
  //   user
  // },
  state: {
    presetList: [],
    preset: {},
    log: {},
    logContest: {},
    qsoList: []
  },
  mutations: {
    setPreset (state, { key, value }) {
      if (key) state.preset[key] = value
      else state.preset = value
    },

    setPresetList (state, data) {
      state.presetList = data
    },

    setLog (state, { key, value }) {
      if (key) {
        state.log[key] = value
        if (key === 'contestPreset') {
          state.logContest = contests.get(value)
        }
      } else {
        state.log = value
        state.logContest = contests.get(value.contestPreset)
      }
    },

    setLogContest (state, key) {
      state.logContest = contests.get(key)
    },

    setQsoList (state, data) {
      state.qsoList = data
    },

    setQso (state, data) {
      const index = state.qsoList.findIndex((qso) => {
        return qso.id === data.id
      })
      if (index > -1) {
        console.log('[commit] will edit index', index)
        state.qsoList[index] = data
      } else {
        console.log('[commit] will push new qso')
        state.qsoList.push(data)
      }
    },

    deleteQso (state, id) {
      const index = state.qsoList.findIndex((qso) => {
        return qso.id === id
      })
      if (index != null) state.qsoList.splice(index, 1)
    },

    addLog (state, { name, params }) {
      state.log[name] = params
    },
    updateLogsList (state, log) {
      state.log = log
    }
  },
  actions: {
    // Load data from idb
    async presetListLoad ({ commit }) {
      const presets = await idbs.getPresetList()
      commit('setPresetList', presets)
    },

    async presetLoad ({ commit }) {
      const preset = await idbs.getPreset()
      commit('setPreset', { value: preset })
    },

    // Update information to idb and to store
    async updatePreset ({ commit }, data) {
      const { key, value } = data
      await idbs.updatePreset(key ? { [key]: value } : data)
      commit('setPreset', data)
    },

    // Load data from idb
    async logLoad ({ commit }) {
      const log = await idbs.getLog()

      commit('setLog', { value: log })
    },

    // Update information to idb and to store
    async updateLog ({ commit }, data) {
      const { key, value } = data
      await idbs.updateLog(key ? { [key]: value } : data)
      commit('setLog', data)
    },

    // Update information to idb and to store
    async updateLogEntry ({ commit }, { key, value }) {
      // let station = await idbs.saveToStorage('station', key, value)
      commit('setLog', { key, value })
    },

    async qsosLoad ({ commit }) {
      const qsoList = await idbs.getQsoList()

      commit('setQsoList', qsoList || [])
    },

    async updateQso ({ commit }, data) {
      const id = await idbs.updateQso(data)
      console.log('qso updated', id)
      commit('setQso', { ...data, id })
    },

    async deleteQso ({ commit }, id) {
      await idbs.deleteQso(id)
      commit('deleteQso', id)
    }

    // async createLog ({ state, commit, dispatch }, { name, params }) {
    //   idbs.saveToStorage('logs', name, params)
    //   commit('addLog', log)
    // },
    // async listLogs ({ state, commit }) {
    //   const logs = await idbs.checkStorage('logs')
    //   console.log('logs', logs)
    //   commit('updateLogsList', logs)
    // }
  }
})

// store.dispatch('listLogs')

store.dispatch('presetListLoad')
store.dispatch('presetLoad')
store.dispatch('logLoad')
store.dispatch('qsosLoad')

export default store
