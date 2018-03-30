import Vue from 'vue'
import App from './App'

// 导入XFormEditor
import XFlowchart from '../src/index'
Vue.use(XFlowchart)

// Vue 全局配置
let isDev = process && process.env.NODE_ENV !== 'production'
Vue.config.debug = isDev
Vue.config.devtools = isDev
Vue.config.productionTip = isDev

/* eslint-disable no-new */
// 启动应用
new Vue({
  render: h => h(App)
}).$mount('#app')
