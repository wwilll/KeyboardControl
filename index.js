const { app } = require('electron')
require('./config/index')
const { createHomeWindow } = require('./window/index')
const { generateTray } = require('./components/tray')

// 处理单实例限制
const handleSingleInstance = require('./components/singleInstance')
// 使用throw error语句会弹出错误框
// if (handleSingleInstance()) throw new Error('不允许打开多实例')
if (!handleSingleInstance()) {
  app.whenReady().then(() => {
    generateTray()
    createHomeWindow()
    // todo
    // setTimeout(() => {
    //   // global.G.homeWindow.minimize()
    //   global.G.homeWindow.hide()
    // }, 5000)
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
