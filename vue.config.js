process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_API_BASE_URL="https://whatsamenu.core.wiredmartians.com"

module.exports = {
  transpileDependencies: true,
  productionSourceMap: false,

}
