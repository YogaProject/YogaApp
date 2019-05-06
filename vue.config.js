// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // runtimeCompiler: true,
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.5.58:8082/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  }

}
