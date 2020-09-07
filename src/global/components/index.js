/**
 * Created by OXOYO on 2019/5/29.
 *
 * 全局组件
 */

// import {
//   InputNumber,
//   Dropdown,
//   DropdownMenu,
//   DropdownItem,
//   Message,
//   Modal,
//   Input,
//   Form,
//   FormItem,
//   Select,
//   Option,
//   Button
// } from 'iview'

import { Sketch } from 'vue-color'

import InputNumber from './InputNumber/Index'
import Message from './Message/Index'
import Modal from './Modal/Index'
import Input from './Input/Index'
import Form from './Form/Index'
import FormItem from './FormItem/Index'
import Select from './Select/Index'
import Option from './Option/Index'

import XDropdown from './Dropdown/Index'
import XDropdownMenu from './DropdownMenu/Index'
import XDropdownItem from './DropdownItem/Index'
import XButton from './Button/Index'
import XIcon from './Icon/Index'
import XTooltip from './Tooltip/Index'
import XDivider from './Divider/Index'
import XColorPicker from './ColorPicker/Index'
import XNoData from './NoData/Index'

const obj = {
  // ui组件
  InputNumber,
  Message,
  Modal,
  Input,
  Form,
  FormItem,
  Select,
  Option,
  // 颜色选择器
  SketchPicker: Sketch,
  // 自定义组件
  XDropdown,
  XDropdownMenu,
  XDropdownItem,
  XButton,
  XIcon,
  XTooltip,
  XDivider,
  XColorPicker,
  XNoData
}

const components = {}
components.install = function (Vue, options) {
  for (const name in obj) {
    if (name && obj[name]) {
      Vue.component(name, obj[name])
      if (['Message', 'Modal'].includes(name)) {
        Vue.prototype[`$${name}`] = obj[name]
      }
    }
  }
}

export default components
