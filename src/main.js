import Vue from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './i18n'
import * as Cookies from 'js-cookie'
import './registerServiceWorker'

import utils from './global/utils'
import components from './global/components'
import config from './config'
import './assets/styles/main.less'

import XHighlight from 'x-highlight'
import 'x-highlight/dist/css/XHighlight.css'
// highlight theme
import 'highlight.js/styles/zenburn.css'

// Vue 全局配置
let isDev = process && process.env.NODE_ENV !== 'production'
Vue.config.debug = isDev
Vue.config.devtools = isDev
Vue.config.productionTip = isDev
Vue.config.performance = isDev

// 挂载 $X 命名空间
Vue.prototype.$X = {
  isDev,
  utils,
  config,
  Cookies
}
// i18n实例
const i18nInstance = i18n(Vue, 'zh-CN')

// 注册全局组件
Vue.use(components)
Vue.use(XHighlight)

new Vue({
  i18n: i18nInstance,
  store,
  render: h => h(App)
}).$mount('#app')
