/**
 * Created by OXOYO on 2019/7/16.
 *
 * 更新图形控制
 */

export default function (cfg, group) {
  let { shapeControl, width, height, id } = cfg
  if (shapeControl && shapeControl.hasOwnProperty('controllers') && shapeControl.controllers.length) {
    for (let i = 0, len = shapeControl.controllers.length; i < len; i++) {
      let [x, y] = shapeControl.controllers[i]
      // 计算Marker中心点坐标
      let originX = -width / 2
      let originY = -height / 2
      let anchorX = x * width + originX
      let anchorY = y * height + originY
      let marker = group.findById(id + '_shape_control_point' + i)
      marker.attr({
        x: anchorX,
        y: anchorY
      })
    }
  }
}
