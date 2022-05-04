const utils = require('../utils')

const defaultConfig = {
  debug: false,
}

global.G = {
  ...defaultConfig,
  ...utils,
}
