'use strict'
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"development"',
  APIS_URL: '"/apis"',
  APIBook_URL: '"/apibook"',
  ICON_URL: '""',
  IMGW_URL: '"http://img.airkx.cn/cp/"'
})
