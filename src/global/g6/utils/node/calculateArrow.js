/**
 * Created by OXOYO on 2019/11/9.
 *
 * 计算箭头
 */

export default function (options) {
  // FIXME 计算图示见： @/document/IMG_20191109_153609.jpg
  // 箭头角度80度
  const deg = options.deg || 80
  // 5度角
  const deg2 = 180 - deg / 2 - 90 - 45
  // 箭头长度
  const L1 = options.L1 || 30

  // 计算相关边
  const L2 = L1 * Math.tan(deg / 2 * Math.PI / 180)
  const L3 = Math.sqrt(L1 * L1 + L2 * L2)
  const L4 = L3 * Math.sin(deg2 * Math.PI / 180)
  const L5 = L3 * Math.cos(deg2 * Math.PI / 180)
  const L6 = Math.sqrt(L1 * L1 / 2)
  // 箭头中间宽度
  const L7 = options.L7 || 10
  const L8 = Math.sqrt(L7 * L7 / 2)
  // 图形左上顶点与右下顶点所围成的等腰直角三角形的直角边边长
  const L9 = Math.sqrt((2 * L7) * (2 * L7) / 2)

  return {
    deg,
    L1,
    L2,
    L3,
    L4,
    L5,
    L6,
    L7,
    L8,
    L9
  }
}
