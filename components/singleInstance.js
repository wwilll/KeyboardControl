const { app } = require('electron')

const handleSingleInstance = () => {
  app.on('first-instance-ack', (event, additionalData) => {
    // 打印出从第一实例接收的 ack
    // 注意事件处理程序调用，必须在 requestSingleInstanceLock 调用之前。
    // 预计输出： '{"myAckKey":"myAckValue"}'
    console.log('first-instance-ack', JSON.stringify(additionalData))
  })

  const additionalData = { myKey: 'myValue' }
  // 将additionalData 发送到第一实例（如果本实例是第二实例的话）
  const gotTheLock = app.requestSingleInstanceLock(additionalData)

  console.log('gotTheLock', gotTheLock)

  if (!gotTheLock) {
    app.quit()
    return true
  } else {
    app.on('second-instance', (event, commandLine, workingDirectory, additionalData, ackCallback) => {
      // 如果我们要回传数据，就必须调用 preventDefault 。
      event.preventDefault()
      // 打印出从第二实例接收的数据。
      // 预计输出：'{"myKey":"myValue"}'
      console.log('second-instance', JSON.stringify(additionalData))
      // 尝试使用第二实例，我们应该使我们的窗口获得焦点。
      if (global.G.homeWindow) {
        if (global.G.homeWindow.isMinimized()) global.G.homeWindow.restore()
        global.G.homeWindow.focus()
      }
      const ackData = { myAckKey: 'myAckValue' }
      ackCallback(ackData)
      console.log('ackData', ackData)
    })
  }
}

module.exports = handleSingleInstance
