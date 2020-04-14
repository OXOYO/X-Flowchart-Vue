/**
 * Created by OXOYO on 2019/12/27.
 *
 * 标注双箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'callout-quad-arrow',
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
        L1: height * 0.16,
        L7: width * 0.08
      })
      // FIXME 顺时针接续计算
      // 上箭头
      let A0 = {
        1: { x: -L7, y: -height / 2 + L1 + L7 },
        2: { x: -L7, y: -height / 2 + L1 },
        3: { x: -L2, y: -height / 2 + L1 },
        // 箭头顶点
        4: { x: 0, y: -height / 2 },
        5: { x: L2, y: -height / 2 + L1 },
        6: { x: L7, y: -height / 2 + L1 },
        7: { x: L7, y: -height / 2 + L1 + L7 }
      }
      // 右箭头
      let A1 = {
        1: { x: width / 2 - L1 - L7, y: -L7 },
        2: { x: width / 2 - L1, y: -L7 },
        3: { x: width / 2 - L1, y: -L2 },
        // 箭头顶点
        4: { x: width / 2, y: 0 },
        5: { x: width / 2 - L1, y: L2 },
        6: { x: width / 2 - L1, y: L7 },
        7: { x: width / 2 - L1 - L7, y: L7 }
      }
      // 下箭头
      let A2 = {
        1: { x: L7, y: height / 2 - L1 - L7 },
        2: { x: L7, y: height / 2 - L1 },
        3: { x: L2, y: height / 2 - L1 },
        // 箭头顶点
        4: { x: 0, y: height / 2 },
        5: { x: -L2, y: height / 2 - L1 },
        6: { x: -L7, y: height / 2 - L1 },
        7: { x: -L7, y: height / 2 - L1 - L7 }
      }
      // 左箭头
      let A3 = {
        1: { x: -width / 2 + L1 + L7, y: L7 },
        2: { x: -width / 2 + L1, y: L7 },
        3: { x: -width / 2 + L1, y: L2 },
        // 箭头顶点
        4: { x: -width / 2, y: 0 },
        5: { x: -width / 2 + L1, y: -L2 },
        6: { x: -width / 2 + L1, y: -L7 },
        7: { x: -width / 2 + L1 + L7, y: -L7 }
      }
      const path = [
        // 上箭头
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        [ 'L', A0[6].x, A0[6].y ],
        [ 'L', A0[7].x, A0[7].y ],
        [ 'L', A1[1].x, A0[7].y ],
        // 右箭头
        [ 'L', A1[1].x, A1[1].y ],
        [ 'L', A1[2].x, A1[2].y ],
        [ 'L', A1[3].x, A1[3].y ],
        [ 'L', A1[4].x, A1[4].y ],
        [ 'L', A1[5].x, A1[5].y ],
        [ 'L', A1[6].x, A1[6].y ],
        [ 'L', A1[7].x, A1[7].y ],
        [ 'L', A1[7].x, A2[1].y ],
        // 下箭头
        [ 'L', A2[1].x, A2[1].y ],
        [ 'L', A2[2].x, A2[2].y ],
        [ 'L', A2[3].x, A2[3].y ],
        [ 'L', A2[4].x, A2[4].y ],
        [ 'L', A2[5].x, A2[5].y ],
        [ 'L', A2[6].x, A2[6].y ],
        [ 'L', A2[7].x, A2[7].y ],
        [ 'L', A3[1].x, A2[7].y ],
        // 左箭头
        [ 'L', A3[1].x, A3[1].y ],
        [ 'L', A3[2].x, A3[2].y ],
        [ 'L', A3[3].x, A3[3].y ],
        [ 'L', A3[4].x, A3[4].y ],
        [ 'L', A3[5].x, A3[5].y ],
        [ 'L', A3[6].x, A3[6].y ],
        [ 'L', A3[7].x, A3[7].y ],
        [ 'L', A3[7].x, A0[1].y ],
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
