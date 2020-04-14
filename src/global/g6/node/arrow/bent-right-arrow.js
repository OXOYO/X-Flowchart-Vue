/**
 * Created by OXOYO on 2019/12/26.
 *
 * 右弯箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'bent-right-arrow',
  extendName: 'single-shape',
  options: {
    ...base,
    shapeType: 'path',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      // 计算箭头
      let { L1, L2, L7 } = utils.node.calculateArrow({
        deg: 85,
        L1: width / 3,
        L7: height / 8
      })
      // 箭头顶点
      let P0 = {
        x: width / 2,
        y: -height / 2 + L2
      }

      // 右下顶点
      let P1 = {
        x: P0.x - L1,
        y: P0.y + L2
      }
      // 右下中
      let P2 = {
        x: P1.x,
        y: P0.y + L7
      }
      // 左下中拐点
      let P3 = {
        x: -width / 2 + 2 * L7,
        y: P0.y + L7
      }
      // 左下右顶点
      let P4 = {
        x: P3.x,
        y: height / 2
      }
      // 左下左顶点
      let P5 = {
        x: -width / 2,
        y: height / 2
      }
      // 左上弧起点
      let P6 = {
        x: -width / 2,
        y: P0.y + L7
      }
      // 左上弧终点
      let P7 = {
        x: -width / 2 + 2 * L7,
        y: P0.y - L7
      }
      // 左上中
      let P8 = {
        x: P1.x,
        y: P0.y - L7
      }
      // 左上顶点
      let P9 = {
        x: P1.x,
        y: P0.y - L2
      }

      const path = [
        [ 'M', P0.x, P0.y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
        [ 'L', P5.x, P5.y ],
        [ 'L', P6.x, P6.y ],
        [ 'A', 2 * L7, 2 * L7, 45, 0, 1, P7.x, P7.y ],
        [ 'L', P8.x, P8.y ],
        [ 'L', P9.x, P9.y ],
        [ 'Z' ]
      ]
      const color = cfg.color || Global.defaultNode.color
      const style = Util.mix({}, Global.defaultNode.style, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x,
        y,
        width,
        height,
        path,
        stroke: color
      }, cfg.style)
      return style
    }
  }
}
