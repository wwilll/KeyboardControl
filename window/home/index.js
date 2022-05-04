const { BrowserWindow, ipcMain } = require('electron')

const isDebug = global.G.debug

// todo
const createHomeWindow = () => {
  global.G.homeWindow = new BrowserWindow({
    width: isDebug ? 1500 : 600,
    height: isDebug ? 950 : 250,
    minHeight: 180,
    minWidth: 350,
    transparent: !isDebug,
    frame: isDebug,
    icon: global.G.getRelativePath('@/imgs/keyboard.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: global.G.getRelativePath('@/window/home/preload.js'),
      devTools: isDebug,
    },
  })

  isDebug && global.G.homeWindow.webContents.openDevTools()
  global.G.homeWindow.loadFile(global.G.getRelativePath('@/window/home/home.html'))

  // global.G.homeWindow.on('close', (e) => {
  //   // 阻止后会对app.quit造成影响
  //   e.preventDefault()
  //   global.G.homeWindow.hide()
  // })

  ipcMain.on('close-window', (e, data) => {
    global.G.homeWindow.hide()
  })

  return global.G.homeWindow
}

module.exports = {
  createHomeWindow,
}
