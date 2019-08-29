/**
 * Created by OXOYO on 2019/7/8.
 *
 * 正方形
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import utils from '../utils/index'
import base from './base'

export default {
  name: 'square',
  extendName: 'single-shape',
  options: {
    ...base,
    shapeType: 'rect',
    drawShape (cfg, group) {
      const shapeType = this.shapeType
      const style = this.getShapeStyle(cfg)
      const shape = group.addShape(shapeType, {
        attrs: style
      })
      return shape
    },
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const color = cfg.color || Global.defaultNode.color
      const style = Util.mix({}, Global.defaultNode.style, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x: 0 - width / 2,
        y: 0 - height / 2,
        width,
        height,
        stroke: color
      }, cfg.style)
      return style
    }
  }
}
