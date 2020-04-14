/**
 * Created by OXOYO on 2019/12/27.
 *
 * 锋利的左箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'left-sharp-edged-head-arrow',
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
      // 箭头角度
      let deg = 116
      let { L1, L2, L7 } = utils.node.calculateArrow({
        deg: deg,
        L1: height / 4,
        L7: height / 6
      })
      // 计算夹角临边长度
      let L99 = (L2 - L7) / Math.tan(deg / 2 * Math.PI / 180)
      // 左箭头
      let A0 = {
        1: { x: -width / 2 + L1 + L7 - L99, y: L7 },
        2: { x: -width / 2 + L1 + L7, y: height / 2 },
        3: { x: -width / 2 + L1, y: height / 2 },
        // 顶点
        4: { x: -width / 2, y: 0 },
        5: { x: -width / 2 + L1, y: -height / 2 },
        6: { x: -width / 2 + L1 + L7, y: -height / 2 },
        7: { x: -width / 2 + L1 + L7 - L99, y: -L7 }
      }
      // 右上顶点
      let P1 = { x: width / 2, y: -L7 }
      // 右下顶点
      let P2 = { x: width / 2, y: L7 }

      const path = [
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        [ 'L', A0[6].x, A0[6].y ],
        [ 'L', A0[7].x, A0[7].y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
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
