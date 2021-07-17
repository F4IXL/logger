import { MutationTree } from 'vuex'
import { Contests } from './contests'
import { State } from './state'
import { Log, LogSettings, LogStation, Qso, QsoList, UserSettings } from './types'

export enum MutationType {
    SetUser = 'SET_USER',
    SetLog = 'SET_LOG',
    SetLogSettings = 'SET_LOG_SETTINGS',
    SetLogStation = 'SET_LOG_STATION',
    SetQsoList = 'SET_QSO_LIST',
    SetQso = 'SET_QSO',
    AddQso = 'ADD_QSO',
    RemoveQso = 'REMOVE_QSO',
    SetLogList = 'SET_LOG_LIST',
    AddLog = 'ADD_LOG',
    RemoveLog = 'REMOVE_LOG',
    SetContestList = 'SET_CONTESTS_LIST'
}

export type Mutations = {
    [MutationType.SetUser](state: State, data: Partial<UserSettings> | UserSettings): void
    [MutationType.SetLog](state: State, data: Partial<Log> | Log): void
    [MutationType.SetLogSettings](state: State, data: Partial<LogSettings> | LogSettings): void
    [MutationType.SetLogStation](state: State, data: Partial<LogStation> | LogStation): void
    [MutationType.SetQsoList](state: State, list: QsoList): void
    [MutationType.SetQso](state: State, qso: Partial<Qso>): void
    [MutationType.AddQso](state: State, qso: Qso): void
    [MutationType.RemoveQso](state: State, id: IDBValidKey): void
    [MutationType.SetLogList](state: State, list: Array<Log>): void
    [MutationType.AddLog](state: State, log: Log): void
    [MutationType.RemoveLog](state: State, id: IDBValidKey): void,
    [MutationType.SetContestList](state: State, contests: Contests): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUser] (state, data) {
    state.user = {
      ...state.user,
      ...data
    }
  },
  [MutationType.SetLog] (state, data) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    if (log) Object.assign(log, data)
    else throw new Error(`[mutations.SetLog] No such log to set with id ${data.id}`)
  },
  [MutationType.SetLogSettings] (state, data) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    if (log) Object.assign(log.settings, data)
    else throw new Error(`[mutations.SetLog] No such log to set settings with id ${state.user.currentLog}`)
  },
  [MutationType.SetLogStation] (state, data) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    if (log) Object.assign(log.station, data)
    else throw new Error(`[mutations.SetLog] No such log to set station with id ${state.user.currentLog}`)
  },
  [MutationType.SetQsoList] (state, list) {
    state.qsoList = list
  },
  [MutationType.SetQso] (state, qso) {
    const index = state.qsoList.findIndex((q) => {
      return q.id === qso.id
    })
    if (index > -1) {
      Object.assign(state.qsoList[index], qso)
    } else {
      throw new Error(`[mutations.SetQso] No such QSO with id: ${qso.id}`)
    }
  },
  [MutationType.AddQso] (state, qso) {
    state.qsoList.push(qso)
  },
  [MutationType.RemoveQso] (state, id) {
    const index = state.qsoList.findIndex((qso) => qso.id === id)
    if (index) {
      state.qsoList.splice(index, 1)
    } else {
      throw new Error(`[mutations.RemoveQso] No such QSO with id: ${id}`)
    }
  },
  [MutationType.SetLogList] (state, list) {
    state.logList = list
  },
  [MutationType.AddLog] (state, log) {
    state.logList.push(log)
  },
  [MutationType.RemoveLog] (state, id) {
    const index = state.qsoList.findIndex((qso) => qso.id === id)
    if (index) {
      state.logList.splice(index, 1)
    } else {
      throw new Error(`[mutations.RemoveLog] No such Log with id: ${id}`)
    }
  },
  [MutationType.SetContestList] (state, contests) {
    state.contestsList = contests
  }
}
