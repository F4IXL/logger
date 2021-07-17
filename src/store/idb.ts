/**
 * API for IndexedDB
 */

import { openDB } from 'idb'
import { Log, LogSettings, LogStation, Qso, QsoList, UserSettings } from './types'

const dbPromise = () => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }

  return openDB('logger', 1, {
    async upgrade (db) {
      console.log(`Upgrading to version ${db.version}`)

      // -- Log
      const logStore = db.createObjectStore('log', { keyPath: 'id', autoIncrement: true })

      // Default station
      const station:LogStation = {
        call: 'F4IXL',
        name: 'Franco',
        address1: 'No Address',
        address2: 'Nothing',
        city: 'Cintegabelle',
        state: '',
        zip: '31550',
        country: 'France',
        grid: 'JN00AA',
        cq: 1,
        itu: 1,
        licence: 2,
        latitude: 0.00,
        longitude: 0.00,
        tx: 'Yaesu FT-857',
        power: '100W',
        antenna: 'Dipole Inverted V',
        antennaHeight: '10m',
        arrlSection: '3C',
        email: 'fbouly@gmail.com'
      }

      // Default settings
      const settings:LogSettings = {
        band: 'ALL',
        mode: 'MIXED',
        operator: 'SINGLE-OP',
        operators: '',
        power: 'HIGH',
        stationCategory: 'FIXED',
        assistedCategory: 'NON-ASSISTED',
        timeCategory: 'N/A'
      }

      // Default log
      const defaultLog:Log = {
        name: 'dx',
        contest: 'DX',
        station,
        settings
      }

      // Adds a default log to the store
      const log = await logStore.put(defaultLog)

      console.log('will put log as', log)

      // -- User

      const user = db.createObjectStore('user')

      user.put(log, 'currentLog') // Add default log to the currentLog

      // -- QSOs

      const qsoStore = db.createObjectStore('qso', { keyPath: 'id', autoIncrement: true })

      qsoStore.createIndex('logId', 'logId', { unique: false })

      // @todo: can we create deep indexes? #offgrid
      // qsoStore.createIndex('call', 'call', { unique: false })
      // qsoStore.createIndex('date', 'date', { unique: false })
    }
  })
}

/**
 * USER - User long term settings
 */

const getUserStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('user', write ? 'readwrite' : 'readonly')
  return tx.objectStore('user')
}

// If null will get all values
const getUser = async (key = null):Promise<UserSettings> => {
  const db = await dbPromise()
  const tx = db.transaction('user', 'readonly')
  const store = tx.objectStore('user')
  return key
    ? store.get(key)
    : (async () => {
        const data = {}
        let cursor = await store.openCursor()
        while (cursor) {
          data[cursor.primaryKey.toString()] = cursor.value
          cursor = await cursor.continue()
        }
        return data
      })()
}

const updateUser = async (data:Partial<UserSettings>):Promise<void> => {
  const store = await getUserStore(true)
  return Promise.all(Object.keys(data).map((key) => {
    return store.put(data[key], key)
  })).then(() => {
    console.log('that went fine...')
  })
}

/**
 * LOG - Store all data about a log but no QSO
 */

const getLogStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('log', write ? 'readwrite' : 'readonly')
  return tx.objectStore('log')
}

const getLog = async (log:IDBValidKey = null):Promise<Log> => {
  const user = await getUser()
  const store = await getLogStore()
  return log ? store.get(log) : store.get(user.currentLog)
}

// Create a duplicate of current Log
const createLog = async ():Promise<IDBValidKey> => {
  const log = await getLog()
  const store = await getLogStore(true)

  // Make sure not to edit new log
  delete log.id

  return store.put({
    ...log,
    name: `copy of ${log.name}`
  }).then((key) => {
    console.log('that went fine', key)
    return key
  })
}

const getLogList = async ():Promise<Array<Log>> => {
  const store = await getLogStore()
  return store.getAll()
}

