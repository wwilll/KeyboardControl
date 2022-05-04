const path = require('path')
// const router = require('/koa-server/router/index')
const router = require(path.join(__dirname, '/router/index.js'))

const Koa = require('koa')
const app = new Koa()

app.use(router.routes())

// console.log(readInfoFile());

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });

// // 响应
// app.use((ctx) => {
//   ctx.body = "Hello Koa";
// });

const listenPort = async (port) =>
  new Promise((res, rej) => {
    app
      .listen(port, () => {
        process.send({ port })
        res([true, `The server starts on port: ${port}`])
      })
      .on('error', (e) => {
        res([false, e.message])
      })
  })

const startListen = async () => {
  for (let i = 3009; i < 4000; i++) {
    const [success, msg] = await listenPort(i)
    console.log(`${success ? '====>' : 'xxxxx'}`, msg)
    if (success) break
  }
}

startListen()
