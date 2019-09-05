/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册节点
 */

import rectangle from './rectangle'
import roundedRectangle from './rounded-rectangle'
import ellipse from './ellipse'
import square from './square'
import circle from './circle'
import diamond from './diamond'
import parallelogram from './parallelogram'
import hexagon from './hexagon'
import triangle from './triangle'
import cylinder from './cylinder'
import cloud from './cloud'
import document from './document'
import internalStorage from './internal-storage'
import cube from './cube'

const obj = {
  rectangle,
  roundedRectangle,
  ellipse,
  square,
  circle,
  diamond,
  parallelogram,
  hexagon,
  triangle,
  cylinder,
  cloud,
  document,
  internalStorage,
  cube
}

export default function (G6) {
  Object.values(obj).map(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
