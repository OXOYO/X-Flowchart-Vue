/**
* Created by OXOYO on 2019/6/28.
*
* MaterialsEditor 物料编辑器
*/

<style scoped lang="less" rel="stylesheet/less">
  .materials-editor {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
    background: #f8f9fa;
  }
</style>

<template>
  <div class="materials-editor">
    <ToolBar></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelLeft></PanelLeft>
    <PanelRight></PanelRight>
    <!--<ContextMenu></ContextMenu>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ToolBar from './containers/ToolBar'
  import Sketchpad from './containers/Sketchpad'
  import PanelLeft from './containers/PanelLeft'
  import PanelRight from './containers/PanelRight'
  // import ContextMenu from './components/ContextMenu'
  import G6 from '@/global/lib/g6/index'
  import Minimap from '@antv/g6/build/minimap'
  import Grid from '@antv/g6/build/grid'
  import screenfull from 'screenfull'
  import config from './config/index'

  export default {
    name: 'MaterialsEditor',
    components: {
      ToolBar,
      Sketchpad,
      PanelLeft,
      PanelRight
      // ,
      // ContextMenu
    },
    data () {
      return {
        editorInfo: {},
        defInfo: {
          // 编辑器状态：add || edit || preview
          status: 'add'
        },
        editor: null,
        isFullScreen: false,
        clipboard: {
          data: null,
          // 粘贴计数器
          count: 0
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentItem'
      ])
    },
    methods: {
      init () {
        let _t = this
        let el = _t.$el
        // 画板
        let sketchpad = el.querySelector('#sketchpad')
        // 导航器
        let navigator = el.querySelector('#navigator')
        console.log('sketchpad', sketchpad, sketchpad.clientWidth, sketchpad.clientHeight)
        console.log('navigator', navigator, navigator.clientWidth, navigator.clientHeight)
        let size = [
          navigator.clientWidth,
          parseInt(navigator.clientWidth * sketchpad.clientHeight / sketchpad.clientWidth)
        ]
        const minimap = new Minimap({
          container: navigator,
          type: 'keyShape',
          size: size
        })
        const grid = new Grid()
        // 生成编辑器实例
        _t.editor = new G6.Graph({
          plugins: [
            minimap,
            grid
          ],
          container: sketchpad,
          width: sketchpad.clientWidth,
          height: sketchpad.clientHeight,
          fitViewPadding: 20,
          // 模式
          modes: {
            edit: [
              'zoom-canvas',
              'drag-canvas',
              'click-select',
              {
                type: 'node-control',
                updateEdge: true,
                enableNodeLabel: true,
                enableEdgeLabel: true
              }
            ],
            // 只读，
            preview: ['drag-canvas', 'zoom-canvas']
          },
          // 节点样式
          nodeStyle: {
            // 默认样式
            default: {
              fill: '#FFFFFF',
              fillOpacity: 1,
              stroke: '#000000',
              strokeOpacity: 1,
              cursor: 'move'
            },
            // active 状态下的样式
            active: {},
            // selected 状态下的样式
            selected: {},
            // hover 状态下的样式
            hover: {}
          },
          edgeStyle: {
            default: {
              stroke: '#000000',
              strokeOpacity: 1,
              // 扩展响应范围
              lineAppendWidth: 10,
              cursor: 'pointer'
            }
          }
        })
        // 挂载全局命名空间
        _t.editor.$X = {
          ...config.$X
        }
        // 挂载G6配置
        _t.editor.$C = G6.$C
        // 设置模式为编辑
        _t.editor.setMode('edit')
        // 绑定事件
        _t.editor.on('canvas:mousedown', _t._canvasMousedown)
        // 绑定事件
        _t.editor.on('canvas:mouseup', _t._canvasMouseup)
        // _t.editor.on('click', _t._editorClick)
        // _t.editor.on('node:click', _t._nodeClick)
        _t.editor.on('node:mousedown', _t._nodeMousedown)
        _t.editor.on('node:mouseover', _t._nodeHover)
        _t.editor.on('node:mouseout', _t._nodeOut)
        // _t.editor.on('node:contextmenu', _t._nodeContextmenu)
        _t.editor.on('edge:mousedown', _t._edgeMousedown)
        _t.editor.on('editor:getItem', function (data) {
          // console.log('editor:getItem', JSON.stringify(data))
          _t.$store.commit('editor/currentItem/update', data)
        })
        _t.editor.on('editor:setItem', function (data) {
          console.log('editor:setItem', JSON.stringify(data))
          let item = _t.editor.findById(data.id)
          if (item) {
            _t.editor.updateItem(item, data.model)
            _t.editor.paint()
          }
        })
      },
      _canvasMousedown () {
        let _t = this
        console.log('_canvasMousedown ')
        _t.doClearAllStates()
      },
      _canvasMouseup () {
        // let _t = this
        console.log('_canvasMouseup')
        // _t.editor.setMode('edit')
      },
      _editorClick (event) {
        console.log('_editorClick', event)
      },
      _nodeClick (event) {
        // let _t = this
        console.log('_nodeClick', event)
        // _t.editor.setItemState(event.item, 'active', true)
      },
      _nodeMousedown (event) {
        let _t = this
        _t.doClearAllStates()
        _t.editor.setItemState(event.item, 'active', true)
      },
      _nodeHover (event) {
        let _t = this
        // FIXME 当节点未激活时才可设置hover true状态
        if (!event.item.hasState('active')) {
          _t.editor.setItemState(event.item, 'hover', true)
        }
      },
      _nodeOut (event) {
        let _t = this
        _t.editor.setItemState(event.item, 'hover', false)
      },
      _nodeContextmenu (event) {
        console.log('_nodeContextmenu', event)
      },
      _edgeMousedown (event) {
        let _t = this
        _t.doClearAllStates()
        console.log('_edgeMousedown', event)
        if (event.item && !event.item.destroyed) {
          _t.editor.setItemState(event.item, 'active', !event.item.hasState('active'))
        }
      },
      // 清除所有状态
      doClearAllStates () {
        let _t = this
        if (!_t.editor) {
          return
        }
        // 批量操作时关闭自动重绘，以提升性能
        _t.editor.setAutoPaint(false)
        _t.editor.getNodes().forEach(function (node) {
          _t.editor.clearItemStates(node, ['active', 'hover', 'selected'])
        })
        _t.editor.getEdges().forEach(function (edge) {
          _t.editor.clearItemStates(edge, ['active', 'hover', 'selected'])
        })
        _t.editor.paint()
        _t.editor.setAutoPaint(true)
      },
      doCopy () {
        let _t = this
        // 目前只支持节点的复制，不支持边的复制，边只能通过拖拽生成
        if (_t.currentItem && _t.currentItem.type === 'node') {
          _t.clipboard = {
            data: _t.currentItem,
            count: 0
          }
        }
      },
      doPaste () {
        let _t = this
        let item = _t.clipboard.data
        _t.clipboard.count++
        console.log('item', item)
        if (item) {
          if (item.type === 'node') {
            let node = {
              ...item.model,
              id: G6.Util.uniqueId(),
              // 更新坐标，添加一定偏移量，防止重叠
              x: item.model.x + 10 * _t.clipboard.count,
              y: item.model.y + 10 * _t.clipboard.count
            }
            _t.editor.addItem('node', node)
          }
        }
      },
      doZoom (info, position) {
        let _t = this
        // 缩放率
        let ratio = 1
        let center
        if (position) {
          center = position
        } else {
          let el = _t.$el
          let sketchpad = el.querySelector('#sketchpad')
          center = {
            x: sketchpad.clientWidth / 2,
            y: sketchpad.clientHeight / 2
          }
        }
        if (info.name === 'zoom') {
          _t.editor.zoomTo(info.data, center)
        } else if (['zoomIn', 'zoomOut'].includes(info.name)) {
          let currentRatio = _t.editor.getZoom()
          let step = 0.1
          ratio = info.name === 'zoomOut' ? currentRatio - step : currentRatio + step
          ratio = ratio.toFixed(1)
          // 缩放视窗窗口到一个固定比例
          _t.editor.zoomTo(ratio, center)
        } else if (info.name === 'actualSize') {
          ratio = 1
          _t.editor.zoomTo(ratio, center)
        }
      },
      doAddNode (info) {
        let _t = this
        console.log('doAddNode', info)
        let node = {
          id: G6.Util.uniqueId(),
          shape: info.shape,
          label: '',
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 14
            }
          },
          width: info.width,
          height: info.height,
          minWidth: info.minWidth,
          minHeight: info.minHeight,
          // FIXME 定义锚点坐标
          anchorPoints: info.anchorPoints,
          // 定义shapeControl
          shapeControl: info.shapeControl
        }
        // 广播事件，通过自定义交互 node-control 添加节点
        _t.editor.emit('editor:addNode', node)
      },
      handleToolTrigger (info) {
        let _t = this
        switch (info.name) {
          case 'copy':
            _t.doCopy()
            break
          case 'paste':
            _t.doPaste()
            break
          case 'zoom':
          case 'zoomIn':
          case 'zoomOut':
          case 'actualSize':
            _t.doZoom(info)
            break
          case 'fit':
            _t.editor.fitView()
            break
          case 'preview':
            _t.editor.setMode('preview')
            break
          case 'edit':
            _t.editor.setMode('edit')
            break
          case 'fill':
            _t.editor.$X.fill = info.data
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                let { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    fill: info.data
                  }
                })
              }
            })
            break
          case 'lineColor':
            _t.editor.$X.lineColor = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                let { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    stroke: info.data
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                let { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    stroke: info.data
                  }
                })
              }
            })
            break
          case 'lineWidth':
            _t.editor.$X.lineWidth = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                let { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    lineWidth: info.data
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                let { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    lineWidth: info.data
                  }
                })
              }
            })
            break
          case 'lineStyle':
            let lineConfig = _t.editor.$C.line
            _t.editor.$X.lineStyle = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                let { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    ...lineConfig.type[info.data]
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                let { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    ...lineConfig.type[info.data]
                  }
                })
              }
            })
            break
          case 'lineType':
            _t.editor.$X.lineType = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                _t.editor.updateItem(edge, {
                  shape: info.data
                })
                _t.editor.refreshItem(edge)
              }
            })
            break
          case 'startArrow':
          case 'endArrow':
            _t.editor.$X[info.name] = info.data
            // TODO 根据端点类型更新边
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                let { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    [info.name]: info.data
                  }
                })
              }
            })
            break
          case 'clear':
            console.log('_t.$Modal', _t.$Modal)
            _t.$Modal.confirm({
              title: _t.$t('L10200'),
              // 确认清空画布？
              content: _t.$t('L10201'),
              onOk: function () {
                _t.editor.clear()
                _t.editor.paint()
              }
            })
            break
          case 'toFront':
          case 'toBack':
            if (info.data.hasOwnProperty('id') && info.data.id) {
              let item = _t.editor.findById(info.data.id)
              if (item && item[info.name]) {
                // 执行操作
                item[info.name]()
                _t.editor.paint()
              }
            }
            break
          case 'fullscreen':
            if (screenfull.enabled) {
              screenfull.toggle()
            }
            break
          case 'download':
            let fileName = _t.$X.config.system.name + '_' + _t.$X.utils.filters.formatDate(new Date(), 'YYYYMMDDhhmmss')
            if (info.data === 'image') {
              _t.editor.downloadImage(fileName)
            } else if (info.data === 'json') {
              let content = _t.editor.save()
              content = JSON.stringify(content)
              let blob = new Blob([content], {
                type: 'application/json;charset=UTF-8'
              })
              let url = URL.createObjectURL(blob)
              let link = document.createElement('a')
              link.textContent = 'download json'
              link.href = url
              link.download = fileName
              link.click()
              // no longer need to read the blob so it's revoked
              URL.revokeObjectURL(url)
            }
            break
        }
      },
      initInfo (data = {}) {
        let _t = this
        _t.editorInfo = {
          ..._t.defInfo,
          ...data
        }
      },
      ondblclickPad () {
        let _t = this
        _t.$X.utils.bus.$emit('editor/pad/dblclick')
      }
    },
    created () {
      let _t = this
      // 处理操作类型，初始化编辑器
      _t.initInfo()
      _t.$nextTick(_t.init)

      _t.$X.utils.bus.$on('editor/add/node', _t.doAddNode)
      _t.$X.utils.bus.$on('editor/tool/trigger', _t.handleToolTrigger)
      _t.$X.utils.bus.$on('editor/currentItem/update', function (data) {
        _t.editor.emit('editor:setItem', data)
      })
    }
  }
</script>
