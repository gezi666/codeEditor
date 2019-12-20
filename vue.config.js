
// 详细配置参数请参考：https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE

const webpack = require('webpack')
// const path = require('path')

// 请求后台地址
let api_url = ""

// 动态获取命令行服务器地址
try {
  let url = JSON.parse(process.env.npm_config_argv).remain[0]
  api_url = url ? url : ""
} catch (e) {
  api_url = ""
  console.log("获取process参数异常")
}

module.exports = {
  publicPath: "./",
  devServer: {
    // easymock模拟接口
    // proxy: ''
  },
  productionSourceMap: false,
  // webpack相关
  configureWebpack: config => {
    // 定义全局API请求地址
    config.plugins.push(
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(api_url)
      })
    )
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 5,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](echarts|element-ui)[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `vendors~${packageName.replace('@', '')}`
            }
          }
        }
      }
    } else {
      // 为开发环境修改配置...
    }
  }
}