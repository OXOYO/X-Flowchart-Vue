/**
 * Created by OXOYO on 2019/11/12.
 *
 * 背景
 */

// import Base from '@antv/g6/plugins/base'
import { Grid } from '@antv/g6'
import * as G6DomUtil from '@antv/dom-util'
import { mat3 } from '@antv/matrix-util'

// 网格背景图片
const GRID_PNG =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4='

export default class XBackground extends Grid {
  getDefaultCfgs () {
    return {
      grid: GRID_PNG,
      background: ''
    }
  }
  init () {
    const _t = this
    const graph = _t.get('graph')
    const minZoom = graph.get('minZoom')
    const width = graph.get('width')
    const height = graph.get('height')
    const graphContainer = graph.get('container')
    const canvas = graph.get('canvas').get('el')
    const backgroundContainer = G6DomUtil.createDom(
      `<div
            class="x-background"
            style="position: absolute; left: 0; top:0; right:0; bottom:0; overflow: hidden; z-index: -999;
          "></div>`
    )
    // grid
    const gridImg = _t.get('grid')
    const gridImgDom = G6DomUtil.createDom(
      `<div
            class="x-background-grid"
            style="position: absolute; transform-origin: 0% 0% 0px; background-image: url('${gridImg}')"
           ></div>`
    )
    G6DomUtil.modifyCSS(gridImgDom, {
      width: `${width / minZoom}px`,
      height: `${height / minZoom}px`,
      left: 0,
      top: 0
    })
    backgroundContainer.appendChild(gridImgDom)
    _t.set('gridImgDom', gridImgDom)
    // 背景
    const backgroundImg = _t.get('background')
    const backgroundImgDom = G6DomUtil.createDom(
      `<img
            class="x-background-img"
            style="position: absolute; width: 100%; height: 100%; visibility: ${backgroundImg ? 'visible' : 'hidden'}"
            src="${backgroundImg}"
          >`
    )
    backgroundContainer.appendChild(backgroundImgDom)
    _t.set('backgroundImgDom', backgroundImgDom)
    graphContainer.insertBefore(backgroundContainer, canvas)
    _t.set('container', backgroundContainer)
  }
  getEvents () {
    return {
      'background:reset': 'resetBackground',
      'background:set': 'setBackground',
      viewportchange: 'updateGrid'
    }
  }
  // 重置背景
  resetBackground () {
    const _t = this
    const dom = _t.get('backgroundImgDom')
    if (dom) {
      dom.src = ''
      G6DomUtil.modifyCSS(dom, {
        visibility: 'hidden'
      })
    }
  }
  setBackground (url) {
    const _t = this
    const dom = _t.get('backgroundImgDom')
    if (dom) {
      dom.src = url
      G6DomUtil.modifyCSS(dom, {
        visibility: 'visible'
      })
    }
  }
  updateGrid (e) {
    const gridImgDom = this.get('gridImgDom')
    let matrix = e.matrix
    if (!matrix) {
      matrix = mat3.create()
    }
    // 矩阵变换
    const transform = `matrix(${matrix[0]}, ${matrix[1]}, ${matrix[3]}, ${matrix[4]}, 0, 0)`
    G6DomUtil.modifyCSS(gridImgDom, {
      transform
    })
  }
  getContainer () {
    return this.get('container')
  }
  destroy () {
    const _t = this
    const graph = _t.get('graph')
    const graphContainer = graph.get('container')
    const backgroundContainer = _t.get('container')
    graphContainer.removeChild(backgroundContainer)
  }
}
