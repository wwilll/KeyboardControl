const { shell } = require('electron')
const robot = require('robotjs')
const Estore = require('./electron-store')
const path = require('path')

/**
 * 在浏览器中打开链接
 * @param {*} url
 */
function openUrl(url) {
  url && shell.openExternal(url)
}

/**
 * 获取本地ip
 * @returns ip
 */
function getIPAddress() {
  const interfaces = require('os').networkInterfaces()
  const netKeys = Object.keys(interfaces)
  const yiTaiList = netKeys.filter((i) => i.startsWith('以太网'))
  const wlanList = netKeys.filter((i) => i.startsWith('WLAN'))
  const notNetList = netKeys.filter((i) => !['以太网', 'WLAN'].some((ii) => i.startsWith(ii)))
  // console.log([...yiTaiList, ...notYiTaiList])
  for (var devName of [...yiTaiList, ...wlanList, ...notNetList]) {
    var iface = interfaces[devName]
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

/**
 * 触发键盘事件
 * @param {*} key
 */
function pressKey(key) {
  robot.keyTap(key)
}

function getRelativePath(rpath) {
  if (rpath.startsWith('@/')) {
    return path.resolve(__dirname, '..', rpath.slice(2))
  }
}

const utils = {
  getIPAddress,
  openUrl,
  pressKey,
  Estore,
  getRelativePath,
}

module.exports = utils
