/**
 * Created by OXOYO on 2019/12/27.
 *
 * 标注上箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'callout-up-arrow',
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
        L1: height * 0.2,
        L7: width * 0.17
      })
      // 上箭头
      let A0 = {
        1: { x: -L7, y: -height / 2 + L1 + 2 * L7 },
        2: { x: -L7, y: -height / 2 + L1 + L7 },
        3: { x: -L2, y: -height / 2 + L1 + L7 },
        4: { x: 0, y: -height / 2 },
        5: { x: L2, y: -height / 2 + L1 + L7 },
        6: { x: L7, y: -height / 2 + L1 + L7 },
        7: { x: L7, y: -height / 2 + L1 + 2 * L7 }
      }
      // 右上顶点
      let P1 = { x: width / 2, y: A0[1].y }
      // 右下顶点
      let P2 = { x: width / 2, y: height / 2 }
      // 左下顶点
      let P3 = { x: -width / 2, y: height / 2 }
      // 左上顶点
      let P4 = { x: -width / 2, y: A0[1].y }

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
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
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
