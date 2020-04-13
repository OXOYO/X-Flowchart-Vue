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
          shapeControlPoint: {
            // 是否在缩放、旋转节点时更新所有与之相连的边
            updateEdge: false
          },
          dragNode: {
            // 是否在拖拽节点时更新所有与之相连的边
            updateEdge: false
          },
          // 是否支持在节点上添加文本
          nodeLabel: true,
          // 是否支持在边上添加文本
          edgeLabel: true,
          // tooltip 是否启用
          tooltip: {
            shapeControl: true,
            dragNode: true,
            dragEdge: false
          },
          // 是否启用对齐线
          alignLine: {
            enable: true,
            style: {
              stroke: '#FA8C16',
              lineWidth: 1
            }
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
        'edge:mousedown': 'onEdgeMousedown',
        'edge:mouseup': 'onEdgeMouseup',
        'edge:dblclick': 'onEdgeDblclick',
        'edge:contextmenu': 'onEdgeContextmenu',
        'canvas:mousedown': 'onCanvasMousedown',
        'canvas:mousemouse': 'onCanvasMousemove',
        'canvas:mouseup': 'onCanvasMouseup',
        'canvas:mouseenter': 'onCanvasMouseenter',
        'canvas:mouseleave': 'onCanvasMouseleave',
        'canvas:contextmenu': 'onCanvasContextmenu',
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
      if (event.event.button !== 0) { // 非左键忽略
        return
      }
      let _t = this
      let model = event.item.getModel()
      _t.graph.emit('editor:getItem', [
        {
          type: 'node',
          id: model.id,
          model: model
        }
      ])
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
    onEdgeMousedown (event) {
      let _t = this
      let model = event.item.getModel()
      _t.graph.emit('editor:getItem', [
        {
          type: 'edge',
          id: model.id,
          model: model
        }
      ])
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
    onCanvasMousedown (event) {
      if (event.event.button !== 0) { // 非左键忽略
        return
      }
      let _t = this
      // 初始化数据
      _t.info = {
        type: 'drawGroup',
        startPosition: {
          x: event.x,
          y: event.y
        }
      }
      if (_t.info && _t.info.type && _t[_t.info.type].start) {
        _t[_t.info.type].start.call(_t, event)
      }
    },
    onCanvasMousemove (event) {
      let _t = this
      if (_t.info && _t.info.type && _t[_t.info.type].move) {
        _t[_t.info.type].move.call(_t, event)
      }
    },
    onCanvasMouseup (event) {
      let _t = this
      if (_t.info && _t.info.type && _t[_t.info.type].stop) {
        _t[_t.info.type].stop.call(_t, event)
      }
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
        }
        if (_t.info.type && _t[_t.info.type].stop) {
          _t[_t.info.type].stop.call(_t, event)
        }
      }
    },
    // 拖拽画线
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
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 16,
              stroke: '#000000'
            }
          },
          attrs: {},
          style: {
            stroke: _t.graph.$X.lineColor,
            lineWidth: _t.graph.$X.lineWidth,
            ...config.edge.style.default,
            ...config.edge.type[_t.graph.$X.lineDash]
          },
          // FIXME 边的形式需要与工具栏联动
          shape: _t.graph.$X.lineType || 'line',
          startArrow: _t.graph.$X.startArrow || false,
          endArrow: _t.graph.$X.endArrow || false
        })
        if (_t.config.tooltip.dragEdge) {
          _t.toolTip.create.call(_t, {
            left: event.canvasX,
            top: event.canvasY + 10
          }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}`)
        }
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
          if (_t.config.tooltip.dragEdge) {
            _t.toolTip.update.call(_t, {
              left: event.canvasX,
              top: event.canvasY + 10
            }, `X: ${event.x.toFixed(2)} Y: ${event.y.toFixed(2)}`)
          }
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
            // 记录操作日志
            _t.graph.emit('editor:record', 'drawLine stop')
          }
        }
        if (_t.config.tooltip.dragEdge) {
          _t.toolTip.destroy.call(_t)
        }
        _t.drawLine.currentLine = null
        _t.drawLine.isMoving = false
        _t.info = null
      }
    },
    // 图形控制 缩放
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
        // FIXME !!! 此处应该通过物料配置控制
        _t.shapeControlPoint.isProportional = ['square', 'circle', 'bidirectional-arrow', 'arrow'].includes(model.shape)
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
          // 设置宽高
          attrs.width = attrs.size[0]
          attrs.height = attrs.size[1]
          // 存储attrs
          _t.info.attrs = attrs
          // 更新toolTip
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
          if (_t.config.shapeControlPoint.updateEdge) {
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
          if (_t.config.shapeControlPoint.updateEdge) {
            // 更新边
            utils.edge.update(_t.info.node, _t.graph)
          }
          // 记录操作日志
          _t.graph.emit('editor:record', 'shapeControlPoint stop')
        }
        if (_t.config.tooltip.shapeControl) {
          _t.toolTip.destroy.call(_t)
        }
        _t.shapeControlPoint.originNodeModel = null
        _t.shapeControlPoint.isMoving = false
        _t.info = null
      }
    },
    // 图形控制 旋转
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
        model.radian = radian
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
    // 拖拽节点
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
          let { width, height, minWidth, minHeight, label } = _t.info.node
          let node = {
            ..._t.info.node,
            id: G6.Util.uniqueId(),
            x: event.x,
            y: event.y,
            size: [width, height],
            minWidth: minWidth,
            minHeight: minHeight,
            label: label,
            style: {
              fill: _t.graph.$X.fill,
              fillOpacity: _t.graph.$X.fillOpacity,
              stroke: _t.graph.$X.lineColor,
              strokeOpacity: _t.graph.$X.strokeOpacity,
              lineWidth: _t.graph.$X.lineWidth,
              ...config.edge.type[_t.graph.$X.lineDash]
            }
          }
          _t.graph.addItem('node', node)
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
        if (_t.config.alignLine.enable) {
          // 绘制对齐线
          _t.alignLine.start.call(_t)
        }
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
            if (_t.config.alignLine.enable) {
              // 绘制对齐线
              _t.alignLine.move.call(_t, _t.dragNode.dottedNode)
            }
          }
        } else if (_t.dragNode.status === 'dragNode') {
          if (_t.info.node) {
            let { id, groupId, x, y } = _t.info.node.getModel()
            _t.graph.find('node', node => {
              let model = node.getModel()
              // 更新当节点
              if (model.id === id) {
                let attrs = {
                  // 处理点击移动 图形时的抖动
                  x: x + event.event.movementX,
                  y: y + event.event.movementY
                }
                // 更新节点
                _t.graph.updateItem(_t.info.node, attrs)
                if (_t.config.dragNode.updateEdge) {
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
              } else {
                if (groupId && model.groupId && model.groupId === groupId) {
                  // 更新同组节点
                  _t.graph.updateItem(node, {
                    x: model.x + event.event.movementX,
                    y: model.y + event.event.movementY
                  })
                }
              }
            })
            if (_t.config.alignLine.enable) {
              // 绘制对齐线
              _t.alignLine.move.call(_t, _t.info.node)
            }
          }
        }
      },
      stop (event) {
        let _t = this
        // 记录操作日志
        _t.graph.emit('editor:record', 'dragNode stop')
        _t.dragNode.clear.call(_t)
        if (_t.config.tooltip.dragNode) {
          _t.toolTip.destroy.call(_t)
        }
        if (_t.config.alignLine.enable) {
          _t.alignLine.stop.call(_t)
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
    // 框选
    drawGroup: {
      isMoving: false,
      // 选框节点
      marqueeNode: null,
      start (event) {
        let _t = this
        _t.drawGroup.isMoving = true
        // 清除已有group
        _t.graph.getNodes().forEach(item => {
          // 更新节点
          _t.graph.updateItem(item, {
            groupId: ''
          })
        })
      },
      move (event) {
        let _t = this
        if (_t.info && _t.drawGroup.isMoving) {
          // 计算坐标、宽高
          let { startPosition } = _t.info
          let x = startPosition.x + (event.x - startPosition.x) / 2
          let y = startPosition.y + (event.y - startPosition.y) / 2
          let width = Math.abs(event.x - startPosition.x)
          let height = Math.abs(event.y - startPosition.y)
          if (!_t.drawGroup.marqueeNode) {
            // 绘制虚线框
            let node = {
              id: G6.Util.uniqueId(),
              shape: 'rect',
              x: x,
              y: y,
              size: [width, height],
              style: {
                lineWidth: 1,
                stroke: '#29B6F2',
                // lineDash: [ 5, 5 ],
                strokeOpacity: 1,
                fill: '#29B6F2',
                fillOpacity: 0.1,
                opacity: 1,
                minDis: 20,
                maxDis: 40,
                cursor: 'default'
              }
            }
            _t.drawGroup.marqueeNode = _t.graph.addItem('node', node)
          } else {
            _t.graph.updateItem(_t.drawGroup.marqueeNode, {
              x: x,
              y: y,
              size: [width, height]
            })
          }
        }
      },
      stop (event) {
        let _t = this
        if (_t.info && _t.drawGroup.isMoving && _t.drawGroup.marqueeNode) {
          const { minX: marqueeNodeMinX, maxX: marqueeNodeMaxX, minY: marqueeNodeMinY, maxY: marqueeNodeMaxY } = _t.drawGroup.marqueeNode.getBBox()
          // 当前节点数组
          let currentItemArr = []
          let groupId = G6.Util.uniqueId()
          let marqueeNodeId = _t.drawGroup.marqueeNode.get('id')
          _t.graph.getNodes().forEach(item => {
            let model = item.getModel()
            let { id } = model
            let { minX, maxX, minY, maxY } = item.getBBox()
            // 判断节点是否在组区域内
            if (id !== marqueeNodeId && minX > marqueeNodeMinX && maxX < marqueeNodeMaxX && minY > marqueeNodeMinY && maxY < marqueeNodeMaxY) {
              // 更新节点
              _t.graph.updateItem(item, {
                groupId
              })
              // 设置激活
              _t.graph.setItemState(item, 'active', true)
              currentItemArr.push({
                type: 'node',
                id: id,
                model: item.getModel()
              })
            }
          })
          // 设置当前节点数组
          _t.graph.emit('editor:getItem', currentItemArr)
          // 删除选框节点
          _t.graph.removeItem(_t.drawGroup.marqueeNode)
        }
        _t.drawGroup.isMoving = false
        _t.drawGroup.marqueeNode = null
      }
    },
    // 节点Label
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
    // 边Label
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
    // 提示
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
    },
    // 对齐线
    // 鸣谢：@guozhaolong https://github.com/guozhaolong/wfd
    // 参考 https://github.com/guozhaolong/wfd/blob/master/src/behavior/itemAlign.js
    alignLine: {
      // 对齐线列表
      lineList: [],
      // 最大距离
      maxDistance: 2,
      start () {
        let _t = this
        _t.alignLine._clear.call(_t)
      },
      _clear () {
        let _t = this
        _t.alignLine.lineList.forEach(line => {
          line.remove()
        })
        _t.alignLine.lineList = []
        _t.graph.paint()
      },
      move (item) {
        let _t = this
        // 先清空已有对齐线
        _t.alignLine._clear.call(_t)
        const bbox = item.getBBox()
        // FIXME bbox 中x、y坐标为图形左上角坐标
        // 中上
        const ct = { x: bbox.x + bbox.width / 2, y: bbox.y }
        // 中心
        const cc = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 }
        // 中下
        const cb = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height }
        // 左中
        const lc = { x: bbox.x, y: bbox.y + bbox.height / 2 }
        // 右中
        const rc = { x: bbox.x + bbox.width, y: bbox.y + bbox.height / 2 }
        // 计算距离
        const getDistance = function (line, point) {
          // 归一向量
          function normalize (out, a) {
            let x = a[0]
            let y = a[1]
            let len = x * x + y * y
            if (len > 0) {
              // TODO: evaluate use of glm_invsqrt here?
              len = 1 / Math.sqrt(len)
              out[0] = a[0] * len
              out[1] = a[1] * len
            }
            return out
          }
          function dot (a, b) {
            return a[0] * b[0] + a[1] * b[1]
          }
          const pointLineDistance = function (lineX1, lineY1, lineX2, lineY2, pointX, pointY) {
            const lineLength = [lineX2 - lineX1, lineY2 - lineY1]
            if (lineLength[0] === 0 && lineLength[1] === 0) {
              return NaN
            }
            let s = [-lineLength[1], lineLength[0]]
            normalize(s, s)
            return Math.abs(dot([pointX - lineX1, pointY - lineY1], s))
          }
          return {
            line,
            point,
            dis: pointLineDistance(line[0], line[1], line[2], line[3], point.x, point.y)
          }
        }
        // 遍历节点
        const nodes = _t.graph.getNodes()
        nodes.forEach(node => {
          let horizontalLines = []
          let verticalLines = []
          // 对齐线信息
          let info = {
            horizontals: [],
            verticals: []
          }
          const bbox1 = node.getBBox()
          // 水平线
          let horizontalInfo = [
            // 左上 右上 tltr
            [bbox1.minX, bbox1.minY, bbox1.maxX, bbox1.minY],
            // 左中 右中 lcrc
            [bbox1.minX, bbox1.centerY, bbox1.maxX, bbox1.centerY],
            // 左下 右下 blbr
            [bbox1.minX, bbox1.maxY, bbox1.maxX, bbox1.maxY]
          ]
          // 垂直线
          let verticalInfo = [
            // 左上 左下 tlbl
            [bbox1.minX, bbox1.minY, bbox1.minX, bbox1.maxY],
            // 上中 下中 tcbc
            [bbox1.centerX, bbox1.minY, bbox1.centerX, bbox1.maxY],
            // 上右 下右 trbr
            [bbox1.maxX, bbox1.minY, bbox1.maxX, bbox1.maxY]
          ]
          horizontalInfo.forEach(line => {
            horizontalLines.push(getDistance(line, ct))
            horizontalLines.push(getDistance(line, cc))
            horizontalLines.push(getDistance(line, cb))
          })
          verticalInfo.forEach(line => {
            verticalLines.push(getDistance(line, lc))
            verticalLines.push(getDistance(line, cc))
            verticalLines.push(getDistance(line, rc))
          })
          horizontalLines.sort((a, b) => a.dis - b.dis)
          verticalLines.sort((a, b) => a.dis - b.dis)
          // 过滤掉距离为0的线条
          horizontalLines = horizontalLines.filter(item => item.dis !== 0)
          if (horizontalLines.length && horizontalLines[0].dis < _t.alignLine.maxDistance) {
            // 取前3个距离相等的线条
            for (let i = 0; i < 3; i++) {
              if (horizontalLines[0].dis === horizontalLines[i].dis) {
                info.horizontals.push(horizontalLines[i])
              }
            }
          }
          // 过滤掉距离为0的线条
          verticalLines = verticalLines.filter(item => item.dis !== 0)
          if (verticalLines.length && verticalLines[0].dis < _t.alignLine.maxDistance) {
            // 取前3个距离相等的线条
            for (let i = 0; i < 3; i++) {
              if (verticalLines[0].dis === verticalLines[i].dis) {
                info.verticals.push(verticalLines[i])
              }
            }
          }
          // 添加对齐线
          const group = _t.graph.get('group')
          // 对齐线样式
          const lineStyle = _t.config.alignLine.style
          // 处理水平线
          if (info.horizontals.length) {
            info.horizontals.forEach(lineObj => {
              let line = lineObj.line
              let point = lineObj.point
              let lineHalf = (line[0] + line[2]) / 2
              let x1
              let x2
              if (point.x < lineHalf) {
                x1 = point.x - bbox.width / 2
                x2 = Math.max(line[0], line[2])
              } else {
                x1 = point.x + bbox.width / 2
                x2 = Math.min(line[0], line[2])
              }
              let shape = group.addShape('line', {
                attrs: {
                  x1,
                  y1: line[1],
                  x2,
                  y2: line[1],
                  ...lineStyle
                },
                // 是否拾取及触发该元素的交互事件
                capture: false
              })
              _t.alignLine.lineList.push(shape)
            })
          }
          // 处理垂直线
          if (info.verticals.length) {
            info.verticals.forEach(lineObj => {
              let line = lineObj.line
              let point = lineObj.point
              let lineHalf = (line[1] + line[3]) / 2
              let y1
              let y2
              if (point.y < lineHalf) {
                y1 = point.y - bbox.height / 2
                y2 = Math.max(line[1], line[3])
              } else {
                y1 = point.y + bbox.height / 2
                y2 = Math.min(line[1], line[3])
              }
              let shape = group.addShape('line', {
                attrs: {
                  x1: line[0],
                  y1,
                  x2: line[0],
                  y2,
                  ...lineStyle
                },
                capture: false
              })
              _t.alignLine.lineList.push(shape)
            })
          }
        })
      },
      stop () {
        let _t = this
        _t.alignLine._clear.call(_t)
      }
    }
  }
}
