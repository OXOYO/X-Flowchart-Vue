/**
 * Created by OXOYO on 2019/7/8.
 *
 * 设置shapeControl激活
 */

import config from '../../config'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i]
      if (child._attrs && child.attr('name')) {
        switch (child.attr('name')) {
          case 'shapeControlPoint':
            if (value) {
              child.show()
              child.attr(config.shapeControl.style.active.point)
            } else {
              child.attr(config.shapeControl.style.inactive.point)
              child.hide()
            }
            break
          case 'shapeControlEdge':
            if (value) {
              child.show()
              child.attr(config.shapeControl.style.active.edge)
            } else {
              child.attr(config.shapeControl.style.inactive.edge)
              child.hide()
            }
            break
          case 'shapeControlRotate':
            if (value) {
              child.show()
              child.attr(config.shapeControl.style.active.rotate)
            } else {
              child.attr(config.shapeControl.style.inactive.rotate)
              child.hide()
            }
            break
          case 'anchorPoint':
            child.hide()
        }
      }
    }
  }
}
