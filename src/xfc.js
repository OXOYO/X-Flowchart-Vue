/**
 * Created by OXOYO on 2020/6/24
 *
 * xfc入口
 */
import Vue from 'vue'
import Editor from './Editor/Index'
// import store from './store'
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

import vClickOutside from 'v-click-outside'

// Vue 全局配置
const isDev = process && process.env.NODE_ENV !== 'production'
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
// 注册指令
Vue.use(vClickOutside)

export default function (options) {
  const { el, props } = options
  if (el) {
    new Vue({
      i18n: i18nInstance,
      // store,
      render: h => h(Editor, {
        props
      })
    }).$mount(el)
  }
}
