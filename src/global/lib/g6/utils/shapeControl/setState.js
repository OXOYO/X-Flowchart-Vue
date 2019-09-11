/**
 * Created by OXOYO on 2019/7/8.
 *
 * 设置shapeControl激活
 */

import config from '../../config'
import draw from './draw'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let cfg = item.getModel()
    if (value) {
      // 绘制shapeControl
      draw(cfg, group)
      // 遍历子节点，处理状态
      let children = group.get('children')
      for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i]
        if (child._attrs && child.attr('name')) {
          // 处理状态
          if (child.attr('name') === 'shapeControlPoint') {
            if (value) {
              child.attr(config.shapeControl.style.active.point)
            } else {
              child.attr(config.shapeControl.style.inactive.point)
            }
          }
          if (child.attr('name') === 'shapeControlEdge') {
            if (value) {
              child.attr(config.shapeControl.style.active.edge)
            } else {
              child.attr(config.shapeControl.style.inactive.edge)
            }
          }
          if (child.attr('name') === 'shapeControlRotate') {
            if (value) {
              child.attr(config.shapeControl.style.active.rotate)
            } else {
              child.attr(config.shapeControl.style.inactive.rotate)
            }
          }
        }
      }
    } else {
      // 销毁shapeControl
      let children = group.get('children')
      for (let i = 0, len = children.length; i < len; i++) {
        let child = children[i]
        if (child && child._attrs && child.attr('boxName') === 'shapeControl') {
          console.log('xxxxxxxxx', child, child.graph)
          // TODO 删除节点
          // graph.removeItem(child)
        }
      }
    }
  }
}
