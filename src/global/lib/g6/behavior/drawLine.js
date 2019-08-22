/**
 * Created by OXOYO on 2019/7/4.
 *
 * 连线
 */

export default {
  name: 'draw-line',
  options: {
    getEvents () {
      return {
        'node:click': 'onNodeClick',
        'canvas:mousemove': 'onMousemove',
        'edge:click': 'onEdgeClick'
      }
    },
    onNodeClick (event) {
      let _t = this
      let node = event.item
      let target
      // 锚点数据
      let anchorPoints = node.getAnchorPoints()
      if (anchorPoints && anchorPoints.length) {
        // 获取距离指定坐标最近的一个锚点
        target = node.getLinkPoint({ x: event.x, y: event.y })
      } else {
        target = node
      }
      if (_t.graph.$X.isDrawing && _t.graph.$X.currentEdge) {
        _t.graph.updateItem(_t.graph.$X.currentEdge, {
          target: target
        })

        _t.graph.$X.currentEdge = null
        _t.graph.$X.isDrawing = false
        _t.shouldEnd.call(this, event)
      } else {
        _t.graph.$X.currentEdge = _t.graph.addItem('edge', {
          // 起始节点
          source: target,
          // 终止节点/位置
          target: {
            x: event.x,
            y: event.y
          },
          // FIXME 边的形式需要与工具栏联动
          shape: _t.graph.$X.lineType || 'line',
          startArrow: _t.graph.$X.startArrow || false,
          endArrow: _t.graph.$X.endArrow || false
        })
        _t.graph.$X.isDrawing = true
      }
    },
    onMousemove (event) {
      let _t = this
      if (_t.graph.$X.isDrawing && _t.graph.$X.currentEdge) {
        _t.graph.updateItem(_t.graph.$X.currentEdge, {
          target: {
            x: event.x,
            y: event.y
          }
        })
      }
    },
    onEdgeClick (event) {
      let _t = this
      if (_t.graph.$X.isDrawing && _t.graph.$X.currentEdge === event.item) {
        // 画线过程中点击则移除当前画线
        _t.graph.removeItem(_t.graph.$X.currentEdge)

        _t.graph.$X.currentEdge = null
        _t.graph.$X.isDrawing = false
      }
    }
  }
}
