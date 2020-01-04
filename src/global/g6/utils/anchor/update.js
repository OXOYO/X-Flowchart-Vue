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
        let point = shape.getPoint(i / len)
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
      // 文本
      let anchorText = group.findById(id + '_anchor_text_' + i)
      anchorBgShape && anchorBgShape.attr({
        x: anchorX,
        y: anchorY
      })
      anchorShape && anchorShape.attr({
        x: anchorX,
        y: anchorY
      })
      anchorText && anchorText.attr({
        x: anchorX,
        y: anchorY
      })
    }
  }
}
