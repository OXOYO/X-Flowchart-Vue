/**
 * Created by OXOYO on 2019/11/9.
 *
 * 注册自定义节点
 */

import general from './general'

const obj = {
  ...general
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
