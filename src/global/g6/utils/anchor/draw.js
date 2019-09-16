/**
 * Created by OXOYO on 2019/7/8.
 *
 * 绘制锚点
 */

import config from '../../config'

export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  let shape = group.getFirst()
  // let shape = group.get('children')[0]
  console.log('getAnchorPoints', id, shape)
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let [x, y] = anchorPoints[i]
      // 计算Marker中心点坐标
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      let flag = shape.isPointInPath(anchorX, anchorY)
      console.log('shape.isPointInPath(anchorX, anchorY)', i, anchorX, anchorY, flag)
      // 添加锚点背景
      let anchorBgShape = group.addShape('marker', {
        id: id + '_anchor_bg_' + i,
        attrs: {
          boxName: 'anchor',
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
          boxName: 'anchor',
          name: 'anchorPoint',
          x: anchorX,
          y: anchorY,
          // 锚点默认样式
          ...config.anchor.style.default,
          fill: flag ? 'red': config.anchor.style.default.fill
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
