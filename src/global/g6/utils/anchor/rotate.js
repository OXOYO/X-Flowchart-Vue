/**
 * Created by OXOYO on 2019/9/10.
 *
 * 锚点旋转
 */

export default function (cfg, group, radian) {
  const { anchorPoints, id } = cfg
  // 处理锚点
  if (anchorPoints && anchorPoints.length) {
    for (let i = 0, len = anchorPoints.length; i < len; i++) {
      // 锚点背景
      const anchorBgShape = group.findById(id + '_anchor_bg_' + i)
      // 锚点
      const anchorShape = group.findById(id + '_anchor_' + i)
      if (anchorBgShape) {
        anchorBgShape.resetMatrix()
        anchorBgShape.rotate(radian)
      }
      if (anchorShape) {
        anchorShape.resetMatrix()
        anchorShape.rotate(radian)
      }
    }
  }
}
