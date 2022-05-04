const path = require('path')

let serverProc, serverPort

const startKoaService = (cb) => {
  serverProc = require('child_process').fork(
    path.resolve(__dirname, '../koa-server/index.js'),
    ['--key', 'value'], // pass to process.argv into child
    {
      // options
    }
  )
  serverProc.on('exit', (code, sig) => {
    console.log('components/koa: exit====>', code, sig)
  })
  serverProc.on('error', (error) => {
    console.log('components/koa: error====>', error)
  })
  serverProc.on('message', ({ port }) => {
    serverPort = port
    cb && cb(port)
  })
}

const closeKoaService = () => {
  serverProc && serverProc.kill()
  serverProc = undefined
  serverPort = undefined
}
const getServerPort = () => serverPort

module.exports = { startKoaService, closeKoaService, getServerPort }
