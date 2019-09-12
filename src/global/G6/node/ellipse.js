/**
 * Created by OXOYO on 2019/7/8.
 *
 * 椭圆
 */
import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from './base'

export default {
  name: 'ellipse',
  extendName: 'ellipse',
  options: {
    ...base,
    shapeType: 'ellipse',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const rx = size[0] / 2
      const ry = size[1] / 2
      const color = cfg.color || Global.defaultNode.color
      const style = Util.mix({}, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x: 0,
        y: 0,
        // size 一般可以提供宽高信息
        rx,
        ry,
        stroke: color
      }, Global.defaultNode.style, cfg.style)
      return style
    }
  }
}
