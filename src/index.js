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

const XFC = {}
const prefix = 'XUI'

XFC.installed = false
XFC.install = function (Vue) {
  if (XFC.installed) {
    return
  }

  // 注册UI组件
  Vue.component(prefix + 'Button', Button)
  Vue.component(prefix + 'Icon', Icon)
  Vue.component(prefix + 'Form', Form)
  Vue.component(prefix + 'FormItem', FormItem)
  Vue.component(prefix + 'Modal', Modal)
  Vue.component(prefix + 'Input', Input)
  Vue.component(prefix + 'InputNumber', InputNumber)
  Vue.component(prefix + 'RadioGroup', RadioGroup)
  Vue.component(prefix + 'Radio', Radio)
  Vue.component(prefix + 'Switch', Switch)
  Vue.component(prefix + 'Collapse', Collapse)
  Vue.component(prefix + 'Panel', Panel)
  Vue.component(prefix + 'Spin', Spin)
  Vue.component(prefix + 'Tooltip', Tooltip)
  // 注册XFlowchart
  Vue.component('XFlowchart', XFlowchart)
  Vue.component('XFCIcon', XFCIcon)
  XFC.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XFC)
}

export default XFC
