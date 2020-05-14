/**
 * Created by OXOYO on 2019/8/7.
 *
 * 线条公共方法
 */

import utils from '../utils'

export default {
  // 自定义边配置，需要配置时在各个图形中覆写
  options: {},
  draw (cfg, group) {
    const { startPoint, endPoint } = cfg
    const keyShape = group.addShape('path', {
      name: 'edgeShape',
      className: 'edge-shape',
      attrs: {
        ...cfg,
        path: [
          [ 'M', startPoint.x, startPoint.y ],
          [ 'L', endPoint.x, endPoint.y ]
        ]
      }
    })
    return keyShape
  },
  setState (name, value, item) {
    // 设置边状态
    utils.edge.setState(name, value, item)
  }
}
