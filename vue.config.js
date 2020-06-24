/**
 * Created by OXOYO on 2019/5/31.
 *
 * cli 配置文件
 *
 * 文档：https://cli.vuejs.org/zh/config/
 */

const webpack = require('webpack')

module.exports = {
  // 部署应用包时的基本URL，置空使用相对路径
  publicPath: '/X-Flowchart-Vue/',
  // 打包输出目录
  outputDir: 'docs',
  // 静态资源目录
  assetsDir: '',
  productionSourceMap: false,
  // 开发环境
  // devServer: {
  //   // 代理设置
  //   proxy: {
  //     '/api': {
  //       target: '<url>',
  //       changeOrigin: true
  //     }
  //   }
  // }
  css: {
    loaderOptions: {
      less: {
        // 解决https://github.com/ant-design/ant-motion/issues/44问题
        // 相关问题：https://github.com/ant-design/ant-design/issues/7927#issuecomment-372513256
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    output: {
      // path: `${root}/public/assets/`,
      // publicPath: '/lead/assets',
      // filename: `${fileName()}.js`,
      chunkFilename: '[name].[chunkhash].js'
    },
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      '@antv/g6': 'G6',
      'iview': 'iview'
    }
  }
  ,
  chainWebpack: config => {
    const cdn = {
      // 访问https://unpkg.com/element-ui/lib/theme-chalk/index.css获取最新版本
      css: ['//unpkg.com/iview@3.4.2/dist/styles/iview.css'],
      js: [
        '//unpkg.com/vue@2.6.10/dist/vue.min.js',
        '//unpkg.com/vuex@3.0.1/dist/vuex.min.js',
        '//unpkg.com/iview@3.4.2/dist/iview.js',
        '//unpkg.com/@antv/g6@3.5.6/dist/g6.min.js'
      ]
    }

    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })
  }
}
