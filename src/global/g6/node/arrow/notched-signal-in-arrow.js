/**
 * Created by OXOYO on 2019/12/26.
 *
 * 缺口信号箭头
 */

import * as G6Util from '@antv/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'notched-signal-in-arrow',
  extendName: 'single-node',
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
      const { L1, L7 } = utils.node.calculateArrow({
        deg: 100,
        L1: width / 6,
        L7: height / 2
      })
      // 箭头顶点
      const P0 = {
        x: width / 2,
        y: 0
      }

      // 右下顶点
      const P1 = {
        x: width / 2 - L1,
        y: L7
      }
      // 左下顶点
      const P2 = {
        x: -width / 2,
        y: L7
      }
      // 左中
      const P3 = {
        x: -width / 2 + L1,
        y: 0
      }
      // 左上顶点
      const P4 = {
        x: -width / 2,
        y: -L7
      }
      // 右上顶点
      const P5 = {
        x: width / 2 - L1,
        y: -L7
      }
      const path = [
        [ 'M', P0.x, P0.y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
        [ 'L', P5.x, P5.y ],
        [ 'Z' ]
      ]
      const color = cfg.color
      const style = G6Util.mix({}, {
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
