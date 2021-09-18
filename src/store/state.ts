import { Contests } from './contests'
import { LogList, QsoList, UserSettings, VfoState } from './types'

export interface State {
  vfo: VfoState,
  user: UserSettings,
  qsoList: QsoList,
  logList: LogList,
  contestsList: Contests
}

export const state:State = {
  vfo: {
    mode: 'SSB',
    frequency: 3500
  },
  user: {
    currentLog: 1
  },
  qsoList: [],
  logList: [],
  contestsList: null
}
