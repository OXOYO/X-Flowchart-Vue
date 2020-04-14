/**
 * Created by OXOYO on 2019/12/27.
 *
 * 向左跳箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'jump-in-left-arrow',
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
        L1: height * 0.4,
        L7: width * 0.08
      })
      // 下箭头
      let A0 = {
        1: { x: -width / 2 + L2 + L7, y: height / 2 - L1 },
        2: { x: -width / 2 + 2 * L2, y: height / 2 - L1 },
        // 顶点
        3: { x: -width / 2 + L2, y: height / 2 },
        4: { x: -width / 2, y: height / 2 - L1 },
        5: { x: -width / 2 + L2 - L7, y: height / 2 - L1 }
      }
      // 右上顶点
      let P1 = { x: width / 2, y: -height / 2 }

      const path = [
        [ 'M', P1.x, P1.y ],
        // FIXME 圆弧的中心点不在坐标原点上
        [ 'A', width - (L2 - L7) - 2 * L7, height - L1, 0, 0, 0, A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        // FIXME 圆弧的中心点不在坐标原点上
        [ 'A', width - (L2 - L7), height - L1, 0, 0, 1, P1.x, P1.y ],
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
