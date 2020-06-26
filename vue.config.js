/**
 * Created by OXOYO on 2019/5/31.
 *
 * cli 配置文件
 *
 * 文档：https://cli.vuejs.org/zh/config/
 */

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
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'build-lib') {
      config.externals = {
        'vue': 'vue',
        'vuex': 'vuex',
        '@antv/g6': '@antv/g6',
        'iview': 'iview'
      }
    }
  }
}
