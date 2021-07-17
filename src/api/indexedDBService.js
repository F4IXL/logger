import { openDB } from 'idb'

const dbPromise = (_) => {
  if (!('indexedDB' in window)) {
    throw new Error('Browser does not support IndexedDB')
  }

  return openDB('ham', 1, {
    async upgrade (db) {
      console.log(`Upgrading to version ${db.version}`)

      // -- Preset
      const presets = db.createObjectStore('presets', { keyPath: 'id', autoIncrement: true })

      const defaultPreset = {
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
        licence: '2',
        latitude: 0.00,
        longitude: 0.00,
        tx: 'Yaesu FT-857',
        power: '100W',
        antenna: 'Dipole Inverted V',
        antennaHeight: '10m',
        arrlSection: '3C',
        email: 'fbouly@gmail.com'
      }

      presets.createIndex('call', 'call', { unique: false })

      const preset = await presets.put(defaultPreset)

      // -- Logs

      const logs = db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true })

      const defaultLog = {
        preset,
        name: 'dx'
      }

      logs.createIndex('name', 'name', { unique: true })
      logs.createIndex('preset', 'preset', { unique: false })

      const log = await logs.put(defaultLog)

      // -- User

      const user = db.createObjectStore('user')

      user.put(null, 'masterPreset') // Preset used by default. Null is last used.
      user.put(log, 'currentLog') // Preset used by default

      // -- QSOs

      const qsos = db.createObjectStore('qsos', { keyPath: 'id', autoIncrement: true })

      qsos.createIndex('log', 'log', { unique: false })
      qsos.createIndex('call', 'call', { unique: false })
      qsos.createIndex('date', 'date', { unique: false })
      qsos.createIndex('mode', 'mode', { unique: false })
    }
  })
}

// If null will get all values
const getUser = async (key = null) => {
  const db = await dbPromise()
  const tx = db.transaction('user', 'readonly')
  const store = tx.objectStore('user')
  return key
    ? store.get(key)
    : (async () => {
        const data = {}
        let cursor = await store.openCursor()
        while (cursor) {
          data[cursor.primaryKey] = cursor.value
          cursor = await cursor.continue()
        }
        return data
      })()
}

const getLogStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('logs', write ? 'readwrite' : 'readonly')
  return tx.objectStore('logs')
}

const getLog = async (log = null) => {
  const user = await getUser()
  const store = await getLogStore()
  return log ? store.get(log) : store.get(parseInt(user.currentLog))
}

const updateLog = async (data, log = null) => {
  const logData = await getLog(log)
  const store = await getLogStore(true)
  return store.put({
    ...logData,
    ...data
  }).then((res) => {
    console.log('that went fine')
  })
}

const getPresetStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('presets', write ? 'readwrite' : 'readonly')
  return tx.objectStore('presets')
}

const getPresetList = async () => {
  const store = await getPresetStore()
  return store.getAll()
}

const getPreset = async (preset = null) => {
  const log = await getLog()
  const store = await getPresetStore()
  return preset ? store.get(preset) : store.get(parseInt(log.preset))
}

const updatePreset = async (data, preset = null) => {
  const presetData = await getPreset(preset)
  const store = await getPresetStore(true)
  return store.put({
    ...presetData,
    ...data
  }).then((res) => {
    console.log('that went fine')
  })
}

const getQsoStore = async (write = false) => {
  const db = await dbPromise()
  const tx = db.transaction('qsos', write ? 'readwrite' : 'readonly')
  return tx.objectStore('qsos')
}

const getQsoList = async (logId = null) => {
  const log = await getLog()
  const store = await getQsoStore()

  return store.index('log').getAll(logId || log.id)
}

const updateQso = async (data, logId = null) => {
  const log = await getLog()
  const store = await getQsoStore(true)
  data.log = logId || log.id
  console.log('updating qso', data)
  return store.put(data)
}

const deleteQso = async (id) => {
  const store = await getQsoStore(true)
  return store.delete(id)
}

// old methods

const saveToStorage = async (storeName, key, data) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readwrite')
    const store = tx.objectStore(storeName)
    store.put(data, key)
    return tx.complete
  } catch (error) {
    return error
  }
}

const checkStorage = async (storeName) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    return store.getAll()
  } catch (error) {
    return error
  }
}

const getAllData = async (storeName) => {
  try {
    const db = await dbPromise()
    const tx = db.transaction(storeName, 'readonly')
    const store = tx.objectStore(storeName)
    const data = {}

    let cursor = await store.openCursor()

    while (cursor) {
      data[cursor.primaryKey] = cursor.value
      console.log(cursor)
      cursor = await cursor.continue()
    }

    return data
  } catch (error) {
    return error
  }
}

export default {
  getUser,

  getLog,
  updateLog,

  getPreset,
  getPresetList,
  updatePreset,

  getQsoList,
  // getQso,
  updateQso,
  deleteQso,

  // Legacy
  checkStorage,
  saveToStorage,
  getAllData
}
