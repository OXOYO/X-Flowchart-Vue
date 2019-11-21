/**
 * Created by OXOYO on 2019/9/3.
 *
 * 云
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'

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
        [ 'M', -width * 6 / 20, height * 2 / 20 ],
        // 弧1 左->右
        [ 'C', -width * 10 / 20, height * 1 / 20, -width * 7 / 20, -height * 3 / 20, -width * 4 / 20, -height * 3 / 20 ],
        // 弧2 左->右
        [ 'C', -width * 4 / 20, -height * 6 / 20, width * 2 / 20, -height * 6 / 20, width * 4 / 20, -height * 4 / 20 ],
        // 弧3 左->右
        [ 'C', width * 6 / 20, -height * 5 / 20, width * 9 / 20, -height * 4 / 20, width * 7 / 20, -height * 2 / 20 ],
        // 弧4 左->右
        [ 'C', width * 10 / 20, height * 1 / 20, width * 8 / 20, height * 2 / 20, width * 5 / 20, height * 3 / 20 ],
        // 弧5 左->右
        [ 'C', width * 3 / 20, height * 6 / 20, -width * 4 / 20, height * 5 / 20, -width * 3 / 20, height * 3 / 20 ],
        // 弧6 左->右
        [ 'C', -width * 3 / 20, height * 4 / 20, -width * 8 / 20, height * 5 / 20, -width * 6 / 20, height * 2 / 20 ]
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
