import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from 'vuex'

// import { contests } from '../api/Contests.js'

import { State, state } from './state'
import { Mutations, mutations } from './mutations'
import { Actions, actions, ActionTypes } from './actions'
import { Getters, getters } from './getters'

export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters
})

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

store.dispatch(ActionTypes.LoadUser)
store.dispatch(ActionTypes.LoadLogList)
store.dispatch(ActionTypes.LoadQsoList)
store.dispatch(ActionTypes.LoadContestsList)

export function useStore ():Store {
  return store
}
