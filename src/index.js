/**
 * Created by OXOYO on 2017/4/17.
 * XFlowchart 插件
 */

import Flowchart from './components/Flowchart.js'

const XFlowchart = {}

// 防重标识
XFlowchart.installed = false
// 安装
XFlowchart.install = function (Vue, options = {}) {
  if (XFlowchart.installed) {
    return
  }
  Vue.component('XFlowchart', Flowchart)

  // 实例 TODO 实现实例
  // Vue.prototype.$XFlowchart = Flowchart

  XFlowchart.installed = true
}
// 实例初始化

// 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XFlowchart)
}

export default XFlowchart
