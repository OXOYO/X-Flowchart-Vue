/**
 * Created by OXOYO on 2019/12/26.
 *
 * 双向垂直箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'two-way-arrow-vertical',
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
      let { L1, L7 } = utils.node.calculateArrow({
        deg: 85,
        L1: height * 0.35,
        L7: width / 4
      })
      // 上箭头
      let A0 = {
        1: { x: -L7, y: -height / 2 + L1 },
        2: { x: -width / 2, y: -height / 2 + L1 },
        // 顶点
        3: { x: 0, y: -height / 2 },
        4: { x: width / 2, y: -height / 2 + L1 },
        5: { x: L7, y: -height / 2 + L1 }
      }

      // 下箭头
      let A1 = {
        1: { x: L7, y: height / 2 - L1 },
        2: { x: width / 2, y: height / 2 - L1 },
        // 顶点
        3: { x: 0, y: height / 2 },
        4: { x: -width / 2, y: height / 2 - L1 },
        5: { x: -L7, y: height / 2 - L1 }
      }

      const path = [
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A0[2].x, A0[2].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[4].x, A0[4].y ],
        [ 'L', A0[5].x, A0[5].y ],
        [ 'L', A1[1].x, A1[1].y ],
        [ 'L', A1[2].x, A1[2].y ],
        [ 'L', A1[3].x, A1[3].y ],
        [ 'L', A1[4].x, A1[4].y ],
        [ 'L', A1[5].x, A1[5].y ],
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
