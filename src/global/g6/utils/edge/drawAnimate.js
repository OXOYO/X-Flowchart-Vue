/**
 * Created by OXOYO on 2019/7/11.
 *
 * 绘制边动画
 */

import config from '../../config'

export default function (cfg, group) {
  const node = group.getFirst()
  const startPoint = node.getPoint(0)
  if (!startPoint) {
    return
  }
  const circleName = 'edgeAnimatePoint'
  // 查找已有圆点
  let circle = group.find(item => item.name === circleName)
  if (!circle) {
    // 添加红色圆点
    circle = group.addShape('circle', {
      id: cfg.id + '_edge_animate_point_',
      name: circleName,
      attrs: {
        x: startPoint.x,
        y: startPoint.y,
        ...config.edgeAnimate.style.default
      }
    })
  }

  // 对红色圆点添加动画
  circle.animate(ratio => {
    const tmpPoint = node.getPoint(ratio)
    if (tmpPoint) {
      return {
        x: tmpPoint.x,
        y: tmpPoint.y
      }
    }
  }, {
    repeat: true,
    duration: config.edgeAnimate.duration
  })
}
