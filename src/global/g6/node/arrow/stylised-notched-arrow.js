/**
 * Created by OXOYO on 2019/12/26.
 *
 * 程式化缺口箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'stylised-notched-arrow',
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
      // 计算左箭头
      let { L1: LL1 } = utils.node.calculateArrow({
        deg: 125,
        L1: width / 6,
        L7: height / 4
      })
      // 计算右箭头
      let { L1: LR1 } = utils.node.calculateArrow({
        deg: 75,
        L1: width * 0.4,
        L7: height / 4
      })
      // 左箭头
      let A0 = {
        1: { x: -width / 2, y: -height * 0.4 },
        // 顶点
        2: { x: -width / 2 + LL1, y: 0 },
        3: { x: -width / 2, y: height * 0.4 }
      }
      // 右箭头
      let A1 = {
        1: { x: width / 2 - LR1 + LL1, y: -height / 6 },
        2: { x: width / 2 - LR1, y: -height / 2 },
        3: { x: width / 2, y: 0 },
        4: { x: width / 2 - LR1, y: height / 2 },
        5: { x: width / 2 - LR1 + LL1, y: height / 6 }
      }
      const path = [
        [ 'M', A0[1].x, A0[1].y ],
        [ 'L', A1[1].x, A1[1].y ],
        [ 'L', A1[2].x, A1[2].y ],
        [ 'L', A1[3].x, A1[3].y ],
        [ 'L', A1[4].x, A1[4].y ],
        [ 'L', A1[5].x, A1[5].y ],
        [ 'L', A0[3].x, A0[3].y ],
        [ 'L', A0[2].x, A0[2].y ],
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
