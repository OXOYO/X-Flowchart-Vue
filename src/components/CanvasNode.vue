/**
* Created by OXOYO on 2017/4/11.
* 画布上的节点
*/

<style lang="less">
  .canvas-node {
    position: absolute;
    z-index: 1200;
    display: inline-block;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: #ffffff;

      &:hover,
      &.hover,
      &.active {

        .node-port {
          transform: translateX(0) scale(1);
          border: 1px solid #ffd042;
          box-shadow: 0 0 2px 2px #ffd042;
        }
      }
      &.active {
       box-shadow: 0 0 2px 2px #ffd042;
      }

      /*&.node-status-success {
        background: #00cc66;
      }
      &.node-status-fail {
        background: #ff3300;
      }
      &.node-status-running {
        background: #3399ff;
      }*/

    @keyframes scaleIcon{
      0% { transform: scale(1); opacity: 1; }
      /*40% { transform: scale(1); opacity: 1; }
      70% { transform: scale(1); opacity: 1; }
      100% { transform: scale(0); opacity: 0; }*/
      50% { transform: scale(0.5); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes rotateIcon {
      0% { transform: rotate(0); }
      /*50% { transform: rotate(360deg); }*/
      100% { transform: rotate(720deg); }
    }

    .node-status {
      display: inline-block;
      height: 20px;
      width: 100%;
      text-align: center;

      /*.ivu-icon {
        transform: scale(0);
      }*/

      .node-status-success {
        animation: scaleIcon 2.5s ease-in-out
      }
      .node-status-fail {
        animation: scaleIcon 2.5s ease-in-out
      }
      .node-status-running {
        animation: rotateIcon 2.5s ease-in-out infinite
      }
    }

    .node-content {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    .node-port {
      position: absolute;
      width: 15px;
      height: 15px;
      box-sizing: border-box;
      border-radius: 100%;
      transform: scale(0);

      &:hover,
      &.active,
      &.linked {
        transform: translateX(0) scale(1);
        border: 1px solid #ffd042;
        box-shadow: 0 0 2px 2px #ffd042;
        background: #ffd042;
      }
      &.active {
        border: 1px solid #08BD51;
        box-shadow: 0 0 2px 2px #08BD51;
        background: #08BD51;
      }
      &.linked {
         border: 1px solid #2db7f5;
         box-shadow: 0 0 2px 2px #2db7f5;
         background: #2db7f5;
      }
    }
    .port-top {
      top: -11px;
      left: 50%;
      margin-left: -7px;
    }
    .port-right {
      right: -11px;
      top: 50%;
      margin-top: -7px;
    }
    .port-bottom {
      bottom: -11px;
      left: 50%;
      margin-left: -7px;
    }
    .port-left {
      left: -11px;
      top: 50%;
      margin-top: -7px;
    }
  }
</style>

<template>
  <div
    class="canvas-node"
    name="canvas-node"
    :key="nodeInfo.nodeKey"
    :class="nodeClassName"
    :nodeKey="nodeInfo.nodeKey"
    :id="nodeInfo.id"
    :style="nodeInfo.style"
    :positionX="nodeInfo.positionX"
    :positionY="nodeInfo.positionY"
    :title="nodeInfo.title"
    :draggable="nodeInfo.draggable"
    @dragstart="dragHandle"
    @mouseover="mouseoverNode"
    @mouseout="mouseoutNode"
    @click.stop.prevent="nodeClick(nodeInfo)"
    @dbclick.stop.prevent="nodedbClick"
    @contextmenu.stop.prevent="nodeRightClick(nodeInfo.nodeKey, $event)"
  >
    <span class="node-status">
      <Icon class="node-status-icon node-status-success" title="成功" style="font-size: 20px; color: #00cc66;" type="checkmark-round" v-if="nodeInfo.status === 'success'"></Icon>
      <Icon class="node-status-icon node-status-fail" title="失败" style="font-size: 20px; color: #ff3300;" type="close-round" v-if="nodeInfo.status === 'fail'"></Icon>
      <Icon class="node-status-icon node-status-running" title="运行中" style="font-size: 20px; color: #ff9900;" type="loop" v-if="nodeInfo.status === 'running'"></Icon>
    </span>
    <span class="node-content">{{ nodeInfo.title }}</span>
    <span class="node-port port-top" :class="{active: activePortName === 'top', linked: nodeInfo.linkedPortName['top'].length}" name="top" @click="toggleActivePort"></span>
    <span class="node-port port-right" :class="{active: activePortName === 'right', linked: nodeInfo.linkedPortName['right'].length}" name="right" @click="toggleActivePort"></span>
    <span class="node-port port-bottom" :class="{active: activePortName === 'bottom', linked: nodeInfo.linkedPortName['bottom'].length}" name="bottom" @click="toggleActivePort"></span>
    <span class="node-port port-left" :class="{active: activePortName === 'left', linked: nodeInfo.linkedPortName['left'].length}" name="left" @click="toggleActivePort"></span>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        // 当前激活的节点key
        activeNodeKey: null,
        // 当前激活的端点名称
        activePortName: null,
        // 鼠标是否在当前节点上
        isMouseoverNode: false,
        // 画线状态
        drawing: false,
        // 开始port信息
        startPort: {
          nodeKey: '',
          x: '',
          y: ''
        },
        // 结束port信息
        endPort: {
          nodeKey: '',
          x: '',
          y: ''
        },
        // 右键菜单
        contextmenu: {
          // 是否启用
          isEnable: true,
          isShow: false,
          positionX: 0,
          positionY: 0,
          type: 'node'
        }
      }
    },
    props: {
      // 节点信息
      nodeInfo: {
        type: Object
      },
      // 是否在画线
      drawingLink: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        currentNodeKey: state => state.flowchart.canvas.nodeOptions.currentNodeKey
      }),
      isDrawingLink: function () {
        return this.drawingLink
      },
      nodeClassName: function () {
        let _t = this

        return {
          'active': _t.activeNodeKey === _t.nodeInfo.nodeKey || _t.currentNodeKey === _t.nodeInfo.nodeKey,
          'hover': _t.isMouseoverNode
        }
      },
      nodeStatusClassName: function () {
        let _t = this

        return {
          'node-status-success': _t.nodeInfo.status === 'success',
          'node-status-fail': _t.nodeInfo.status === 'fail',
          'node-status-running': _t.nodeInfo.status === 'running'
        }
      }
    },
    methods: {
      mouseoverNode: function () {
        this.isMouseoverNode = true
      },
      mouseoutNode: function () {
        this.isMouseoverNode = false
      },
      // 节点click
      nodeClick: function (nodeInfo) {
        let _t = this
        // 分发action 更新contextmenu数据
        _t.$store.dispatch('updateFlowchartContextmenu', {
          isShow: false,
          nodeInfo: {
            nodeKey: null
          }
        })
      },
      // 节点双击
      nodedbClick: function () {
        let _t = this
        // 显示右侧配置项
        _t.$store.dispatch('updateFlowchartCanvasNodeOptions', {
          isShow: true
        })
      },
      // 节点rightClick
      nodeRightClick: function (nodeKey, event) {
        let _t = this
        let nodeDom = document.querySelector('[nodeKey="' + nodeKey + '"]')
        let offsetX
        let offsetY
        if (event.target.className.indexOf('canvas-node') > -1) {
          offsetX = parseInt(event.target.style.left) + parseInt(event.offsetX)
          offsetY = parseInt(event.target.style.top) + parseInt(event.offsetY)
        } else {
          offsetX = parseInt(nodeDom.style.left) + event.target.offsetLeft + parseInt(event.offsetX)
          offsetY = parseInt(nodeDom.style.top) + event.target.offsetTop + parseInt(event.offsetY)
        }
        // 更新contextmenu
        _t.contextmenu = {
          ..._t.contextmenu,
          isShow: true,
          positionX: offsetX,
          positionY: offsetY,
          nodeInfo: {
            nodeKey: nodeKey || null
          }
        }
        // 分发action 更新contextmenu数据
        _t.$store.dispatch('updateFlowchartContextmenu', _t.contextmenu)
      },
      dragHandle: function (event) {
        let _t = this
        if (_t.isDrawingLink) {
          event.preventDefault()
          return false
        }

        let target
        if (event.target.className.indexOf('node-content') > -1) {
          target = event.target.parentNode
        } else {
          target = event.target
        }
        // 拖拽的节点数据
        let nodeInfo = {
          id: target.id,
          title: target.title,
          // 唯一标识，此处只获取，不重新生成
          nodeKey: target.attributes['nodeKey'].value || ''
        }
        event.dataTransfer.setData('Text', JSON.stringify(nodeInfo))
        // 分发action 更新容器z-index为1600
        _t.$store.dispatch('updateFlowchartCanvasNodeContainer', {
          zIndex: 1600
        })
        // 分发action，更新画布状态
        _t.$store.dispatch('updateFlowchartCanvasStatus', 'editing')
      },
      // 端点激活状态切换
      toggleActivePort: function (event) {
        let _t = this
        let targetName = event.target.attributes.name.value
        _t.activePortName = _t.activePortName === targetName ? null : targetName
      }
    }
  }
</script>

