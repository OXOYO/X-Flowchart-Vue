/**
 * Created by OXOYO on 2019/7/16.
 *
 * 设置锚点激活
 */

import config from '../config/index'
import drawLineAnimate from './drawLineAnimate'
import destroyLineAnimate from './destroyLineAnimate'

export default function (name, value, item) {
  if (name === 'active') {
    let group = item.getContainer()
    let children = group.get('children')
    let line = children[0]
    // 处理线条状态
    if (line) {
      if (value) {
        line.attr(config.line.style.active)
        // 绘制线条动画
        drawLineAnimate(item.getModel(), item.getContainer())
      } else {
        line.attr(config.line.style.inactive)
        // 销毁线条动画
        destroyLineAnimate(item.getModel(), item.getContainer())
      }
    }
  }
}
