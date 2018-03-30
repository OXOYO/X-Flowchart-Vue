/**
 * Created by OXOYO on 2018/3/30.
 */

import XFlowchart from './components/Index.vue'

const XFC = {}

XFC.installed = false
XFC.install = function (Vue) {
  if (XFC.installed) {
    return
  }

  Vue.component('XFlowchart', XFlowchart)
  XFC.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XFC)
}

export default XFC
