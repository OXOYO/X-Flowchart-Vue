/**
 * Created by OXOYO on 2019/7/8.
 *
 * 圆形
 */

import utils from '../utils/index'

export default {
  name: 'x-circle',
  extendName: 'circle',
  options: {
    setState (name, value, item) {
      // 设置锚点激活
      utils.setAnchorActive(name, value, item)
      // 设置shapeControl激活
      utils.setShapeControlActive(name, value, item)
    },
    // 绘制后附加锚点
    afterDraw (cfg, group) {
      // 绘制锚点
      utils.drawAnchor(cfg, group)
      // 绘制shapeControl
      utils.drawShapeControl(cfg, group)
    }
  }
}
