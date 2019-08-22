/**
 * Created by OXOYO on 2019/7/8.
 *
 * 设置shapeControl激活
 */

import config from '../config/index'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i]
      // 处理状态
      if (child._attrs.name === 'shapeControlPoint') {
        if (value) {
          child.attr(config.shapeControl.style.active.point)
        } else {
          child.attr(config.shapeControl.style.inactive.point)
        }
      }
      if (child._attrs.name === 'shapeControlEdge') {
        if (value) {
          child.attr(config.shapeControl.style.active.edge)
        } else {
          child.attr(config.shapeControl.style.inactive.edge)
        }
      }
    }
  }
}
