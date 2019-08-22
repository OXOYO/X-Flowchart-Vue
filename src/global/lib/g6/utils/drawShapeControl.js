/**
 * Created by OXOYO on 2019/7/11.
 *
 * 绘制图形控制
 */

import config from '../config/index'

export default function (cfg, group) {
  let { shapeControl, width, height, id } = cfg
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let [x, y, cursor] = shapeControl.controllers[i]
      // 计算Marker中心点坐标
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      // 添加Marker形状
      group.addShape('marker', {
        id: id + '_shape_control_point' + i,
        index: i,
        name: 'shapeControlPoint',
        attrs: {
          name: 'shapeControlPoint',
          x: anchorX,
          y: anchorY,
          // 原始位置数据
          position: {
            x,
            y
          },
          cursor: cursor || 'pointer',
          // 锚点默认样式
          ...config.shapeControl.style.default.point
        }
      })
    }
  }
}
