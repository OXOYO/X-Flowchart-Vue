/**
 * Created by OXOYO on 2019/9/3.
 *
 * 云
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from './base'

export default {
  name: 'cloud',
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
      const path = [
        // 左
        [ 'M', -width * 6 / 10, height * 2 / 10 ],
        // 弧1 左->右
        [ 'C', -width * 10 / 10, height * 1 / 10, -width * 7 / 10, -height * 3 / 10, -width * 4 / 10, -height * 3 / 10 ],
        // 弧2 左->右
        [ 'C', -width * 4 / 10, -height * 6 / 10, width * 2 / 10, -height * 6 / 10, width * 4 / 10, -height * 4 / 10 ],
        // 弧3 左->右
        [ 'C', width * 6 / 10, -height * 5 / 10, width * 9 / 10, -height * 4 / 10, width * 7 / 10, -height * 2 / 10 ],
        // 弧4 左->右
        [ 'C', width * 10 / 10, height * 1 / 10, width * 8 / 10, height * 2 / 10, width * 5 / 10, height * 3 / 10 ],
        // 弧5 左->右
        [ 'C', width * 3 / 10, height * 6 / 10, -width * 4 / 10, height * 5 / 10, -width * 3 / 10, height * 3 / 10 ],
        // 弧6 左->右
        [ 'C', -width * 3 / 10, height * 4 / 10, -width * 8 / 10, height * 5 / 10, -width * 6 / 10, height * 2 / 10 ]
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
