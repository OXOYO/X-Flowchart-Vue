/**
 * Created by OXOYO on 2019/7/8.
 *
 * 设置锚点状态
 */

import config from '../../config'

export default function (name, value, item) {
  if (name === 'hover') {
    let group = item.getContainer()
    let children = group.get('children')
    for (let i = 0, len = children.length; i < len; i++) {
      let child = children[i]
      // 处理锚点状态
      if (child._attrs && child.attr('name') === 'anchorPoint') {
        if (value) {
          child.attr(config.anchor.style.hover)
        } else {
          child.attr(config.anchor.style.unhover)
        }
      }
    }
  }
}
