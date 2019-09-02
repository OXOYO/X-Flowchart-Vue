/**
 * Created by OXOYO on 2019/7/8.
 *
 * 绘制锚点
 */

import config from '../../config'

export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let [x, y] = anchorPoints[i]
      // 计算Marker中心点坐标
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      // 添加锚点背景
      let anchorBgShape = group.addShape('marker', {
        id: id + '_anchor_bg_' + i,
        attrs: {
          name: 'anchorBg',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...config.anchorBg.style.default
        }
      })
      // 添加锚点Marker形状
      let anchorShape = group.addShape('marker', {
        id: id + '_anchor_' + i,
        attrs: {
          name: 'anchor',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...config.anchor.style.default
        }
      })

      anchorShape.on('mouseenter', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.active
        })
      })
      anchorShape.on('mouseleave', function () {
        anchorBgShape.attr({
          ...config.anchorBg.style.inactive
        })
      })
    }
  }
}
