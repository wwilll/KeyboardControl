const { Tray, Menu, app } = require('electron')
const { startKoaService, closeKoaService, getServerPort } = require('./koa')
const { openUrl, getRelativePath, Estore, getIPAddress } = require('../utils/index')

let tray
const generateTray = () => {
  tray = new Tray(getRelativePath('@/imgs/keyboard.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      id: 'startServer',
      label: '启动服务',
      type: 'checkbox',
      checked: false,
      // checked: Estore.getValue('autoStartServer'),
      click(menuItem, browserWindow, event) {
        if (menuItem.checked) {
          startKoaService((port) => {
            contextMenu.getMenuItemById('openServer').enabled = true
            contextMenu.getMenuItemById('startServer').label = '关闭服务'
          })
        } else {
          closeKoaService()
          contextMenu.getMenuItemById('openServer').enabled = false
          contextMenu.getMenuItemById('startServer').label = '启动服务'
        }
      },
    },
    {
      id: 'openServer',
      label: '打开访问链接',
      type: 'normal',
      enabled: false,
      click(menuItem, browserWindow, event) {
        const port = getServerPort()
        const ip = getIPAddress()
        const url = `http://${ip}:${port}`
        openUrl(url)
      },
    },
    {
      label: '退出',
      type: 'normal',
      click() {
        app.quit()
      },
    },
  ])

  tray.setToolTip('远程键盘')
  tray.setContextMenu(contextMenu)

  if (Estore.getValue('autoStartServer')) {
    contextMenu.getMenuItemById('startServer').click()
  }

  tray.on('click', () => {
    // 显示主程序
    // mainWindow.show()
    // 关闭托盘显示
    // appTray.destroy();
  })
  tray.on('double-click', () => {
    if (global.G.homeWindow) {
      global.G.homeWindow.show()
    }
  })
  return tray
}

const destroyTray = () => {
  tray && tray.destroy()
}

module.exports = {
  generateTray,
  destroyTray,
}
