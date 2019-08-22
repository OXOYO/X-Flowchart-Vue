/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册交互
 */

// 单独画线交互
// import drawLine from './drawLine'
// 单独拖拽交互
// import dragNodeToEditor from './dragNodeToEditor'
// 单独图形控制交互
// import shapeControl from './shapeControl'

// 综合节点控制交互
import nodeControl from './nodeControl'

const obj = {
  // drawLine,
  // dragNodeToEditor,
  // shapeControl,
  nodeControl
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerBehavior(item.name, item.options)
  })
}
