/**
 * Created by OXOYO on 2020/6/24
 *
 * xfc入口
 */
import Vue from 'vue'
import Editor from './Editor/Index'
import i18n from './i18n'
import './registerServiceWorker'

import utils from './global/utils'
import components from './global/components'
import config from './config'
import './assets/styles/main.less'

import vClickOutside from 'v-click-outside'

export default function (options) {
  const { el, props } = options

  if (props) {
    // 合并配置
    ['system', 'storage', 'infoPanel'].forEach(key => {
      if (props.hasOwnProperty(key) && props[key] && props[key] instanceof Object) {
        config[key] = {
          ...config[key],
          ...props[key]
        }
      }
    })
    // 处理tools
    if (props.hasOwnProperty('tools') && props.tools && props.tools instanceof Object) {
      config.tools = props.tools
    } else {
      const disableTools = Array.isArray(props.disableTools) ? props.disableTools : []
      const enableTools = Array.isArray(props.enableTools) ? props.enableTools : []
      const shortcutMap = props.shortcutMap || {}
      config.tools = config.tools(config.system, disableTools, enableTools, shortcutMap)
    }
    // 处理materials
    if (Array.isArray(props.materials)) {
      config.materials = props.materials
    } else {
      const enableMaterials = props.enableMaterials || {}
      config.materials = config.materials(enableMaterials)
    }
  } else {
    config.tools = config.tools(config.system)
    config.materials = config.materials()
  }

  // 挂载 $X 命名空间
  Vue.prototype.$X = {
    utils,
    config
  }
  // i18n实例
  const i18nInstance = i18n(Vue, props && props.i18n ? props.i18n : null)

  // 注册全局组件
  Vue.use(components)
  // 注册指令
  Vue.use(vClickOutside)

  if (el) {
    return new Vue({
      el,
      i18n: i18nInstance,
      render: h => h(Editor, {
        props,
        ref: 'editor'
      }),
      computed: {
        editorRef () {
          return this.$refs.editor
        },
        editor () {
          return this.editorRef.editor
        }
      },
      methods: {
        // 接收数据，并进行渲染
        read (data, isActualSize) {
          this.editor.read(data)
          if (isActualSize) {
            // 缩放到实际大小
            this.editorRef.doZoom({
              name: 'actualSize'
            })
          }
        },
        // 获取图数据
        save () {
          return this.editor.save()
        },
        // 获取图中所有节点的实例
        getNodes () {
          return this.editor.getNodes()
        },
        // 获取图中所有边的实例
        getEdges () {
          return this.editor.getEdges()
        },
        // 将画布上的元素导出为图片
        downloadImage (name, type, backgroundColor) {
          return this.editor.downloadImage(name, type, backgroundColor)
        },
        // 将画布上元素生成为图片的 URL
        toDataURL (type, backgroundColor) {
          return this.editor.toDataURL(type, backgroundColor)
        }
      }
    })
  }
}
