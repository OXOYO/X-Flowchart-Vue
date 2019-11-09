/**
 * Created by OXOYO on 2019/9/3.
 *
 * 菱形
 */

import Global from '@antv/g6/src/global'
import Util from '@antv/g6/src/util'
import base from '../base'

export default {
  name: 'diamond',
  extendName: 'single-shape',
  options: {
    ...base,
    /*
    // 方式一：使用G Polygon实现
    shapeType: 'polygon',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      const points = [
        [-width / 2, 0],
        [0, -height / 2],
        [width / 2, 0],
        [0, height / 2]
      ]
      const color = cfg.color || Global.defaultNode.color
      const style = Util.mix({}, Global.defaultNode.style, {
        // 节点的位置在上层确定，所以这里仅使用相对位置即可
        x,
        y,
        width,
        height,
        points,
        stroke: color
      }, cfg.style)
      return style
    }
    */
    // 方式二：使用G Path实现
    shapeType: 'path',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      const path = [
        // FIXME (0,0)点在图形正中心，x坐标向右增，y坐标向下增
        // 左顶点
        [ 'M', -width / 2, 0 ],
        // 上顶点
        [ 'L', 0, -height / 2 ],
        // 右顶点
        [ 'L', width / 2, 0 ],
        // 下顶点
        [ 'L', 0, height / 2 ],
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
