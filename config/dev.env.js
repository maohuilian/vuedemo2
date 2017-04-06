var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ADDR: '"http://fengcss.com:53000/api/v1"'
})
