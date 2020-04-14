/**
 * Created by OXOYO on 2019/11/9.
 *
 * 下箭头
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'
import utils from '../../utils'

export default {
  name: 'arrow-down',
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
        L1: height / 3,
        L7: width / 4
      })
      // 箭头顶点
      let P0 = {
        x: 0,
        y: height / 2
      }

      // 左下顶点
      let P1 = {
        x: -width / 2,
        y: P0.y - L1
      }
      // 左下中
      let P2 = {
        x: P0.x - L7,
        y: P1.y
      }
      // 左上
      let P3 = {
        x: P2.x,
        y: -height / 2
      }
      // 右上
      let P4 = {
        x: P0.x + L7,
        y: -height / 2
      }
      // 右下中
      let P5 = {
        x: P4.x,
        y: P2.y
      }
      // 右下顶点
      let P6 = {
        x: width / 2,
        y: P1.y
      }

      const path = [
        [ 'M', P0.x, P0.y ],
        [ 'L', P1.x, P1.y ],
        [ 'L', P2.x, P2.y ],
        [ 'L', P3.x, P3.y ],
        [ 'L', P4.x, P4.y ],
        [ 'L', P5.x, P5.y ],
        [ 'L', P6.x, P6.y ],
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
