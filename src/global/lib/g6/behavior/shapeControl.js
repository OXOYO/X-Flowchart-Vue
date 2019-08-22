/**
 * Created by OXOYO on 2019/7/12.
 *
 *
 */

import utils from '../utils/index'

export default {
  name: 'shape-control',
  options: {
    getDefaultCfg () {
      return {
        minHeight: 20,
        minWidth: 20
      }
    },
    getEvents () {
      return {
        'node:mousedown': 'onNodeMousedown',
        'node:mouseup': 'onNodeMouseup',
        'mousemove': 'onMousemove',
        'mouseup': 'onMouseup'
      }
    },
    onNodeMousedown (event) {
      let _t = this
      let node = event.item
      let model = node.getModel()
      let target = event.target
      _t.currentNode = node
      _t.currentTarget = target
      _t.startPoint = {
        x: model.x,
        y: model.y,
        size: model.size || []
      }
    },
    onNodeMouseup (event) {
      let _t = this
      _t.currentNode = null
      _t.currentTarget = null
    },
    onMousemove (event) {
      let _t = this
      if (_t.currentNode && _t.currentTarget) {
        let nodeModel = _t.currentNode.getModel()
        // 判断位置
        let targetAttrs = _t.currentTarget._attrs
        let position = targetAttrs.position
        let attrs = {
          x: _t.startPoint.x,
          y: _t.startPoint.y,
          size: nodeModel.size
        }
        let width = nodeModel.width
        let height = nodeModel.height
        if (position) {
          // 参照点，及当前contoller的对角点
          let referencePoint = {}
          if (position.x === 0) {
            if (position.y === 0) {
              referencePoint = {
                x: _t.startPoint.x + width / 2,
                y: _t.startPoint.y + height / 2
              }
              // 计算宽、高
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
              // 计算中心点坐标
              attrs.x = event.x + attrs.size[0] / 2
              attrs.y = event.y + attrs.size[1] / 2
            } else if (position.y === 1) {
              referencePoint = {
                x: _t.startPoint.x + width / 2,
                y: _t.startPoint.y - height / 2
              }
              // 计算宽、高
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
              // 计算中心点坐标
              attrs.x = event.x + attrs.size[0] / 2
              attrs.y = event.y - attrs.size[1] / 2
            }
          } else if (position.x === 1) {
            if (position.y === 0) {
              referencePoint = {
                x: _t.startPoint.x - width / 2,
                y: _t.startPoint.y + height / 2
              }
              // 计算宽、高
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
              // 计算中心点坐标
              attrs.x = event.x - attrs.size[0] / 2
              attrs.y = event.y + attrs.size[1] / 2
            } else if (position.y === 1) {
              referencePoint = {
                x: _t.startPoint.x - width / 2,
                y: _t.startPoint.y - height / 2
              }
              // 计算宽、高
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
              // 计算中心点坐标
              attrs.x = event.x - attrs.size[0] / 2
              attrs.y = event.y - attrs.size[1] / 2
            }
          }
        }
        if (attrs.size[0] < _t.minWidth || attrs.size[1] < _t.minHeight) {
          return
        }
        // 当前节点容器
        let group = _t.currentNode.getContainer()
        // 更新锚点
        utils.updateAnchor({
          ..._t.currentNode.getModel(),
          width: attrs.size[0],
          height: attrs.size[1]
        }, group)
        // 更新shapeControl
        utils.updateShapeControl({
          ..._t.currentNode.getModel(),
          width: attrs.size[0],
          height: attrs.size[1]
        }, group)
        _t.currentNode.update(attrs)
        // 绘制
        _t.graph.paint()
      }
    },
    onMouseup (event) {
      let _t = this
      _t.currentNode = null
      _t.currentTarget = null
    }
  }
}
