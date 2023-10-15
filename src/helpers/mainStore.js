import localforage, { INDEXEDDB } from 'localforage'

export const mainStore = localforage.createInstance({
  name: 'mainStore',
  description: 'Main instance',
  driver: INDEXEDDB
})
