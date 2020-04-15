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
  <div class="materials-editor" @click="handleEditorClick">
    <ToolBar></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelLeft></PanelLeft>
    <PanelRight></PanelRight>
    <PreviewModel></PreviewModel>
    <ContextMenu></ContextMenu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ToolBar from './containers/ToolBar'
  import Sketchpad from './containers/Sketchpad'
  import PanelLeft from './containers/PanelLeft'
  import PanelRight from './containers/PanelRight'
  import PreviewModel from './containers/PreviewModel'
  import ContextMenu from './containers/ContextMenu'
  import utils from '@/global/g6/utils'
  // 扩展了节点、边的G6
  import G6 from '@/global/g6/index'
  // 导航器
  import Minimap from '@antv/g6/build/minimap'
  // 自定义栅格插件
  import XGrid from '@/global/g6/plugins/XGrid'
  // 背景图
  import XBackground from '@/global/g6/plugins/XBackground'
  // 全屏
  import screenfull from 'screenfull'
  // 热键
  import Mousetrap from 'mousetrap'
  import config from './config/index'

  export default {
    name: 'MaterialsEditor',
    components: {
      ToolBar,
      Sketchpad,
      PanelLeft,
      PanelRight,
      PreviewModel,
      ContextMenu
    },
    data () {
      return {
        editorInfo: {},
        defInfo: {
          // 编辑器状态：add || edit || preview
          status: 'add'
        },
        editor: null,
        mode: 'edit',
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
        'currentItem',
        'toolList',
        'log'
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
        let size = [
          navigator.clientWidth,
          parseInt(navigator.clientWidth * sketchpad.clientHeight / sketchpad.clientWidth)
        ]
        const minimap = new Minimap({
          container: navigator,
          type: 'keyShape',
          size: size
        })
        const grid = new XGrid()
        const background = new XBackground()
        // 生成编辑器实例
        _t.editor = new G6.Graph({
          plugins: [
            minimap,
            grid,
            background
          ],
          container: sketchpad,
          width: sketchpad.clientWidth,
          height: sketchpad.clientHeight,
          fitView: true,
          fitViewPadding: 20,
          // 模式
          modes: {
            edit: [
              // 'zoom-canvas',
              // 'drag-canvas',
              // 'click-select',
              {
                type: 'node-control',
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
                    dragEdge: true
                  },
                  // 是否启用对齐线
                  alignLine: {
                    enable: true,
                    style: {
                      stroke: '#FFA500',
                      lineWidth: 1
                    }
                  }
                }
              }
            ],
            // 只读，
            preview: [
              'zoom-canvas',
              'drag-canvas',
              'preview-canvas'
            ]
          },
          // 节点交互样式
          nodeStateStyles: {
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
          // 边交互样式
          edgeStateStyles: {
            default: {
              stroke: '#000000',
              strokeOpacity: 1,
              // 扩展响应范围
              lineAppendWidth: 10,
              cursor: 'pointer'
            }
          },
          // 分组样式
          groupType: 'rect',
          groupStyle: {
            default: {
              lineWidth: 1,
              stroke: '#29B6F2',
              // lineDash: [ 5, 5 ],
              strokeOpacity: 1,
              fill: '#29B6F2',
              fillOpacity: 0.1,
              opacity: 1,
              minDis: 0,
              maxDis: 0
            }
          }
        })
        // 挂载编辑器$X命名空间，用于Vue组件与Graph之间传值
        _t.editor.$X = {
          ...config.$X
        }
        // 挂载G6配置
        _t.editor.$C = G6.$C
        // 设置模式为编辑
        _t.doSetMode('edit')
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
          _t.$store.commit('editor/currentItem/update', data)
        })
        _t.editor.on('editor:setItem', function (data) {
          data.forEach((item, index) => {
            let node = _t.editor.findById(item.id)
            if (!index) {
              // 更新第一个节点
              _t.editor.updateItem(node, item.model)
            } else {
              // FIXME 更新同组节点，只更新样式部分
              _t.editor.updateItem(node, {
                style: data[0].model.style
              })
            }
          })
          _t.editor.paint()
        })
        _t.editor.on('editor:contextmenu', function (data) {
          _t.$X.utils.bus.$emit('editor/contextmenu/open', data)
        })
        _t.editor.on('editor:record', function (from) {
          console.log('editor:record from', from)
          // 更新操作日志
          _t.$store.commit('editor/log/update', {
            action: 'record',
            data: {
              time: new Date(),
              content: _t.editor.save()
            }
          })
        })
        // 绑定热键
        _t.bindShortcuts()
        // 绑定unload
        _t.bindUnload()
        // 更新编辑器实例
        _t.$store.commit('editor/instance/update', _t.editor)
      },
      _canvasMousedown () {
        let _t = this
        console.log('_canvasMousedown ')
        _t.doClearAllStates()
        // 更新currentItem
        _t.$store.commit('editor/currentItem/update', [])
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
      doZoom (info, position) {
        let _t = this
        // 缩放率
        let ratio = 1
        let center
        if (position) {
          center = position
        } else {
          let width = _t.editor.get('width')
          let height = _t.editor.get('height')
          center = {
            x: width / 2,
            y: height / 2
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
        let node = {
          id: G6.Util.uniqueId(),
          shape: info.shape,
          label: info.defaultLabel,
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 16,
              stroke: '#000000'
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
      doSetMode (name) {
        let _t = this
        _t.mode = name
        _t.editor.setMode(name)
        // 更新toolList
        let toolList
        toolList = _t.toolList.map(item => {
          if (item.hasOwnProperty('enableMode') && Array.isArray(item.enableMode)) {
            item.enable = item.enableMode.includes(name)
          }
          if (item.hasOwnProperty('disabledMode') && Array.isArray(item.disabledMode)) {
            item.disabled = !item.disabledMode.includes(name)
          }
          return item
        })
        _t.$store.commit('editor/toolList/update', toolList)
      },
      handleToolTrigger (info) {
        let _t = this
        // 是否记录日志标识
        let isRecord = false
        switch (info.name) {
          case 'undo':
          case 'redo':
          case 'clearLog':
            // 更新操作日志
            _t.$store.commit('editor/log/update', {
              action: info.name
            })
            if (['undo', 'redo'].includes(info.name)) {
              _t.$nextTick(function () {
                if (_t.log.list.length) {
                  if (_t.log.current === 0) {
                    let data = _t.log.list[0]
                    if (data === null) {
                      // 清除
                      _t.editor.clear()
                      _t.editor.paint()
                    } else {
                      // 渲染
                      _t.editor.read(data.content)
                      _t.editor.paint()
                      // 缩放到实际大小
                      _t.doZoom({
                        name: 'actualSize'
                      })
                    }
                  } else {
                    let data = _t.log.list[_t.log.current]
                    // 渲染
                    _t.editor.read(data.content)
                    _t.editor.paint()
                    // 缩放到实际大小
                    _t.doZoom({
                      name: 'actualSize'
                    })
                  }
                }
              })
              // 更新currentItem
              _t.$store.commit('editor/currentItem/update', [])
            }
            break
          case 'copy':
            (() => {
              // FIXME 目前只支持节点的复制，不支持边的复制，边只能通过拖拽生成
              let data = _t.currentItem ? _t.currentItem.filter(item => item.type === 'node') : []
              _t.clipboard = {
                data,
                count: 0
              }
            })()
            break
          case 'paste':
            (() => {
              let data = _t.clipboard.data
              _t.clipboard.count++
              if (data.length) {
                data.forEach((item, index) => {
                  let model = item.model
                  // 计算坐标，添加一定偏移量，防止重叠
                  let x = model.x + 10 * _t.clipboard.count
                  let y = model.y + 10 * _t.clipboard.count
                  // 如果通过右键菜单触发的，则获取触发菜单时的canvas坐标
                  if (info && info.context === 'ContextMenu' && info.data) {
                    if (info.data.hasOwnProperty('canvasX')) {
                      x = model.x + info.data.canvasX - data[0].model.x
                    }
                    if (info.data.hasOwnProperty('canvasY')) {
                      y = model.y + info.data.canvasY - data[0].model.y
                    }
                  }
                  let node = {
                    ...model,
                    id: G6.Util.uniqueId(),
                    groupId: '',
                    x,
                    y
                  }
                  _t.editor.addItem('node', node)
                })
              }
            })()
            break
          case 'delete':
            // 删除逻辑
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                _t.editor.removeItem(node)
              }
            })
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                _t.editor.removeItem(edge)
              }
            })
            // 更新currentItem
            _t.$store.commit('editor/currentItem/update', [])
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
            _t.doSetMode(info.name)
            let previewData = {
              type: info.data,
              content: ''
            }
            if (info.data === 'image') {
              previewData.content = _t.editor.toDataURL()
            } else if (info.data === 'json') {
              previewData.content = _t.editor.save()
            }
            // 显示预览弹窗
            _t.$X.utils.bus.$emit('editor/previewModel/open', previewData)
            break
          case 'edit':
            _t.doSetMode(info.name)
            break
          case 'fill':
            _t.editor.$X.fill = info.data
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
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
                isRecord = true
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
                isRecord = true
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
                isRecord = true
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
                isRecord = true
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
          case 'lineDash':
            let edgeConfig = _t.editor.$C.edge
            _t.editor.$X.lineDash = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                let { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    ...edgeConfig.type[info.data]
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                let { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    ...edgeConfig.type[info.data]
                  }
                })
              }
            })
            break
          case 'lineType':
            _t.editor.$X.lineType = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
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
            // 根据端点类型更新边
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
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
            _t.$Modal.confirm({
              title: _t.$t('L10200'),
              // 确认清空画布？
              content: _t.$t('L10201'),
              onOk: function () {
                // 更新操作日志
                _t.$store.commit('editor/log/update', {
                  action: 'clear'
                })
                _t.editor.clear()
                _t.editor.paint()
              }
            })
            // 更新currentItem
            _t.$store.commit('editor/currentItem/update', [])
            break
          case 'toFront':
          case 'toBack':
            if (Array.isArray(info.data)) {
              info.data.forEach(data => {
                if (data.hasOwnProperty('id') && data.id) {
                  isRecord = true
                  let item = _t.editor.findById(data.id)
                  if (item && item[info.name]) {
                    // 执行操作
                    item[info.name]()
                    _t.editor.paint()
                  }
                }
              })
            }
            break
          case 'fullscreen':
            if (screenfull.enabled) {
              screenfull.toggle()
            }
            break
          case 'upload':
            _t.$Modal.confirm({
              title: _t.$t('L10200'),
              // 上传JSON数据将覆盖当前画布，确认上传？
              content: _t.$t('L10206'),
              onOk: function () {
                // 打开文件选择窗口
                let input = document.createElement('input')
                input.type = 'file'
                // 限定文件类型
                input.accept = '.json'
                input.click()
                input.onchange = function () {
                  let file = input.files[0]
                  // FileReader实例
                  let reader = new FileReader()
                  // 读取文件
                  reader.readAsText(file, 'UTF-8')
                  // 处理数据
                  reader.onload = function (event) {
                    try {
                      let fileString = event.target.result
                      let fileJson = JSON.parse(fileString)
                      // 清空画布
                      _t.editor.clear()
                      // 更新currentItem
                      _t.$store.commit('editor/currentItem/update', [])
                      // 设置数据
                      _t.editor.data(fileJson)
                      // 渲染
                      _t.editor.render()
                      _t.editor.getNodes().forEach(node => {
                          let model = node.getModel()
                          let radian = model.radian
                          let keyShape = node.getKeyShape()
                          keyShape.resetMatrix()
                          keyShape.rotate(radian)
                          let group = _t.editor.get('group')
                          // 更新shapeControl
                          utils.shapeControl.rotate(model, group, radian)
                          // 更新锚点
                          utils.anchor.rotate(model, group, radian)
                        })
                      // 加载数据后保存记录
                      // 更新操作日志
                      _t.$store.commit('editor/log/update', {
                        action: 'loadData',
                        data: {
                          time: new Date(),
                          content: _t.editor.save()
                        }
                      })
                    } catch (e) {
                      // 提示
                      _t.$Message.error(_t.$t('L10207'))
                      console.error('Editor Error:: upload JSON failed!', e)
                    }
                  }
                }
              }
            })
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
          case 'selectAll':
            let groupId = G6.Util.uniqueId()
            _t.editor.getNodes().forEach(node => {
              // 更新节点
              _t.editor.updateItem(node, {
                groupId
              })
              _t.editor.setItemState(node, 'active', true)
            })
            break
          case 'canvasBackground':
            switch (info.data) {
              case 'default':
                _t.editor.emit('background:reset')
                break
              case 'image':
                // 打开文件选择窗口
                let input = document.createElement('input')
                input.type = 'file'
                // 限定文件类型
                input.accept = 'image/png, image/jpeg, image/jpg'
                input.click()
                input.onchange = function () {
                  let file = input.files[0]
                  // FileReader实例
                  let reader = new FileReader()
                  // 读取图片
                  if (file) {
                    reader.readAsDataURL(file)
                    // 处理数据
                    reader.onload = function (event) {
                      try {
                        let imgFile = reader.result
                        _t.editor.emit('background:update', imgFile)
                      } catch (e) {
                        console.error('Editor Error:: update background failed!', e)
                      }
                    }
                  }
                }
                break
            }
            break
          case 'up':
          case 'down':
          case 'left':
          case 'right':
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                let model = node.getModel()
                let position = {
                  x: model.x,
                  y: model.y
                }
                switch (info.name) {
                  case 'up':
                    position.y--
                    break
                  case 'down':
                    position.y++
                    break
                  case 'left':
                    position.x--
                    break
                  case 'right':
                    position.x++
                    break
                }
                _t.editor.updateItem(node, position)
              }
            })
            break
        }
        if (isRecord) {
          // 记录操作日志
          _t.editor.emit('editor:record', 'handleToolTrigger')
        }
      },
      initInfo (data = {}) {
        let _t = this
        _t.editorInfo = {
          ..._t.defInfo,
          ...data
        }
      },
      bindShortcuts () {
        let _t = this
        _t.toolList.forEach(item => {
          if (item.enable && item.shortcuts) {
            Mousetrap.bind(item.shortcuts, function (e) {
              if (e.preventDefault) {
                e.preventDefault()
              } else {
                // internet explorer
                e.returnValue = false
              }
              _t.handleToolTrigger({
                name: item.name,
                data: {}
              })
              return false
            })
          }
        })
        // 绑定按键事件
        document.addEventListener('keyup', function () {
          _t.$X.utils.bus.$emit('editor/contextmenu/close')
        })
      },
      bindUnload () {
        window.onbeforeunload = function (event) {
          event.returnValue = false
          return false
        }
      },
      handleEditorClick () {
        let _t = this
        _t.$X.utils.bus.$emit('editor/contextmenu/close')
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
