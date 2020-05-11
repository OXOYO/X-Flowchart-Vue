/**
 * Created by OXOYO on 2019/8/29.
 *
 * 节点基础方法
 */
import utils from '../utils'

export default {
  type: null,
  drawShape (cfg, group) {
    const shapeType = this.shapeType
    const style = this.getShapeStyle(cfg)
    const shape = group.addShape(shapeType, {
      attrs: style
    })
    this.shape = shape
    return shape
  },
  getAnchorPoints (cfg) {
    const { anchorPoints, width, height } = cfg
    const shape = this.shape
    let points = []
    if (anchorPoints && anchorPoints.length) {
      for (let i = 0, len = anchorPoints.length; i < len; i++) {
        let point = shape.getPoint((i + 1) / len)
        // 方式一：通过坐标反推占比
        let x = point.x
        let y = point.y
        // 坐标系转换
        let x1 = width / 2 + x
        let y1 = height / 2 + y
        // 百分比
        let px = x1 / width
        let py = y1 / height
        points.push([ px, py ])
        // 方式二：覆盖坐标，有BUG
        // points.push([...anchorPoints[i], {
        //   x: bbox.minX + point.x,
        //   y: bbox.minY + point.y
        // }])
      }
    }
    // console.log('points', points)
    return points
  },
  setState (name, value, item) {
    // 设置锚点状态
    utils.anchor.setState(name, value, item)
    // 设置shapeControl状态
    utils.shapeControl.setState(name, value, item)
  },
  // update (cfg, item) {
  //   console.log('update cfg', cfg)
  //   this.updateShapeStyle(cfg, item)
  //   this.updateLabel(cfg, item)
  // },
  // 绘制后附加锚点
  afterDraw (cfg, group) {
    // 绘制锚点
    utils.anchor.draw(cfg, group)
    // 绘制shapeControl
    utils.shapeControl.draw(cfg, group)
  }
}
