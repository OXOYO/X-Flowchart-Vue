/**
 * Created by OXOYO on 2018/3/30.
 */

import {
  Button,
  Icon,
  Form,
  FormItem,
  Modal,
  Input,
  InputNumber,
  RadioGroup,
  Radio,
  Switch,
  Collapse,
  Panel,
  Spin,
  Tooltip
} from 'iview'
import 'iview/dist/styles/iview.css'

import XFlowchart from './components/Index.vue'
import XFCIcon from './ui/Icon.vue'
import './styles/main.less'
// 导入物料
import materials from './materials/index.js'
const XFC = {}
const uiPrefix = 'XUI'
const materialPrefix = 'XM'

XFC.installed = false
XFC.install = function (Vue) {
  if (XFC.installed) {
    return
  }

  // 注册UI组件
  Vue.component(uiPrefix + 'Button', Button)
  Vue.component(uiPrefix + 'Icon', Icon)
  Vue.component(uiPrefix + 'Form', Form)
  Vue.component(uiPrefix + 'FormItem', FormItem)
  Vue.component(uiPrefix + 'Modal', Modal)
  Vue.component(uiPrefix + 'Input', Input)
  Vue.component(uiPrefix + 'InputNumber', InputNumber)
  Vue.component(uiPrefix + 'RadioGroup', RadioGroup)
  Vue.component(uiPrefix + 'Radio', Radio)
  Vue.component(uiPrefix + 'Switch', Switch)
  Vue.component(uiPrefix + 'Collapse', Collapse)
  Vue.component(uiPrefix + 'Panel', Panel)
  Vue.component(uiPrefix + 'Spin', Spin)
  Vue.component(uiPrefix + 'Tooltip', Tooltip)
  // 注册物料
  Object.keys(materials).map(key => {
    Vue.component(materialPrefix + key, materials[key])
  })
  // 注册XFlowchart
  Vue.component('XFlowchart', XFlowchart)
  Vue.component('XFCIcon', XFCIcon)
  XFC.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XFC)
}

export default XFC
