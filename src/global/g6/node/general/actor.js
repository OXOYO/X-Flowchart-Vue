/**
 * Created by OXOYO on 2019/9/3.
 *
 * 演员
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'

export default {
  name: 'actor',
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
        [ 'M', -width / 2, -height / 5 ],
        // 上中
        [ 'L', 0, -height / 5 ],
        [ 'L', 0, -height / 4 ],
        // 左圆
        [ 'C', -width / 5, -height / 4, -width / 5, -height / 2, 0, -height / 2 ],
        // 右圆
        [ 'C', width / 5, -height / 2, width / 5, -height / 4, 0, -height / 4 ],
        // 右上
        [ 'L', 0, -height / 5 ],
        [ 'L', width / 2, -height / 5 ],
        [ 'L', 0, -height / 5 ],
        // 竖线
        [ 'L', 0, height / 4 ],
        // 左斜线
        [ 'L', -width / 2, height / 2 ],
        [ 'L', 0, height / 4 ],
        // 右斜线
        [ 'L', width / 2, height / 2 ],
        [ 'L', 0, height / 4 ],
        // 竖线
        [ 'L', 0, -height / 5 ]
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
