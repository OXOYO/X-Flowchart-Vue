/**
 * Created by OXOYO on 2019/12/27.
 *
 * U向下箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'u-turn-down-arrow',
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
        L7: width / 10
      })
      // 下箭头
      let A0 = {
        1: { x: -width / 2 + L2 + L7, y: -L1 * 0.2 },
        2: { x: -width / 2 + 2 * L2, y: -L1 * 0.2 },
        // 顶点
        3: { x: -width / 2 + L2, y: height / 2 },
        4: { x: -width / 2, y: -L1 * 0.2 },
        5: { x: -width / 2 + L2 - L7, y: -L1 * 0.2 }
      }
      // 右下右中
      let P1 = { x: width / 2, y: -L1 * 0.2 }
      // 右下右
      let P2 = { x: width / 2, y: height / 2 }
      // 右下左
      let P3 = { x: width / 2 - 2 * L7, y: height / 2 }
      // 右下左中
      let P4 = { x: width / 2 - 2 * L7, y: -L1 * 0.2 }
      const path = [
        [ 'M', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
        // FIXME 圆弧的中心点不在坐标原点上
        // [ 'A', (width - L2 - 2 * L7) / 2, height / 2 - L1 * 0.2 - L7 * 0.5, 0, 0, 0, width / 2 - (width - L2 - 2 * L7) / 2, -height / 2 + L7 * 0.5 ],
        [ 'A', width / 2 * 0.6, height / 2 - L1 * 0.2 - L7 * 0.5, 0, 0, 0, width / 2 - width / 2 * 0.6 - 2 * L7, -height / 2 + L7 * 0.5 ],
        [ 'A', (width - L2 - L7) / 2, height / 2 - L1 * 0.2, 0, 0, 1, P1.x, P1.y ],
        [ 'A', (width - L2 - L7) / 2, height / 2 - L1 * 0.2, 0, 1, 0, A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        // FIXME 圆弧的中心点不在坐标原点上
        [ 'A', (width - L2 - L7) / 2, height / 2 - L1 * 0.2, 0, 0, 1, -width / 2 + 1.8 * L2 + L7, -height / 2 ],
        [ 'L', (L2 + L7) / 2, -height / 2 ],
        [ 'A', (width - L2 - L7) / 2, height / 2 - L1 * 0.2, 0, 0, 1, P1.x, P1.y ]
        // ,
        // [ 'Z' ]
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
