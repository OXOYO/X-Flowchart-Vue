/**
 * Created by OXOYO on 2019/7/16.
 *
 * 设置边状态
 */

import config from '../../config'
// import drawAnimate from './drawAnimate'
// import destroyAnimate from './destroyAnimate'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    let edge = children[0]
    // 处理线条状态
    if (edge) {
      if (value) {
        edge.attr(config.edge.style.active)
        // 绘制边动画
        // drawAnimate(item.getModel(), item.getContainer())
      } else {
        edge.attr(config.edge.style.inactive)
        // 销毁边动画
        // destroyAnimate(item.getModel(), item.getContainer())
      }
    }
  }
}
