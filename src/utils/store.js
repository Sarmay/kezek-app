import { Store } from 'tauri-plugin-store-api'
const store = new Store('.settings.dat')

export default {
  async setStore (key, data) {
    try {
      await store.set(key, data)
      await store.save()
      return true
    } catch (error) {
      return false
    }
  },
  getStore (key) {
    return store.get(key)
  },

  hasStore (key) {
    return store.has(key)
  },

  deleteStore (key) {
    return store.delete(key)
  }

  // reset
}
