const { app } = require('electron')
const Store = require('electron-store')

const store = new Store()

store.store = {
  autoStartServer: true,
}

const getStorePath = () => {
  return app.getPath('userData')
}

const getValue = (key) => {
  return store.get(key)
}
const setValue = (key, v = null) => {
  return store.set(key, v)
}

module.exports = {
  store,
  getStorePath,
  getValue,
  setValue,
}
