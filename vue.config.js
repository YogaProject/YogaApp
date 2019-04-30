// const path = require('path')
// const resolve = dir => path.join(__dirname, dir)

module.exports = {
  runtimeCompiler: true,
  // 配置路径别名
  devServer: {
    proxy: {
      '/abc/': {
        target: 'http://125.69.92.155:80',
        ws: true,
        changeOrigin: true
        // pathRewrite: {
        //   '^/abc': '/'
        // }
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
