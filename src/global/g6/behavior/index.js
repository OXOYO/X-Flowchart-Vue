/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册自定义交互
 */

// 综合节点控制交互
import nodeControl from './nodeControl'
// 预览画布交互
import previewCanvas from './previewCanvas'

const obj = {
  nodeControl,
  previewCanvas
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerBehavior(item.name, item.options)
  })
}
