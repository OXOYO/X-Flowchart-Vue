/**
* Created by OXOYO on 2017/4/7.
* 画布
*/

<style lang="less">
  .flowchart-canvas {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>

<template>
  <div
    class="flowchart-canvas"
    @drop.stop.prevent="dropHandle"
    @dragover.stop.prevent
    @mousedown="renderLinkStart"
    @mouseup="renderLinkStop"
    @mousemove="renderLink"
    @click="canvasClick"
    @contextmenu.stop.prevent="canvasRightClick"
    @wheel.stop.prevent="wheelHandle"
  >
    <!-- 右键菜单 -->
    <x-contextmenu></x-contextmenu>
    <!-- 节点容器 -->
    <x-canvas-node-container :drawingLink="link.drawing"></x-canvas-node-container>
    <!-- 节点配置 -->
    <x-canvas-node-options></x-canvas-node-options>
    <!-- 工具栏 -->
    <x-canvas-toolbar :toolbarCallback="toolbarCallback"></x-canvas-toolbar>
    <!-- 缩放控件 -->
    <x-canvas-zoombar></x-canvas-zoombar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CanvasContextmenu from './CanvasContextmenu.vue'
  import CanvasNodeContainer from './CanvasNodeContainer.vue'
  import CanvasNodeOption from './CanvasNodeOption.vue'
  import CanvasToolbar from './CanvasToolbar.vue'
  import CanvasZoombar from './CanvasZoombar.vue'
  import * as Util from '../util.js'

  export default {
    components: {
      'x-contextmenu': CanvasContextmenu,
      'x-canvas-node-container': CanvasNodeContainer,
      'x-canvas-node-options': CanvasNodeOption,
      'x-canvas-toolbar': CanvasToolbar,
      'x-canvas-zoombar': CanvasZoombar
    },
    data () {
      return {
        // 画布
        canvas: {
          width: 0,
          height: 0
        },
        // 新增节点信息
        newNodeInfo: {},
        // 新增线条信息
        newLinkInfo: null,
        // 正在画的线条信息
        link: {
          linkKey: '',
          // 画线状态
          drawing: false,
          // 开始port信息
          startPort: {
            nodeKey: '',
            x: null,
            y: null
          },
          // 结束port信息
          stopPort: {
            nodeKey: '',
            x: null,
            y: null
          }
        },
        // 右键菜单
        contextmenu: {
          // 是否启用
          isEnable: true,
          isShow: false,
          positionX: 0,
          positionY: 0,
          type: 'canvas',
          nodeInfo: {
            nodeKey: null
          },
          linkInfo: {
            linkKey: null
          }
        },
        // 虚拟格子
        grid: {
          // 各种配置信息
          config: {
            // 宽
            width: 10,
            // 高
            height: 10,
            // 对角线
            diagonal: 14
          },
          // 格子列表
          list: [],
          // 可用的格子
          openList: [],
          // 关闭的格子
          closeList: [],
          // 各个路径，每个路径会包含所占用的各种
          pathList: []
        }
      }
    },
    props: {
      // 初始化流程图数据
      data: {
        type: Object
      },
      toolbarCallback: {
        type: Function
      }
    },
    computed: {
      ...mapState({
        nodeList: state => state.flowchart.canvas.nodeList,
        linkList: state => state.flowchart.canvas.linkList,
        zoom: state => state.flowchart.canvas.zoombar.zoom
      })
    },
    watch: {
      'canvas.width': function (val) {
        let _t = this
        if (!_t.timerWidth) {
          _t.canvas = {
            ..._t.canvas,
            width: val
          }
          _t.timerWidth = true
          setTimeout(function () {
            // TODO 此处应该重新去初始化格子
            _t.timerWidth = false
          }, 400)
        }
      },
      'canvas.height': function (val) {
        let _t = this
        if (!_t.timerHeight) {
          _t.canvas = {
            ..._t.canvas,
            height: val
          }
          _t.timerHeight = true
          setTimeout(function () {
            // TODO 此处应该重新去初始化格子
            _t.timerHeight = false
          }, 400)
        }
      },
      data: function () {
        let _t = this
        if (_t.data && _t.data.hasOwnProperty('emptyFlag') && _t.data.emptyFlag) {
          // 清空画布
          _t.$store.dispatch('emptyFlowchartCanvas')
        } else {
          if (_t.data && _t.data.hasOwnProperty('nodeList')) {
            // 分发action 设置nodeList数据
            _t.$store.dispatch('setFlowchartCanvasNodeList', _t.data.nodeList)
          }
          if (_t.data && _t.data.hasOwnProperty('nodeList')) {
            // 分发action 设置linkList数据
            _t.$store.dispatch('setFlowchartCanvasLinkList', _t.data.linkList)
          }
        }
      }
    },
    methods: {
      // 画布click
      canvasClick: function (event) {
        let _t = this
        // 分发action 更新contextmenu数据
        _t.$store.dispatch('updateFlowchartContextmenu', {
          ..._t.contextmenu,
          isShow: false
        })
      },
      // 画布rightClick
      canvasRightClick: function (event) {
        let _t = this
        let offsetX
        let offsetY

        if (typeof event.target.className === 'string' && event.target.className.indexOf('canvas-node-box') > -1) {
          offsetX = parseInt(event.target.style.left) + parseInt(event.offsetX)
          offsetY = parseInt(event.target.style.top) + parseInt(event.offsetY)
        } else {
          offsetX = parseInt(event.offsetX)
          offsetY = parseInt(event.offsetY)
        }

        _t.contextmenu = {
          ..._t.contextmenu,
          isShow: true,
          positionX: offsetX,
          positionY: offsetY
        }
        // 分发action 更新contextmenu数据
        _t.$store.dispatch('updateFlowchartContextmenu', _t.contextmenu)
      },
      // 节点drop
      dropHandle: function (event) {
        let _t = this
        // 获取节点数据
        let nodeInfo = JSON.parse(event.dataTransfer.getData('Text'))
        // 如果存在则退出
        if (_t.nodeList[nodeInfo.nodeKey]) {
          return
        }
        let offsetX = event.offsetX
        let offsetY = event.offsetY
        let style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'

        // 处理id
        nodeInfo['baseId'] = nodeInfo['id']
        nodeInfo['id'] = 'canvas-' + nodeInfo['id']
        // 处理样式
        nodeInfo['style'] = style
        // 处理拖拽
        nodeInfo['draggable'] = true
        // 初始化端口状态 linkedPortName
        nodeInfo['linkedPortName'] = {
          top: [],
          right: [],
          bottom: [],
          left: []
        }
        // 初始化节点上连接的线条 linkKey
        nodeInfo['linkKey'] = {}
        // 节点索引
        let countNode = 0
        for (let nodeKey in _t.nodeList) {
          if (nodeKey && _t.nodeList[nodeKey]) {
            countNode++
          }
        }
        nodeInfo['index'] = countNode
        // 节点状态
        nodeInfo['status'] = ''

        _t.nodeList[nodeInfo.nodeKey] = nodeInfo
        // 分发action 更新nodeList 数据
        _t.$store.dispatch('updateFlowchartCanvasNodeList', _t.nodeList)
        // 分发action，更新画布状态
        _t.$store.dispatch('updateFlowchartCanvasStatus', 'editing')
        // TODO 获取节点在grid中的坐标
//        let nodePositionOnGrid = Util.grid.getPositionOnGrid(nodeInfo.nodeKey, {
//          x: event.clientX,
//          y: event.clientY
//        })
      },
      // 开始画线
      renderLinkStart: function (event) {
        let _t = this
        let port = Util.closest(event.target, '.node-port')
        let nodeItem = event.target.parentNode
        let nodeKey = nodeItem && nodeItem.attributes['nodeKey'] ? nodeItem.attributes['nodeKey'].value : null
        let linkKey = 'link-' + ((new Date()).getTime())
        if (port) {
          let portName = port.attributes.name.value
          let nodeWidth = parseInt(nodeItem.offsetWidth)
          let nodeHeight = parseInt(nodeItem.offsetHeight)
          let offsetX
          let offsetY
          switch (portName) {
            case 'top':
              offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
              offsetY = parseInt(nodeItem.style.top)
              break
            case 'right':
              offsetX = parseInt(nodeItem.style.left) + nodeWidth
              offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
              break
            case 'bottom':
              offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
              offsetY = parseInt(nodeItem.style.top) + nodeHeight
              break
            case 'left':
              offsetX = parseInt(nodeItem.style.left)
              offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
              break
          }
          // 更新当前线条信息
          _t.link = {
            drawing: true,
            linkKey: linkKey,
            config: {},
            startPort: {
              nodeKey: nodeKey,
              portName: portName,
              nodeWidth: nodeWidth,
              nodeHeight: nodeHeight,
              x: offsetX,
              y: offsetY
            },
            stopPort: null
          }
        } else {
          // 更新当前线条信息
          _t.link = {
            linkKey: linkKey,
            drawing: false,
            startPort: null,
            stopPort: null
          }
        }

        if (_t.link.drawing) {
          _t.linkList[_t.link.linkKey] = _t.link
          // 分发action 更新linkList 数据
          _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
        }
      },
      // 画线
      renderLink: function (event) {
        let _t = this
        if (_t.link.drawing) {
          // 端点
          let port = Util.closest(event.target, '.node-port')
          let nodeItem = Util.closest(event.target, '.canvas-node')
          // 初始化线条
          if (!_t.link.renderIng) {
            _t.link = {
              ..._t.link,
              renderIng: true,
              path: {}
            }
          }
          // 获取鼠标位置信息，实时更新路径坐标
          // 端点附近的坐标不存入path
          if (port) {
            if (nodeItem) {
              let portName = port.attributes.name.value
              let nodeWidth = parseInt(nodeItem.offsetWidth)
              let nodeHeight = parseInt(nodeItem.offsetHeight)
              let offsetX
              let offsetY
              switch (portName) {
                case 'top':
                  offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
                  offsetY = parseInt(nodeItem.style.top)
                  break
                case 'right':
                  offsetX = parseInt(nodeItem.style.left) + nodeWidth
                  offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
                  break
                case 'bottom':
                  offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
                  offsetY = parseInt(nodeItem.style.top) + nodeHeight
                  break
                case 'left':
                  offsetX = parseInt(nodeItem.style.left)
                  offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
                  break
              }

              _t.link.path = {
                x: offsetX,
                y: offsetY
              }
            } else {
              _t.link.path = {
                x: parseInt(event.offsetX),
                y: parseInt(event.offsetY)
              }
            }
          } else {
            // 注意端点的坐标此时不存入
            if (!nodeItem) {
              _t.link.path = {
                x: parseInt(event.offsetX),
                y: parseInt(event.offsetY)
              }
            }
          }
          _t.linkList[_t.link.linkKey] = _t.link
          // 分发action 更新linkList 数据
          _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
        }
      },
      // 结束画线
      renderLinkStop: function (event) {
        // 存在结束端点后生成一条有效的link, 此时需要给node绑上link-key
        let _t = this
        if (_t.link.drawing) {
          let port = Util.closest(event.target, '.node-port')
          let nodeItem = Util.closest(event.target, '.canvas-node')
          let nodeKey = nodeItem && nodeItem.attributes['nodeKey'] ? nodeItem.attributes['nodeKey'].value : null

          if (port && _t.link.startPort.nodeKey !== nodeKey) {
            if (port.className.indexOf('linked') === -1) {
              port.className += ' linked'
            }
            let portName = port.attributes.name.value
            let nodeWidth = parseInt(nodeItem.offsetWidth)
            let nodeHeight = parseInt(nodeItem.offsetHeight)
            let offsetX
            let offsetY
            switch (portName) {
              case 'top':
                offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
                offsetY = parseInt(nodeItem.style.top) - 25
                break
              case 'right':
                offsetX = parseInt(nodeItem.style.left) + nodeWidth + 25
                offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
                break
              case 'bottom':
                offsetX = parseInt(nodeItem.style.left) + parseInt(nodeWidth / 2)
                offsetY = parseInt(nodeItem.style.top) + nodeHeight + 25
                break
              case 'left':
                offsetX = parseInt(nodeItem.style.left) - 25
                offsetY = parseInt(nodeItem.style.top) + parseInt(nodeHeight / 2)
                break
            }
            // 更新当前线条信息
            _t.link = {
              ..._t.link,
              drawing: false,
              renderIng: false,
              stopPort: {
                nodeKey: nodeKey,
                portName: portName,
                nodeWidth: nodeWidth,
                nodeHeight: nodeHeight,
                x: offsetX,
                y: offsetY
              }
            }
          } else {
            // 更新当前线条信息
            _t.link = {
              ..._t.link,
              remove: true,
              drawing: false,
              renderIng: false,
              startPort: null,
              stopPort: null
            }
          }
          _t.linkList[_t.link.linkKey] = _t.link

          if (_t.link.remove) {
            delete _t.linkList[_t.link.linkKey]
          } else {
            _t.nodeList[_t.link.startPort.nodeKey]['linkedPortName'][_t.link.startPort.portName].push(_t.link.linkKey)
            _t.nodeList[_t.link.stopPort.nodeKey]['linkedPortName'][_t.link.stopPort.portName].push(_t.link.linkKey)
            // 关联linkKey
            _t.nodeList[_t.link.startPort.nodeKey]['linkKey'][_t.link.linkKey] = true
            _t.nodeList[_t.link.stopPort.nodeKey]['linkKey'][_t.link.linkKey] = true
          }

          // 分发action 更新linkList 数据
          _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
          // 更新节点linkedPortName
          _t.$store.dispatch('updateFlowchartCanvasNodeList', _t.nodeList)
        }
      },
      wheelHandle: function () {
        let _t = this
        let tmpZoom = _t.zoom + event.deltaY / 1000
        // 更新zoom
        _t.$store.dispatch('updateFlowchartCanvasZoom', {
          zoom: tmpZoom
        })
      }
    },
    mounted: function () {
      let _t = this
      let el = _t.$el
      // 更新画布信息
      _t.canvas = {
        ..._t.canvas,
        width: el.clientWidth,
        height: el.clientHeight
      }
      // TODO 组件挂载到实例后虚拟格子
      // 初始化格子
//      _t.grid.list = Util.grid.init(
//        {
//          width: _t.canvas.width,
//          height: _t.canvas.height
//        },
//        _t.grid.config
//      )
      // 监听窗口大小调整
      window.onresize = () => {
        return (() => {
          let canvas = document.querySelector('.flowchart-canvas')
          if (canvas) {
            _t.canvas = {
              ..._t.canvas,
              width: canvas.clientWidth,
              height: canvas.clientHeight
            }
            // 重新计算格子
//            _t.grid.list = Util.grid.init(
//              {
//                width: _t.canvas.width,
//                height: _t.canvas.height
//              },
//              _t.grid.config
//            )
          }
        })()
      }
    }
  }
</script>

