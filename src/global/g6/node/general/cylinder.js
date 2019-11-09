/**
 * Created by OXOYO on 2019/9/3.
 *
 * 圆筒
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'

export default {
  name: 'cylinder',
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
        // 上弧 左->右
        [ 'C', -width / 2, -height * 5 / 12, width / 2, -height * 5 / 12, width / 2, -height / 4 ],
        // 右下
        [ 'L', width / 2, height / 4 ],
        // 下弧 右->左
        [ 'C', width / 2, height * 5 / 12, -width / 2, height * 5 / 12, -width / 2, height / 4 ],
        // 左上
        [ 'L', -width / 2, -height / 4 ],
        // 上弧 左->右
        [ 'C', -width / 2, -height * 5 / 12, width / 2, -height * 5 / 12, width / 2, -height / 4 ],
        // 中弧 右->左
        [ 'C', width / 2, -height * 1 / 12, -width / 2, -height * 1 / 12, -width / 2, -height / 4 ]
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
