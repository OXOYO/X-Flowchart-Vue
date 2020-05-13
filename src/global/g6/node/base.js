/**
 * Created by OXOYO on 2019/8/29.
 *
 * 节点基础方法
 */
import * as G6Util from '@antv/util'
import utils from '../utils'

export default {
  type: null,
  // 自定义节点配置，需要配置时在各个图形中覆写
  options: {},
  drawShape (cfg, group) {
    const shapeType = this.shapeType
    const style = this.getShapeStyle(cfg)
    const keyShape = group.addShape(shapeType, {
      attrs: style,
      name: 'XFCNodeKeyShape',
      draggable: true
    })
    this.keyShape = keyShape
    return keyShape
  },
  getAnchorPoints (cfg) {
    const { anchorPoints, width, height } = cfg
    const keyShape = this.keyShape
    let points = []
    if (anchorPoints && anchorPoints.length) {
      for (let i = 0, len = anchorPoints.length; i < len; i++) {
        let point = keyShape.getPoint((i + 1) / len)
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
  update (cfg, item) {
    // 自定义节点配置
    const defaultStyle = this.options
    // 从新计算图形样式
    const shapeStyle = this.getShapeStyle(cfg)
    const style = G6Util.mix({}, defaultStyle, shapeStyle)
    // 更新图形
    this.updateShape(cfg, item, style)
  },
  updateShape (cfg, item, style) {
    const keyShape = item.get('keyShape')
    keyShape.attr({
      ...style
    })
    // 更新图形文本
    this.updateLabel(cfg, item)
  },
  // 绘制完成后附加锚点
  afterDraw (cfg, group) {
    // 绘制锚点
    utils.anchor.draw(cfg, group)
    // 绘制shapeControl
    utils.shapeControl.draw(cfg, group)
  },
  // 更新完成后更新锚点
  afterUpdate (cfg, item) {
    const group = item.getContainer()
    // 更新锚点
    utils.anchor.update(cfg, group)
    // 更新shapeControl
    utils.shapeControl.update(cfg, group)
  }
}
