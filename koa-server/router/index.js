const Router = require('koa-router')
const router = new Router()
const { pressKey } = require('../utils')

router.get('/', async (ctx) => {
  let html = `
    <div>
      控件服务已启用，
      <a href='/api/invoke?key=f11'>点击测试f11</a>
      <a href='/api/invoke?key=F11'>错误的按键F11</a>
    </div>
  `
  ctx.body = html
})
router.get('/api/invoke', async (ctx) => {
  const { key } = ctx.query
  // ctx.body = `已为您按下${key}`
  const msg = pressKey(key)
  if (msg) {
    let html = `
      <div>
        <a href='/'>返回主页</a>
        <p>${msg}</p>
      </div>
    `
    ctx.body = html
  } else {
    ctx.body = undefined
  }
})

module.exports = router
