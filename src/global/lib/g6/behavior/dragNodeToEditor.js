/**
 * Created by OXOYO on 2019/7/4.
 *
 * 拖拽节点到编辑器
 */

import G6 from '@antv/g6'
import config from '../config/index'

export default {
  name: 'drag-node-to-editor',
  options: {
    getDefaultCfg () {
      return {
        // 虚线框节点样式
        dottedNodeStyle: {
          ...config.dottedNode.style.default
        }
      }
    },
    getEvents () {
      return {
        'editor:addNode': 'startAddNode',
        'canvas:mouseenter': 'onMouseenter',
        'canvas:mousemove': 'onMousemove',
        'canvas:mouseup': 'onMouseup',
        'canvas:mouseleave': 'onMouseleave'
      }
    },
    startAddNode (node) {
      this.currentNode = node
    },
    onMouseenter (event) {
      let _t = this
      if (!_t.dottedNode && _t.currentNode) {
        let { width, height } = _t.currentNode
        let group = _t.graph.get('group')
        _t.dottedNode = group.addShape('rect', {
          attrs: {
            width,
            height,
            x: event.x - width / 2,
            y: event.y - height / 2,
            ..._t.dottedNodeStyle
          }
        })
        _t.dottedNode.set('capture', false)
      }
    },
    onMousemove (event) {
      let _t = this
      if (_t.dottedNode && _t.currentNode) {
        let { width, height } = _t.currentNode
        _t.dottedNode.attr({
          x: event.x - width / 2,
          y: event.y - height / 2
        })
        _t.graph.paint()
      }
    },
    onMouseup (event) {
      let _t = this
      if (_t.dottedNode && _t.currentNode) {
        let node = {
          id: G6.Util.uniqueId(),
          x: event.x,
          y: event.y,
          size: [_t.currentNode.width, _t.currentNode.height],
          ..._t.currentNode,
          name: 'nodexxx'
        }
        _t.graph.addItem('node', node)
        _t.dottedNode.remove()
        _t.dottedNode = null
        _t.currentNode = null
        _t.graph.paint()
      }
    },
    onMouseleave () {
      let _t = this
      if (_t.dottedNode && _t.currentNode) {
        _t.dottedNode.remove()
        _t.dottedNode = null
        _t.currentNode = null
        _t.graph.paint()
      }
    }
  }
}
