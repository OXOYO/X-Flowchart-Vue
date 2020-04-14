/**
 * Created by OXOYO on 2019/12/27.
 *
 * 左上箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'left-and-up-arrow',
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
        L1: width / 4,
        L7: width * 0.15
      })
      // 上箭头
      let A0 = {
        1: { x: width / 2 - L2 - L7, y: -height / 2 + L1 },
        2: { x: width / 2 - 2 * L2, y: -height / 2 + L1 },
        // 顶点
        3: { x: width / 2 - L2, y: -height / 2 },
        4: { x: width / 2, y: -height / 2 + L1 },
        5: { x: width / 2 - L2 + L7, y: -height / 2 + L1 }
      }
      // 左箭头
      let A1 = {
        1: { x: -width / 2 + L1, y: height / 2 - L2 + L7 },
        2: { x: -width / 2 + L1, y: height / 2 },
        // 顶点
        3: { x: -width / 2, y: height / 2 - L2 },
        4: { x: -width / 2 + L1, y: height / 2 - 2 * L2 },
        5: { x: -width / 2 + L1, y: height / 2 - L2 - L7 }
      }

      // 右下顶点
      let P1 = { x: A0[5].x, y: A1[1].y }
      // 左中拐点
      let P2 = { x: A0[1].x, y: A1[5].y }
      const path = [
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', A1[1].x, A1[1].y ],
        [ 'L', A1[2].x, A1[2].y ],
        [ 'L', A1[3].x, A1[3].y ],
        [ 'L', A1[4].x, A1[4].y ],
        [ 'L', A1[5].x, A1[5].y ],
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
