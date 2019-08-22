/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册边
 */

import line from './line'
import cubic from './cubic'
import broken from './broken'

const obj = {
  line,
  cubic,
  broken
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerEdge(item.name, item.options, item.extendName)
  })
}
