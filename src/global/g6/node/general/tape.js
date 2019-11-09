/**
 * Created by OXOYO on 2019/9/3.
 *
 * 条带
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'

export default {
  name: 'tape',
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
        // 左上
        [ 'M', -width / 2, -height / 4 ],
        // 上弧
        [ 'C', -width / 4, height * 1 / 8, width / 4, -height * 5 / 8, width / 2, -height / 4 ],
        // 右下
        [ 'L', width / 2, height / 4 ],
        // 弧
        [ 'C', width / 4, -height / 8, -width / 4, height * 5 / 8, -width / 2, height / 4 ],
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
