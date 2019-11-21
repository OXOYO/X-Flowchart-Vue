/**
 * Created by OXOYO on 2019/11/12.
 *
 * 背景
 */

// import Base from '@antv/g6/plugins/base'
import Grid from '@antv/g6/build/grid'
import createDOM from '@antv/util/lib/dom/create-dom'
import modifyCSS from '@antv/util/lib/dom/modify-css'

export default class XBackground extends Grid {
  init () {
    let _t = this
    const graph = _t.get('graph')
    const graphContainer = graph.get('container')
    const canvas = graph.get('canvas').get('el')
    const backgroundContainer = createDOM(
      '<div class="x-background" style="position: absolute; left: 0; top:0; right:0; bottom:0; overflow: hidden; z-index: -999;"></div>'
    )
    const imgDom = createDOM(
      '<img class="x-background-img" style="width: 100%; height: 100%; visibility: hidden;"></img>'
    )
    backgroundContainer.appendChild(imgDom)
    graphContainer.insertBefore(backgroundContainer, canvas)
    _t.set('container', backgroundContainer)
    _t.set('imgDom', imgDom)
  }
  getEvents () {
    return {
      'background:reset': 'resetBackground',
      'background:update': 'updateBackground'
    }
  }
  // 重置背景
  resetBackground (e) {
    let _t = this
    let imgDom = _t.get('imgDom')
    if (imgDom) {
      imgDom.src = ''
      modifyCSS(imgDom, {
        visibility: 'hidden'
      })
    }
  }
  updateBackground (data) {
    let _t = this
    let imgDom = _t.get('imgDom')
    if (imgDom) {
      imgDom.src = data
      modifyCSS(imgDom, {
        visibility: 'visible'
      })
    }
  }
  updateGrid () {}
  getContainer () {
    return this.get('container')
  }
  destroy () {
    let _t = this
    const graph = _t.get('graph')
    const graphContainer = graph.get('container')
    const backgroundContainer = _t.get('container')
    graphContainer.removeChild(backgroundContainer)
  }
}
