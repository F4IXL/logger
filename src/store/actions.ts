import { ActionContext, ActionTree } from 'vuex'
import idb from './idb'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
import { Log, LogSettings, LogStation, Qso, UserSettings } from './types'
import { contests } from './contests'

export enum ActionTypes {
    // Loaders
    LoadUser = 'LOAD_USER',
    LoadQsoList = 'LOAD_QSO_LIST',
    LoadLogList = 'LOAD_LOG_LIST',
    LoadContestsList = 'LOAD_CONTESTS_LIST',

    // Creaters
    CreateLog = 'CREATE_LOG',

    // Updaters
    UpdateUser = 'UPDATE_USER',
    UpdateLog = 'UPDATE_LOG',
    UpdateSettings = 'UPDATE_SETTINGS',
    UpdateStation = 'UPDATE_STATION',
    UpdateQso = 'UPDATE_QSO',

    // Deleters
    DeleteQso = 'DELETE_QSO',
    DeleteLog = 'DELETE_LOG'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
  }

export type Actions = {
    [ActionTypes.LoadUser](context: ActionAugments): void,
    [ActionTypes.LoadLogList](context: ActionAugments): void
    [ActionTypes.LoadQsoList](context: ActionAugments): void

    [ActionTypes.CreateLog](context: ActionAugments, setToCurrent: boolean): void
    [ActionTypes.UpdateUser](context: ActionAugments, data: Partial<UserSettings>): void
    [ActionTypes.UpdateLog](context: ActionAugments, data: Partial<Log>): void
    [ActionTypes.UpdateSettings](context: ActionAugments, data: Partial<LogSettings>): void
    [ActionTypes.UpdateStation](context: ActionAugments, data: Partial<LogStation>): void
    [ActionTypes.UpdateQso](context: ActionAugments, data: Partial<Qso>): void
    [ActionTypes.DeleteQso](context: ActionAugments, id: IDBValidKey): void,
    [ActionTypes.DeleteLog](context: ActionAugments, id: IDBValidKey): void,
    [ActionTypes.LoadContestsList](contest: ActionAugments): void
}

export const actions:ActionTree<State, State> & Actions = {
  async [ActionTypes.LoadUser] ({ commit }) {
    const user = await idb.getUser()
    commit(MutationType.SetUser, user)
  },
  async [ActionTypes.LoadLogList] ({ commit }) {
    const logList = await idb.getLogList()
    console.log('loglist', logList)
    commit(MutationType.SetLogList, logList)
  },
  async [ActionTypes.LoadQsoList] ({ commit }) {
    const qsoList = await idb.getQsoList()
    commit(MutationType.SetQsoList, qsoList)
  },
  async [ActionTypes.CreateLog] ({ commit }, setToCurrent = true) {
    const id = await idb.createLog()
    const log = await idb.getLog(id)
    if (setToCurrent) {
      await idb.updateUser({
        currentLog: id as IDBValidKey
      })
    }

    if (id && log) {
      console.log('will commit for new log')
      commit(MutationType.AddLog, log)
      if (setToCurrent) {
        commit(MutationType.SetUser, { currentLog: id })
      }
    }
  },
  async [ActionTypes.UpdateUser] ({ commit }, data) {
    await idb.updateUser(data)
    commit(MutationType.SetUser, data)
  },
  async [ActionTypes.UpdateLog] ({ commit }, data) {
    try {
      const id = await idb.updateLog(data)
      commit(data.id ? MutationType.SetLog : MutationType.AddLog, { ...data, id })
    } catch (error) {
      console.log('[actions:UpdateLog] Could not update. Error from IDB')
    }
  },
  async [ActionTypes.UpdateSettings] ({ commit }, data) {
    try {
      await idb.updateLogSettings(data)
      commit(MutationType.SetLogSettings, data)
    } catch (error) {
      console.log('[actions:UpdateLog] Could not update. Error from IDB')
    }
  },
  async [ActionTypes.UpdateStation] ({ commit }, data) {
    try {
      await idb.updateLogStation(data)
      commit(MutationType.SetLogStation, data)
    } catch (error) {
      console.log('[actions:UpdateLog] Could not update. Error from IDB')
    }
  },
  async [ActionTypes.UpdateQso] ({ commit }, data) {
    try {
      console.log('will update QSO', data)
      const id = await idb.updateQso(data)
      commit(data.id ? MutationType.SetQso : MutationType.AddQso, { ...data, id })
    } catch (error) {
      console.log('[actions:UpdateQso] Could not update. Error from IDB', error)
    }
  },
  async [ActionTypes.DeleteQso] ({ commit }, id) {
    try {
      await idb.deleteQso(id)
    } catch (error) {
      console.log('[actions:DeleteQso] Could not delete. Error from IDB')
    }
    commit(MutationType.RemoveQso, id)
  },
  async [ActionTypes.DeleteLog] ({ commit }, id) {
    try {
      await idb.deleteLog(id)
    } catch (error) {
      console.log('[actions:DeleteLog] Could not delete. Error from IDB')
    }
    commit(MutationType.RemoveQso, id)
  },
  [ActionTypes.LoadContestsList] ({ commit }) {
    // Could possibly load from DB contests instead of static files?
    // So users could add their own definitions
    commit(MutationType.SetContestList, contests)
  }
}
