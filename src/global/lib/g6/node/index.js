/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册节点
 */

import rectangle from './rectangle'
import square from './square'
import circle from './circle'
import ellipse from './ellipse'

const obj = {
  rectangle,
  square,
  circle,
  ellipse
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
