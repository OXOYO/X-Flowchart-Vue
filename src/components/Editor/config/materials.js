/**
 * Created by OXOYO on 2019/7/11.
 *
 * 物料数据
 */

const shapeControl = {
  // 控制器
  controllers: [
    [0, 0, 'nwse-resize'],
    // [0, 0.5, 'ew-resize'],
    [0, 1, 'nesw-resize'],
    // [0.5, 0, 'ns-resize'],
    // [0.5, 1, 'ns-resize'],
    [1, 0, 'nesw-resize'],
    // [1, 0.5, 'ew-resize'],
    [1, 1, 'nwse-resize']
  ],
  // 旋转
  rotate: true
}

export default [
  {
    shape: 'x-rect',
    label: 'rect',
    enable: true,
    width: 40,
    height: 40,
    // 锚点
    anchorPoints: [ [0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5] ],
    shapeControl: shapeControl
  },
  {
    shape: 'x-circle',
    label: 'circle',
    enable: true,
    width: 40,
    height: 40,
    anchorPoints: [ [0.5, 0], [0.5, 1], [0, 0.5], [1, 0.5] ],
    shapeControl: shapeControl
  }
]
