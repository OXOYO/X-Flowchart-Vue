/**
 * Created by OXOYO on 2019/11/9.
 *
 * 注册自定义节点
 */

import general from './general'
import arrow from './arrow'

const obj = {
  ...general,
  ...arrow
}

export default function (G6) {
  Object.values(obj).forEach(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
