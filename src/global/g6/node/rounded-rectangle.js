/**
 * Created by OXOYO on 2019/9/3.
 *
 * 圆角矩形
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from './base'

export default {
  name: 'rounded-rectangle',
  extendName: 'single-shape',
  options: {
    ...base,
    // FIXME shapeType只能是`@angtv/g`所支持的几种图形：Circle/Ellipse/Fan/Image/Marker/Path/Polygon/Rect/Text
    shapeType: 'rect',
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
        // 圆角半径，分别对应左上、右上、右下、左下角的半径
        radius: [5, 5, 5, 5],
        stroke: color
      }, cfg.style)
      return style
    }
  }
}
