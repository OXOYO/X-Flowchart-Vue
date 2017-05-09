/**
* Created by OXOYO on 2017/4/12.
* 节点容器
*/

<style lang="less">
  .canvas-node-box {
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<template>
  <div
    class="canvas-node-box"
    :style="{ zoom: zoom }"
    @drop.prevent="dropHandle"
    @dragover.stop.prevent
  >
    <x-canvas-node
      v-for="item in nodeList"
      :nodeInfo="item"
      :key="item.nodeKey"
      :drawingLink="drawingLink"
    ></x-canvas-node>
    <!-- 线条 -->
    <x-canvas-link-container></x-canvas-link-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import CanvasNode from './CanvasNode.vue'
  import CanvasLinkContainer from './CanvasLinkContainer.vue'

  export default {
    components: {
      'x-canvas-node': CanvasNode,
      'x-canvas-link-container': CanvasLinkContainer
    },
    props: {
      // 是否在画线
      drawingLink: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState({
        nodeList: state => state.flowchart.canvas.nodeList,
        linkList: state => state.flowchart.canvas.linkList,
        zoom: state => state.flowchart.canvas.zoombar.zoom
      })
    },
    methods: {
      // 节点drop
      dropHandle: function (event) {
        // 更新当前节点位置信息
        let _t = this
        // 获取节点数据
        let nodeInfo = JSON.parse(event.dataTransfer.getData('Text'))

        let nodeKey = nodeInfo['nodeKey']
        // 如果不存在则退出
        if (!_t.nodeList[nodeKey]) {
          return
        }
        let offsetX = event.offsetX
        let offsetY = event.offsetY
        let style
        if (event.target.tagName.toLowerCase() === 'svg') {
          style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
        } else {
          let nodeDom = document.querySelector('[nodeKey="' + nodeKey + '"]')
          offsetX = parseInt(nodeDom.style.left) + offsetX
          offsetY = parseInt(nodeDom.style.top) + offsetY
          style = 'left: ' + offsetX + 'px; top: ' + offsetY + 'px'
        }

        // 处理样式
        nodeInfo['style'] = style
        // 处理拖拽 FIXME !!! 后期应该是只有在编辑状态时才可以拖动
        nodeInfo['draggable'] = true

        _t.nodeList[nodeKey] = {
          ..._t.nodeList[nodeKey],
          ...nodeInfo
        }

        let handlePortXY = function (nodeType, portName, nodeTop, nodeLeft, nodeWidth, nodeHeight) {
          let offsetX
          let offsetY
          let margin = 0
          if (nodeType === 'stopPort') {
            margin = 25
          }
          switch (portName) {
            case 'top':
              offsetX = parseInt(nodeLeft) + parseInt(nodeWidth / 2)
              offsetY = parseInt(nodeTop) - margin
              break
            case 'right':
              offsetX = parseInt(nodeLeft) + nodeWidth + margin
              offsetY = parseInt(nodeTop) + parseInt(nodeHeight / 2)
              break
            case 'bottom':
              offsetX = parseInt(nodeLeft) + parseInt(nodeWidth / 2)
              offsetY = parseInt(nodeTop) + nodeHeight + margin
              break
            case 'left':
              offsetX = parseInt(nodeLeft) - margin
              offsetY = parseInt(nodeTop) + parseInt(nodeHeight / 2)
              break
          }

          return {
            x: offsetX,
            y: offsetY
          }
        }

        // 遍历linkList
        let linkKeyList = _t.nodeList[nodeKey].linkKey
        for (let key in linkKeyList) {
          let currentPort
          let currentPortXY
          if (_t.linkList[key].startPort.nodeKey === nodeKey) {
            currentPort = _t.linkList[key].startPort
            currentPortXY = handlePortXY('startPort', currentPort.portName, offsetY, offsetX, currentPort.nodeWidth, currentPort.nodeHeight)
            _t.linkList[key].startPort.x = currentPortXY.x
            _t.linkList[key].startPort.y = currentPortXY.y
          } else if (_t.linkList[key].stopPort.nodeKey === nodeKey) {
            currentPort = _t.linkList[key].stopPort
            currentPortXY = handlePortXY('stopPort', currentPort.portName, offsetY, offsetX, currentPort.nodeWidth, currentPort.nodeHeight)
            _t.linkList[key].stopPort.x = currentPortXY.x
            _t.linkList[key].stopPort.y = currentPortXY.y
          }
        }

        // 分发action 更新nodeList数据
        _t.$store.dispatch('updateFlowchartCanvasNodeList', _t.nodeList)
        // 分发action 更新linkList数据
        _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
      }
    }
  }
</script>

