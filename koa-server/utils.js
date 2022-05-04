const robot = require('robotjs')
/**
 * 触发键盘事件
 * @param {*} key
 */
function pressKey(key) {
  try {
    robot.keyTap(key)
  } catch (error) {
    return error?.message || 'unknow error'
  }
}

module.exports = {
  pressKey,
}
