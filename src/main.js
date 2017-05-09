/**
 * Created by OXOYO on 2017/5/9.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import createPersistedState from 'vuex-persistedstate'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import App from './App'
import XFlowchart from './index.js'
import store from './store/index.js'

// 注册插件
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(iView)
Vue.use(XFlowchart)

// 创建store实例
// const storeInstance = new Vuex.Store(store)
const storeInstance = new Vuex.Store({
  ...store,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})

// 启动应用
new Vue({
  store: storeInstance,
  render: h => h(App)
}).$mount('#app')
