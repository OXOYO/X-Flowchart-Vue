/**
 * Created by OXOYO on 2019/11/9.
 *
 * 双向箭头
 */

import * as G6Util from '@antv/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'bidirectional-arrow',
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
      const { L4, L5, L6, L8 } = utils.node.calculateArrow({
        deg: 80,
        L1: 30
      })
      // 左顶点
      const P1 = {
        x: -width / 2,
        y: height / 2
      }
      // 左上
      const P2 = {
        x: P1.x + L4,
        y: P1.y - L5
      }
      // 左上中
      const P3 = {
        x: P1.x + L6 - L8,
        y: P1.y - L6 - L8
      }
      // 右顶点
      const P6 = {
        x: width / 2,
        y: -height / 2
      }
      // 右上中
      const P4 = {
        x: P6.x - L6 - L8,
        y: P6.y + L6 - L8
      }
      // 右上
      const P5 = {
        x: P6.x - L5,
        y: P6.y + L4
      }
      // 右下
      const P7 = {
        x: P6.x - L4,
        y: P6.y + L5
      }
      // 右下中
      const P8 = {
        x: P6.x - L6 + L8,
        y: P6.y + L6 + L8
      }
      // 左下中
      const P9 = {
        x: P1.x + L6 + L8,
        y: P1.y - L6 + L8
      }
      // 左下
      const P10 = {
        x: P1.x + L5,
        y: P1.y - L4
      }

      const path = [
        // 左顶点
        [ 'M', P1.x, P1.y ],
        // 左上
        [ 'L', P2.x, P2.y ],
        // 左上中
        [ 'L', P3.x, P3.y ],
        // 右上中
        [ 'L', P4.x, P4.y ],
        // 右上
        [ 'L', P5.x, P5.y ],
        // 右顶点
        [ 'L', P6.x, P6.y ],
        // 右下
        [ 'L', P7.x, P7.y ],
        // 右下中
        [ 'L', P8.x, P8.y ],
        // 左下中
        [ 'L', P9.x, P9.y ],
        // 左下
        [ 'L', P10.x, P10.y ],
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
