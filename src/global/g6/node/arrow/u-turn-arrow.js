/**
 * Created by OXOYO on 2019/12/27.
 *
 * U箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'u-turn-arrow',
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
        L1: height / 4,
        L7: width / 8
      })
      // 下箭头
      let A0 = {
        1: { x: width / 2 - L2 + L7, y: -L1 * 0.2 },
        2: { x: width / 2, y: -L1 * 0.2 },
        // 顶点
        3: { x: width / 2 - L2, y: L1 * 0.8 },
        4: { x: width / 2 - 2 * L2, y: -L1 * 0.2 },
        5: { x: width / 2 - L2 - L7, y: -L1 * 0.2 }
      }
      // 左下左
      let P1 = { x: -width / 2, y: height / 2 }
      // 左下左中
      let P2 = { x: -width / 2, y: -L1 * 0.2 }
      // 左下右中
      let P3 = { x: -width / 2 + 2 * L7, y: -L1 * 0.2 }
      // 左下右
      let P4 = { x: -width / 2 + 2 * L7, y: height / 2 }
      const path = [
        [ 'M', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        // FIXME 圆弧的中心点不在坐标原点上
        [ 'A', (width - (L2 - L7)) / 2, height / 2 - L1 * 0.2, 0, 1, 1, A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        // FIXME 圆弧的中心点不在坐标原点上
        [ 'A', (width - (L2 - L7)) / 2 - 2 * L7, height / 2 - L1 * 0.2 - 2 * L7, 0, 1, 0, P3.x, P3.y ],
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
