import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home.vue'

import Station from '../views/Station.vue'

import Log from '../views/Log.vue'
import LogList from '../views/LogList.vue'

import UserSettings from '../views/UserSettings.vue'
import About from '../views/About.vue'

import Export from '../views/Export.vue'
import idb from '../store/idb'
import { useStore } from '../store'
import { ActionTypes } from '../store/actions'

const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/log',
    name: 'Log',
    component: Log
  },
  {
    path: '/log/list',
    name: 'LogList',
    component: LogList
  },
  {
    path: '/log/new',
    name: 'LogNew',
    async beforeEnter () {
      const store = useStore()
      store.dispatch(ActionTypes.CreateLog)
      const id = await idb.createLog().then((id) => {
        console.log('got new log id', id)
        return id
      }).catch((err) => {
        console.error('error creating new log', err)
      })
      await idb.updateUser({
        currentLog: id as IDBValidKey
      }).then(() => {
        console.log('User was edited using new log : ', id)
      }).catch((err) => {
        console.error('Problem while updating', id, err)
      })
    },
    component: Log
  },
  {
    path: '/station',
    name: 'Station',
    component: Station
  },
  {
    path: '/user',
    name: 'UserSettings',
    component: UserSettings
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/export',
    name: 'Export',
    component: Export
  }
]
const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes
})
export default router
