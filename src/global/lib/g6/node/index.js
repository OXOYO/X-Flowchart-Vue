/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册节点
 */

import rect from './rect'
import circle from './circle'

const obj = {
  rect,
  circle
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