const updateLog = async (data:Partial<Log>, log = null):Promise<IDBValidKey> => {
  const logData = await getLog(log)
  const store = await getLogStore(true)
  // @todo: Make sure this is needed (check in updateQso where we do not recreate a newData object)
  const newData:Log = {
    ...logData,
    ...data
  }
  return store.put(newData).then((key) => {
    console.log('that went fine')
    return key
  })
}

const deleteLog = async (id:IDBValidKey):Promise<void> => {
  const store = await getLogStore(true)
  return store.delete(id)
}

const updateLogStation = async (station:Partial<LogStation>, log = null):Promise<number|void> => {
  const logData = await getLog(log)
  const store = await getLogStore(true)
  const newData:Partial<Log> = {
    ...logData,
    station: {
      ...logData.station,
      ...station
    }
  }
  return store.put(newData).then(() => {
    console.log('that went fine')
  })
}

const updateLogSettings = async (settings:Partial<LogSettings>, log = null):Promise<IDBValidKey> => {
  const logData = await getLog(log)
  const store = await getLogStore(true)
  const newData:Partial<Log> = {
    ...logData,
    settings: {
      ...logData.settings,
      ...settings
    }
  }
  console.log('will update log settings:', newData)
  return store.put(newData).then((key) => {
    console.log('that went fine')
    return key
  })
}

/**
 * QSO - Store all informations about a QSO and is attached to a log
 */

const getQsoStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('qso', write ? 'readwrite' : 'readonly')
  return tx.objectStore('qso')
}

const getQsoList = async (logId = null):Promise<QsoList> => {
  // const log = await getLog()
  const store = await getQsoStore()

  return store.index('logId').getAll(logId || null)
}

const updateQso = async (data:Partial<Qso>, logId = null):Promise<IDBValidKey> => {
  const log = await getLog()
  const store = await getQsoStore(true)
  data.logId = logId || log.id
  return store.put(data).then((key) => {
    console.log('that went fine...')
    return key
  })
}

const deleteQso = async (id:IDBValidKey):Promise<void> => {
  const store = await getQsoStore(true)
  return store.delete(id)
}

export default {
  getUser,
  updateUser,

  getLog,
  createLog,
  getLogList,
  updateLog,
  deleteLog,
  updateLogStation,
  updateLogSettings,

  // getQso, // @todo ? Is is needed ?
  getQsoList,
  updateQso,
  deleteQso
}

// @hotfix
// async function resetLog () {
//   const station:LogStation = {
//     call: 'F4IXL',
//     name: 'Franco',
//     address1: 'No Address',
//     address2: 'Nothing',
//     city: 'Cintegabelle',
//     state: '',
//     zip: '31550',
//     country: 'France',
//     grid: 'JN00AA',
//     cq: 1,
//     itu: 1,
//     licence: 2,
//     latitude: 0.00,
//     longitude: 0.00,
//     tx: 'Yaesu FT-857',
//     power: '100W',
//     antenna: 'Dipole Inverted V',
//     antennaHeight: '10m',
//     arrlSection: '3C',
//     email: 'fbouly@gmail.com'
//   }
//   const settings:LogSettings = {
//     band: 'ALL',
//     mode: 'MIXED',
//     operator: 'SINGLE-OP',
//     operators: '',
//     power: 'HIGH',
//     stationCategory: 'FIXED',
//     assistedCategory: 'NON-ASSISTED',
//     timeCategory: 'N/A'
//   }
//   const defaultLog:Log = {
//     id: 1,
//     name: 'dx',
//     contest: 'DX',
//     station,
//     settings
//   }
//   const logStore = await getLogStore(true)
//   const log = await logStore.put(defaultLog)
//   console.log('logreset result', log)

//   const userStore = await getUserStore(true)
//   userStore.put(log, 'currentLog')
// }

// window.resetLog = resetLog
