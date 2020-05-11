/**
 * Created by OXOYO on 2019/9/5.
 *
 * 内部存储器
 */

import * as G6Util from '@antv/util'
import base from '../base'

export default {
  name: 'internal-storage',
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
      const path = [
        // 左上
        [ 'M', -width / 2, -height / 2 ],
        // 右上
        [ 'L', width / 2, -height / 2 ],
        // 右下
        [ 'L', width / 2, height / 2 ],
        // 左下
        [ 'L', -width / 2, height / 2 ],
        // 左上
        [ 'L', -width / 2, -height / 2 ],
        // 竖线
        [ 'L', -width / 4, -height / 2 ],
        [ 'L', -width / 4, height / 2 ],
        // 左下
        [ 'L', -width / 2, height / 2 ],
        // 左上
        [ 'L', -width / 2, -height / 2 ],
        // 右上
        [ 'L', width / 2, -height / 2 ],
        // 横线
        [ 'L', width / 2, -height / 4 ],
        [ 'L', -width / 2, -height / 4 ]
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
