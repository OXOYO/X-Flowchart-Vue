/**
 * Created by OXOYO on 2019/7/16.
 *
 * 更新锚点
 */

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
