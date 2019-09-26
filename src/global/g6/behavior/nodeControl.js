/**
 * Created by OXOYO on 2019/7/17.
 *
 * 综合节点控制交互
 */

import G6 from '@antv/g6'
import config from '../config'
import utils from '../utils'

export default {
  name: 'node-control',
  options: {
    getDefaultCfg () {
      return {
        config: {
          // 是否在拖拽节点时更新所有与之相连的边
          updateEdge: true,
          // 是否支持在节点上添加文本
          nodeLabel: true,
          // 是否支持在边上添加文本
          edgeLabel: true,
          // tooltip 是否启用
          tooltip: {
            shapeControl: true,
            dragNode: true
          }
        }
      }
    },
    getEvents () {
      return {
        'editor:addNode': 'startAddNode',
        'node:mousedown': 'onNodeMousedown',
        'node:mouseup': 'onNodeMouseup',
        'node:dblclick': 'onNodeDblclick',
        'node:contextmenu': 'onNodeContextmenu',
        'canvas:mouseenter': 'onCanvasMouseenter',
        'canvas:mouseleave': 'onCanvasMouseleave',
        'canvas:contextmenu': 'onCanvasContextmenu',
        'edge:mousedown': 'onEdgeMousedown',
        'edge:mouseup': 'onEdgeMouseup',
        'edge:dblclick': 'onEdgeDblclick',
        'edge:contextmenu': 'onEdgeContextmenu',
        'mousemove': 'onMousemove',
        'mouseup': 'onMouseup'
      }
    },
    startAddNode (node) {
      let _t = this
      // 初始化数据
      _t.info = {
        type: 'dragNode',
        node: node,
        target: null
      }
      _t.dragNode.status = 'dragNodeToEditor'
    },
    onNodeMousedown (event) {
      let _t = this
      let model = event.item.getModel()
      _t.graph.emit('editor:getItem', {
        type: 'node',
        id: model.id,
        model: model
      })
      // 初始化数据
      _t.info = {
        type: null,
        node: event.item,
        target: event.target
      }
      if (_t.info.target && _t.info.target.attr('name')) {
        switch (_t.info.target.attr('name')) {
          case 'anchorPoint':
            _t.info.type = 'drawLine'
            break
          case 'shapeControlPoint':
            _t.info.type = 'shapeControlPoint'
            break
          case 'shapeControlRotate':
            _t.info.type = 'shapeControlRotate'
            break
        }
      } else {
        _t.info.type = 'dragNode'
      }
      if (_t.info && _t.info.type && _t[_t.info.type].start) {
        _t[_t.info.type].start.call(_t, event)
      }
    },
    onNodeMouseup (event) {
      let _t = this
      if (_t.info && _t.info.type && _t[_t.info.type].stop) {
        _t[_t.info.type].stop.call(_t, event)
      }
    },
    onNodeDblclick (event) {
      let _t = this
      if (_t.config.nodeLabel) {
        _t.nodeLabel.create.call(_t, event)
      }
    },
    onNodeContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'node',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onCanvasMouseenter (event) {
      let _t = this
      if (_t.info && _t.info.type === 'dragNode') {
        _t[_t.info.type].createDottedNode.call(_t, event)
      }
    },
    onCanvasMouseleave (event) {
      let _t = this
      if (_t.info && _t.info.type === 'dragNode') {
        _t[_t.info.type].stop.call(_t, event)
      }
    },
    onCanvasContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'canvas',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onEdgeMousedown (event) {
      let _t = this
      let model = event.item.getModel()
      _t.graph.emit('editor:getItem', {
        type: 'edge',
        id: model.id,
        model: model
      })
    },
    onEdgeMouseup (event) {
      let _t = this
      if (_t.info && _t.info.type === 'drawLine') {
        _t[_t.info.type].stop.call(_t, event)
      }
    },
    onEdgeDblclick (event) {
      let _t = this
      if (_t.config.edgeLabel) {
        _t.edgeLabel.create.call(_t, event)
      }
    },
    onEdgeContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'edge',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onMousemove (event) {
      let _t = this
      if (_t.info && _t.info.type && _t[_t.info.type].move) {
        _t[_t.info.type].move.call(_t, event)
      }
    },
    onMouseup (event) {
      let _t = this
      if (_t.info) {
        if (_t.info.type === 'dragNode') {
          if (_t.dragNode.status === 'dragNodeToEditor') {
            _t[_t.info.type].createNode.call(_t, event)
          }
        } else if (_t.info.type && _t[_t.info.type].stop) {
          _t[_t.info.type].stop.call(_t, event)
        }
      }
    },
    drawLine: {
      isMoving: false,
      currentLine: null,
      start (event) {
        let _t = this
        let sourceAnchor
        let startModel = _t.info.node.getModel()
        // 锚点数据
        let anchorPoints = _t.info.node.getAnchorPoints()
        // 处理线条目标点
        if (anchorPoints && anchorPoints.length) {
          // 获取距离指定坐标最近的一个锚点
          sourceAnchor = _t.info.node.getLinkPoint({ x: event.x, y: event.y })
        }
        _t.drawLine.currentLine = _t.graph.addItem('edge', {
          id: G6.Util.uniqueId(),
          // 起始节点
          source: startModel.id,
          sourceAnchor: sourceAnchor ? sourceAnchor.anchorIndex : '',
          // 终止节点/位置
          target: {
            x: event.x,
            y: event.y
          },
          // FIXME label 需支持双击编辑
          label: '',
          attrs: {},
          style: {
            stroke: _t.graph.$X.lineColor,
            lineWidth: _t.graph.$X.lineWidth,
            ...config.line.type[_t.graph.$X.lineStyle]
          },
          // FIXME 边的形式需要与工具栏联动
          shape: _t.graph.$X.lineType || 'line',
          startArrow: _t.graph.$X.startArrow || false,
          endArrow: _t.graph.$X.endArrow || false
        })
        _t.drawLine.isMoving = true
      },
      move (event) {
        let _t = this
        if (_t.drawLine.isMoving && _t.drawLine.currentLine) {
          _t.graph.updateItem(_t.drawLine.currentLine, {
            target: {
              x: event.x,
              y: event.y
            }
          })
        }
      },
      stop (event) {
        let _t = this
        if (_t.drawLine.isMoving) {
          if (_t.drawLine.currentLine === event.item) {
            // 画线过程中点击则移除当前画线
            _t.graph.removeItem(event.item)
          } else {
            let endNode = event.item
            let startModel = _t.info.node.getModel()
            let endModel = endNode.getModel()
            let targetAnchor
            // 锚点数据
            let anchorPoints = endNode.getAnchorPoints()
            // 处理线条目标点
            if (anchorPoints && anchorPoints.length) {
              // 获取距离指定坐标最近的一个锚点
              targetAnchor = endNode.getLinkPoint({ x: event.x, y: event.y })
            }
            _t.graph.updateItem(_t.drawLine.currentLine, {
              target: endModel.id,
              targetAnchor: targetAnchor ? targetAnchor.anchorIndex : '',
              // 存储起始点ID，用于拖拽节点时更新线条
              attrs: {
                start: startModel.id,
                end: endModel.id
              }
            })
          }
        }
        _t.drawLine.currentLine = null
        _t.drawLine.isMoving = false
        _t.info = null
      }
    },
    shapeControlPoint: {
      isMoving: false,
      // 是否等比缩放
      isProportional: false,
      // 原始节点信息
      originNodeModel: null,
      start (event) {
        let _t = this
        let model = _t.info.node.getModel()
        _t.shapeControlPoint.originNodeModel = {
          x: model.x,
          y: model.y,
          minWidth: model.minWidth,
          minHeight: model.minHeight,
          size: model.size || []
        }
        _t.shapeControlPoint.isMoving = true
        // 是否等比缩放
        _t.shapeControlPoint.isProportional = ['square', 'circle'].includes(model.shape)
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.create.call(_t, {
            left: model.x,
            top: model.y + model.height / 2
          }, `X: ${model.x.toFixed(2)} Y: ${model.y.toFixed(2)}<br>W: ${model.size[0].toFixed(2)} H: ${model.size[1].toFixed(2)}`)
        }
      },
      move (event) {
        let _t = this
        let originNodeModel = _t.shapeControlPoint.originNodeModel
        if (_t.info.node && _t.info.target && originNodeModel && _t.shapeControlPoint.isMoving) {
          let model = _t.info.node.getModel()
          // 判断位置
          let position = _t.info.target._attrs ? _t.info.target.attr('position') : null
          let attrs = {
            x: originNodeModel.x,
            y: originNodeModel.y,
            size: [...model.size]
          }
          let width = model.width
          let height = model.height
          if (position) {
            // 参照点，及当前controller的对角点
            // 参照点位置信息
            let referencePosition = [1 - position.x, 1 - position.y]
            // 相对图形坐标原点，(0,0)点位于图形左上角，与position的坐标系相同
            let originX = originNodeModel.x - width / 2
            let originY = originNodeModel.y - height / 2
            // 参照点坐标
            let referencePoint = {
              x: referencePosition[0] * width + originX,
              y: referencePosition[1] * height + originY
            }
            // 计算中心点坐标
            attrs.x = referencePoint.x + (event.x - referencePoint.x) / 2
            attrs.y = referencePoint.y + (event.y - referencePoint.y) / 2
            // 计算图形宽高
            if (_t.shapeControlPoint.isProportional) {
              attrs.size[0] = attrs.size[1] = Math.abs(referencePoint.x - event.x)
            } else if (position.x > 0 && position.x < 1 && (position.y === 0 || position.y === 1)) {
              attrs.x = originNodeModel.x
              attrs.size[0] = originNodeModel.size[0]
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
            } else if (position.y > 0 && position.y < 1 && (position.x === 0 || position.x === 1)) {
              attrs.y = originNodeModel.y
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = originNodeModel.size[1]
            } else {
              attrs.size[0] = Math.abs(referencePoint.x - event.x)
              attrs.size[1] = Math.abs(referencePoint.y - event.y)
            }
            // 处理宽高最小值
            if (attrs.size[0] < originNodeModel.minWidth || attrs.size[1] < originNodeModel.minHeight) {
              return
            }
          } else {
            return
          }
          _t.info.attrs = {
            ...attrs,
            width: attrs.size[0],
            height: attrs.size[1]
          }
          if (_t.config.tooltip.shapeControl) {
            _t.toolTip.update.call(_t, {
              left: attrs.x,
              top: attrs.y + attrs.size[1] / 2
            }, `X: ${attrs.x.toFixed(2)} Y: ${attrs.y.toFixed(2)}<br>W: ${attrs.size[0].toFixed(2)} H: ${attrs.size[1].toFixed(2)}`)
          }
          // 当前节点容器
          let group = _t.info.node.getContainer()
          // 更新锚点
          utils.anchor.update({
            ..._t.info.node.getModel(),
            width: attrs.size[0],
            height: attrs.size[1]
          }, group)
          // 更新shapeControl
          utils.shapeControl.update({
            ..._t.info.node.getModel(),
            width: attrs.size[0],
            height: attrs.size[1]
          }, group)
          // 更新节点
          _t.graph.updateItem(_t.info.node, attrs)
          if (_t.config.updateEdge) {
            // 更新边
            utils.edge.update(_t.info.node, _t.graph)
          }
        }
      },
      stop (event) {
        let _t = this
        if (_t.info.node && _t.info.attrs && _t.shapeControlPoint.originNodeModel && _t.shapeControlPoint.isMoving) {
          let attrs = _t.info.attrs
          // 当前节点容器
          let group = _t.info.node.getContainer()
          // 更新锚点
          utils.anchor.update({
            ..._t.info.node.getModel(),
            width: attrs.size[0],
            height: attrs.size[1]
          }, group)
          // 更新shapeControl
          utils.shapeControl.update({
            ..._t.info.node.getModel(),
            width: attrs.size[0],
            height: attrs.size[1]
          }, group)
          // 更新节点
          _t.graph.updateItem(_t.info.node, attrs)
        }
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.destroy.call(_t)
        }
        _t.shapeControlPoint.originNodeModel = null
        _t.shapeControlPoint.isMoving = false
        _t.info = null
      }
    },
    shapeControlRotate: {
      isMoving: false,
      start (event) {
        let _t = this
        _t.shapeControlRotate.isMoving = true
        // 计算旋转度数
        let model = _t.info.node.getModel()
        let p1 = {
          x: model.x,
          y: model.y
        }
        let p2 = {
          x: event.x,
          y: event.y
        }
        // 弧度，由于旋转把手位于图形正上方，因此需再加 Math.PI / 2
        let radian = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2
        // 角度
        let angle = radian * (180 / Math.PI)
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.create.call(_t, {
            left: model.x,
            top: model.y + model.height / 2
          }, `${angle.toFixed(2)}°`)
        }
        // 更新节点
        let keyShape = _t.info.node.getKeyShape()
        keyShape.resetMatrix()
        keyShape.rotate(radian)
        let group = _t.graph.get('group')
        // 更新shapeControl
        utils.shapeControl.rotate(model, group, radian)
        // 更新锚点
        utils.anchor.rotate(model, group, radian)
        _t.graph.paint()
      },
      move (event) {
        let _t = this
        // 计算旋转度数
        let model = _t.info.node.getModel()
        let p1 = {
          x: model.x,
          y: model.y
        }
        let p2 = {
          x: event.x,
          y: event.y
        }
        // 弧度
        let radian = Math.atan2(p2.y - p1.y, p2.x - p1.x) + Math.PI / 2
        // 角度
        let angle = radian * (180 / Math.PI)
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.update.call(_t, {
            left: model.x,
            top: model.y + model.height / 2
          }, `${angle.toFixed(2)}°`)
        }
        // 更新节点
        let keyShape = _t.info.node.getKeyShape()
        // FIXME g中shape的rotate是角度累加的，所以更新时如果style中有rotate就重置一下变换
        keyShape.resetMatrix()
        keyShape.rotate(radian)
        let group = _t.graph.get('group')
        // 更新shapeControl
        utils.shapeControl.rotate(model, group, radian)
        // 更新锚点
        utils.anchor.rotate(model, group, radian)
        _t.graph.paint()
      },
      stop (event) {
        let _t = this
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.destroy.call(_t)
        }
        _t.shapeControlRotate.isMoving = false
        _t.info = null
      }
    },
    dragNode: {
      dottedNode: null,
      status: null,
      // 虚线框节点样式
      dottedNodeStyle: {
        ...config.dottedNode.style.default
      },
      createDottedNode (event) {
        let _t = this
        if (!_t.dragNode.dottedNode && _t.info.node) {
          let { width, height } = _t.info.node
          let group = _t.graph.get('group')
          _t.dragNode.dottedNode = group.addShape('rect', {
            attrs: {
              ..._t.dragNode.dottedNodeStyle,
              width,
              height,
              x: event.x - width / 2,
              y: event.y - height / 2
            }
          })
          _t.graph.paint()
          if (_t.config.tooltip.dragNode) {
            _t.toolTip.create.call(_t, {
              left: event.canvasX,
              top: event.canvasY + height / 2
            }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}<br>W: ${width.toFixed(2)} H: ${height.toFixed(2)}`)
          }
        }
      },
      createNode (event) {
        let _t = this
        if (_t.dragNode.dottedNode && _t.info.node) {
          let { width, height, minWidth, minHeight } = _t.info.node
          let node = {
            ..._t.info.node,
            id: G6.Util.uniqueId(),
            x: event.x,
            y: event.y,
            size: [width, height],
            minWidth: minWidth,
            minHeight: minHeight,
            style: {
              fill: _t.graph.$X.fill,
              stroke: _t.graph.$X.lineColor,
              lineWidth: _t.graph.$X.lineWidth,
              ...config.line.type[_t.graph.$X.lineStyle]
            }
          }
          _t.graph.addItem('node', node)
          _t.dragNode.clear.call(_t)
          if (_t.config.tooltip.dragNode) {
            _t.toolTip.destroy.call(_t)
          }
          _t.graph.paint()
        }
      },
      start (event) {
        let _t = this
        // _t.dragNode.createDottedNode.call(_t, event)
        if (_t.config.tooltip.dragNode) {
          let { width, height } = _t.info.node.getModel()
          _t.toolTip.create.call(_t, {
            left: event.canvasX,
            top: event.canvasY + height / 2
          }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}<br>W: ${width.toFixed(2)} H: ${height.toFixed(2)}`)
        }
        _t.dragNode.status = 'dragNode'
      },
      move (event) {
        let _t = this
        if (_t.dragNode.status === 'dragNodeToEditor') {
          if (_t.dragNode.dottedNode && _t.info.node) {
            let { width, height } = _t.info.node
            _t.dragNode.dottedNode.attr({
              x: event.x - width / 2,
              y: event.y - height / 2
            })
            _t.graph.paint()
            if (_t.config.tooltip.dragNode) {
              _t.toolTip.update.call(_t, {
                left: event.canvasX,
                top: event.canvasY + height / 2
              }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}<br>W: ${width.toFixed(2)} H: ${height.toFixed(2)}`)
            }
          }
        } else if (_t.dragNode.status === 'dragNode') {
          if (_t.info.node) {
            // let { style } = _t.info.node.getModel()
            let attrs = {
              x: event.x,
              y: event.y
              // ,
              // style: {
              //   ...style,
              //   fill: _t.graph.$X.fill,
              //   stroke: _t.graph.$X.lineColor,
              //   lineWidth: _t.graph.$X.lineWidth
              // }
            }
            // 更新节点
            _t.graph.updateItem(_t.info.node, attrs)
            if (_t.config.updateEdge) {
              // 更新边
              utils.edge.update(_t.info.node, _t.graph)
            }
            if (_t.config.tooltip.dragNode) {
              let { width, height } = _t.info.node.getModel()
              _t.toolTip.update.call(_t, {
                left: event.canvasX,
                top: event.canvasY + height / 2
              }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}<br>W: ${width.toFixed(2)} H: ${height.toFixed(2)}`)
            }
          }
        }
      },
      stop (event) {
        let _t = this
        _t.dragNode.clear.call(_t)
        if (_t.config.tooltip.dragNode) {
          _t.toolTip.destroy.call(_t)
        }
        _t.graph.paint()
      },
      clear () {
        let _t = this
        if (_t.dragNode.dottedNode) {
          _t.dragNode.dottedNode.remove()
          _t.dragNode.dottedNode = null
        }
        _t.dragNode.status = null
        _t.info = null
      }
    },
    nodeLabel: {
      // 节点文本创建
      create (event) {
        let _t = this
        let canvas = _t.graph.get('canvas')
        let node = event.item
        let { label, x, y, width, height } = node.getModel()
        const el = canvas.get('el')
        const html = el.parentNode.querySelector('.inputBox')
        if (html) {
          html.value = label
          // 更新输入框样式
          G6.Util.modifyCSS(html, {
            display: 'inline-block',
            position: 'absolute',
            left: x - width / 2 + 'px',
            top: y - height / 2 + 'px',
            width: width + 'px',
            height: height + 'px',
            lineHeight: height + 'px',
            textAlign: 'center',
            overflow: 'hidden',
            fontSize: '14px'
          })
          if (html.focus) {
            html.focus()
          }
          const handler = function () {
            // 更新节点
            _t.graph.updateItem(node, {
              label: html.value,
              labelCfg: {
                style: {
                  fontSize: 16,
                  stroke: '#000000'
                }
              }
            })
            html.removeEventListener('blur', handler)
            // 隐藏输入框dom
            G6.Util.modifyCSS(html, {
              display: 'none'
            })
          }
          html.addEventListener('blur', handler)
        }
      }
    },
    edgeLabel: {
      // 节点文本创建
      create (event) {
        let _t = this
        let canvas = _t.graph.get('canvas')
        let edge = event.item
        let model = edge.getModel()
        let { label, source, sourceAnchor, target, targetAnchor } = model
        // 查找节点
        let sourceNode = _t.graph.findById(source)
        let targetNode = _t.graph.findById(target)
        // 查找锚点
        let sourceAnchors = sourceNode.getAnchorPoints()
        let targetAnchors = targetNode.getAnchorPoints()
        // 查找锚点信息
        let sourceAnchorPoint = sourceAnchors[sourceAnchor]
        let targetAnchorPoint = targetAnchors[targetAnchor]
        let left
        let top
        let minWidth = 40
        let maxWidth = 100
        let width = 40
        let height = 20
        let distance = Math.abs(targetAnchorPoint.x - sourceAnchorPoint.x)
        if (distance < minWidth) {
          width = minWidth
        }
        if (distance > maxWidth) {
          width = maxWidth
        }
        // 计算输入框位置
        if (sourceAnchorPoint.x < targetAnchorPoint.x) {
          left = sourceAnchorPoint.x + distance / 2 - width / 2 + 'px'
        } else {
          left = targetAnchorPoint.x + distance / 2 - width / 2 + 'px'
        }
        if (sourceAnchorPoint.y < targetAnchorPoint.y) {
          top = sourceAnchorPoint.y + Math.abs(targetAnchorPoint.y - sourceAnchorPoint.y) / 2 - height / 2 + 'px'
        } else {
          top = targetAnchorPoint.y + Math.abs(targetAnchorPoint.y - sourceAnchorPoint.y) / 2 - height / 2 + 'px'
        }
        const el = canvas.get('el')
        const html = el.parentNode.querySelector('.inputBox')
        if (html) {
          html.value = label
          // 更新输入框样式
          G6.Util.modifyCSS(html, {
            display: 'inline-block',
            position: 'absolute',
            left: left,
            top: top,
            width: width + 'px',
            height: height + 'px',
            lineHeight: height + 'px',
            textAlign: 'center',
            overflow: 'hidden',
            fontSize: '14px'
          })
          if (html.focus) {
            html.focus()
          }
          const handler = function () {
            // 更新节点
            _t.graph.updateItem(edge, {
              label: html.value,
              labelCfg: {
                position: 'center',
                style: {
                  fontSize: 16,
                  stroke: '#000000'
                }
              }
            })
            html.removeEventListener('blur', handler)
            // 隐藏输入框dom
            G6.Util.modifyCSS(html, {
              display: 'none'
            })
          }
          html.addEventListener('blur', handler)
        }
      }
    },
    toolTip: {
      currentTip: null,
      create (position, content) {
        let _t = this
        if (_t.toolTip.currentTip) {
          console.warn('Editor Warn:: can\'t creat tootip when currentTip not null!')
          return
        }
        let canvas = _t.graph.get('canvas')
        const el = canvas.get('el')
        _t.toolTip.currentTip = G6.Util.createDom(`<div class="tooltip">${content}</div>`)
        if (_t.toolTip.currentTip) {
          // 插入输入框dom
          el.parentNode.appendChild(_t.toolTip.currentTip)
          // 更新输入框样式
          G6.Util.modifyCSS(_t.toolTip.currentTip, {
            display: 'inline-block',
            position: 'absolute',
            left: position.left + 'px',
            top: position.top + 'px',
            padding: '5px 10px',
            width: '160px',
            marginTop: '10px',
            marginLeft: '-80px',
            background: '#F2F2F2',
            color: '#444444',
            border: '1px solid #D1D1D1',
            textAlign: 'center',
            overflow: 'hidden',
            fontSize: '14px'
          })
        }
      },
      update (position, content) {
        let _t = this
        if (_t.toolTip.currentTip) {
          // 更新文本
          _t.toolTip.currentTip.innerHTML = content
          // 更新输入框样式
          G6.Util.modifyCSS(_t.toolTip.currentTip, {
            left: position.left + 'px',
            top: position.top + 'px'
          })
        }
      },
      destroy () {
        let _t = this
        if (_t.toolTip.currentTip) {
          let canvas = _t.graph.get('canvas')
          const el = canvas.get('el')
          // 删除输入框dom
          el.parentNode.removeChild(_t.toolTip.currentTip)
          _t.toolTip.currentTip = null
        }
      }
    }
  }
}
