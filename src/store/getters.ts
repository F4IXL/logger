import { GetterTree } from 'vuex'
import { State } from './state'
import { ContestEntry, ContestRules, ContestSettings, master, MasterContest } from './contests'
import { Log, LogSettings, LogStation } from './types'

export type Getters = {
    log(state: State): Omit<Log, 'station' | 'settings'>,
    station(state: State): LogStation,
    settings(state: State): LogSettings,
    contest(state: State): MasterContest,
    qsoCount(state: State): number,
}

function merge (master, contest) {
  return Object.keys(master).reduce((obj, key) => {
    obj[key] = { ...master[key], ...contest[key] }
    return obj
  }, {})
}

export const getters:GetterTree<State, State> & Getters = {
  log (state) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    if (log) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { station, settings, ...partial } = log
      return partial
    }
  },
  station (state) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    return log && log.station
  },
  settings (state) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)
    return log && log.settings
  },
  contest (state) {
    const log = state.logList.find((log) => log.id === state.user.currentLog)

    if (!log) return null

    const contest = Object.assign({}, state.contestsList[log.contest])

    return {
      name: contest.name,
      settings: merge(master.settings, contest.settings) as ContestSettings,
      entry: { ...merge(master.entry, contest.entry), ...contest.entry.custom } as ContestEntry,
      rules: merge(master.rules, contest.rules) as ContestRules
    } as MasterContest
  },
  qsoCount (state) {
    return state.qsoList.filter((qso) => qso.logId === state.user.currentLog).length
  }
}
