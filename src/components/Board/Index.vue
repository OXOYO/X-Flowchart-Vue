/**
* Created by OXOYO on 2018/3/21.
*
* 画板组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_board {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: inline-block;
    z-index: 1000;
    overflow: hidden;

    &.draw-guides_x {
      cursor: row-resize;
    }
    &.draw-guides_y {
      cursor: col-resize;
    }

    .block_body {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1000;
      background-image: linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0), linear-gradient(45deg, #f5f5f5 25%, transparent 0, transparent 75%, #f5f5f5 0);
      background-position: 0 0, 10px 10px;
      background-size: 20px 20px;
      overflow: auto;

      .list_item {
        height: 20px;
        line-height: 20px;
        padding: 10px;
        margin: 5px;
        border-bottom: 1px solid;
      }
    }
  }
  .canvas {
    position: absolute;
    z-index: 2000;
    top: 100px;
    left: 50%;
    margin-left: -450px;
    width: 900px;
    height: 1000px;
    background: #fff;
  }
</style>

<template>
  <div
    id="xfc_board"
    :class="{'xfc_board': true, 'draw-guides_x': guides.status.move && guides.type === 'x', 'draw-guides_y': guides.status.move && guides.type === 'y' }"
    @dblclick.stop.prevent="toggleExpand"
    @contextmenu.stop.prevent="handleRightClick($event)"
    @mousemove="handleMouseMoveOnBoard($event)"
    @mouseup.stop.prevent="handleMouseUpOnBoard($event)"
  >
    <div class="block_body">
      <XFCCanvas></XFCCanvas>
    </div>
    <slot name="toolBar" v-if="config.toolBar.enable">
      <XFCToolBar :config="config.toolBar" :expand="isExpand"></XFCToolBar>
    </slot>
    <slot name="scale" v-if="config.scale.enable">
      <XFCScale :config="config.scale" :width="boardWidth" :height="boardHeight"></XFCScale>
    </slot>
  </div>
</template>

<script>
import XFCToolBar from './components/ToolBar.vue'
import XFCScale from './components/Scale.vue'
import XFCCanvas from './components/Canvas.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XFCBoard',
  components: {
    XFCToolBar,
    XFCScale,
    XFCCanvas
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true,
      // 画板宽度
      boardWidth: 0,
      // 画板高度
      boardHeight: 0,
      // 缩放级别
      zoom: {
        // 当前缩放级别 0: 未缩放 1: 放大一级 -1: 缩小一级
        current: 0,
        max: 5,
        min: -5
      },
      // 参考线
      guides: {
        type: '',
        status: {
          start: false,
          move: false,
          end: false
        },
        position: {
          start: {
            x: 0,
            y: 0
          }
        }
      }
    }
  },
  methods: {
    toggleExpand: function () {
      let _t = this
      _t.isExpand = !_t.isExpand
      // 广播事件
      utils.bus.$emit('XFC/expand/toggle/all', _t.isExpand)
    },
    // 桌面右键点击
    handleRightClick: function (event) {
      let _t = this
      let xfcEl = document.querySelector('#xfc')
      let xVal
      let yVal
      if (xfcEl) {
        xVal = event.clientX - xfcEl.offsetLeft
        yVal = event.clientY - xfcEl.offsetTop
      } else {
        xVal = event.offsetX
        yVal = event.offsetY
      }
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: 'XFC_board',
        list: [
          {
            name: 'expand',
            icon: {
              type: 'icon-expand',
              style: '',
              category: 'iconfont'
            },
            text: '展开',
            enable: _t.isExpand,
            action: {
              type: 'bus',
              handler: 'XFC/expand/toggle/all',
              params: false
            }
          },
          {
            name: 'fold',
            icon: {
              type: 'icon-fold',
              style: '',
              category: 'iconfont'
            },
            text: '折叠',
            enable: !_t.isExpand,
            action: {
              type: 'bus',
              handler: 'XFC/expand/toggle/all',
              params: true
            }
          },
          {
            name: 'showGuides',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XFC/scale/guides/toggle'
            }
          },
          {
            name: 'showToolTip',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '显示 / 隐藏参考线坐标',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XFC/scale/guides/toolTip/toggle'
            }
          },
          {
            name: 'clear',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: '清空编辑器画板',
            enable: false,
            action: {
              type: 'bus',
              // FIXME 需添加confirm 回调操作
              handler: 'XFC/board/clear'
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XFC/contextMenu/show', contextMenuInfo)
    },
    handleMouseMoveOnBoard: function (event) {
      let _t = this
      // 判断是否开始拖拽参考线
      if (_t.guides.status.start) {
        // 更新标识
        _t.guides.status.move = true
        // console.log('handleMouseMoveOnBoard type', _t.guides.type)
        // 依据移动距离判断是否可以开始画线
        if (_t.guides.condition && _t.guides.condition.draw && typeof _t.guides.condition.draw === 'function') {
          let xfcEl = document.querySelector('#xfc')
          let currentPosition
          if (xfcEl) {
            currentPosition = {
              x: event.clientX - xfcEl.offsetLeft,
              y: event.clientY - xfcEl.offsetTop
            }
          } else {
            currentPosition = {
              x: event.offsetX,
              y: event.offsetY
            }
          }
          // console.log('currentPosition', 'x:', currentPosition.x, 'y:', currentPosition.y, xfcEl.offsetTop)
          if (_t.guides.condition.draw(_t.guides.type, currentPosition, _t.guides.position.start)) {
            _t.guides.position['move'] = currentPosition
            utils.bus.$emit('XFC/scale/guides/drag/move', _t.guides)
          }
        }
      }
    },
    handleMouseUpOnBoard: function (event) {
      let _t = this
      // 更新标识
      _t.guides.status.start = false
      _t.guides.status.move = false
      _t.guides.status.end = true
      utils.bus.$emit('XFC/scale/guides/drag/stop', _t.guides)
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFC/expand/toggle/all', function (val) {
      _t.isExpand = val
    })
    utils.bus.$on('XFC/scale/guides/drag/start', function (info) {
      _t.guides = info
    })
  },
  mounted: function () {
    let _t = this
    _t.boardWidth = _t.$el.offsetWidth
    _t.boardHeight = _t.$el.offsetHeight
    console.log('boardWidth', _t.$el.offsetWidth, _t.$el.offsetHeight)
  }
}
</script>
