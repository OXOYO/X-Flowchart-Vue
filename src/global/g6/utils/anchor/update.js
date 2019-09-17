/**
 * Created by OXOYO on 2019/7/16.
 *
 * 更新锚点
 */

export default function (cfg, group) {
  let { anchorPoints, width, height, id } = cfg
  let shape = group.getFirst()
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      let anchorX
      let anchorY
      if (shape && shape.get('type') === 'path') {
        let point = shape.getPoint((i + 1) / len)
        anchorX = point.x
        anchorY = point.y
      } else {
        let [x, y] = anchorPoints[i]
        // 计算Marker中心点坐标
        let originX = -width / 2
        let originY = -height / 2
        anchorX = x * width + originX
        anchorY = y * height + originY
      }
      // 锚点背景
      let anchorBgShape = group.findById(id + '_anchor_bg_' + i)
      // 锚点
      let anchorShape = group.findById(id + '_anchor_' + i)
      anchorBgShape.attr({
        x: anchorX,
        y: anchorY
      })
      anchorShape.attr({
        x: anchorX,
        y: anchorY
      })
    }
  }
}
