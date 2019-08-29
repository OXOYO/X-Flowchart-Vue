/**
 * Created by OXOYO on 2019/7/8.
 *
 * 圆形
 */
import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from './base'

export default {
  name: 'circle',
  extendName: 'circle',
  options: {
    ...base,
    shapeType: 'circle',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const color = cfg.color || Global.defaultNode.color
      const style = Util.mix({}, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x: 0,
        y: 0,
        // size 一般可以提供宽高信息
        r: size[0] / 2,
        stroke: color
      }, Global.defaultNode.style, cfg.style)
      return style
    }
  }
}
