/**
* Created by OXOYO on 2017/4/11.
* 画布右键菜单
*/

<style lang="less">
  .canvas-contextmenu {
    position: absolute;
    z-index: 1500;
    display: inline-block;
    /*height: 120px;*/
    /*width: 100px;*/
    min-width: 100px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, .1);
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);

    ul {
      margin: 0;
      padding: 0;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      li {
        margin: 0;
        padding: 5px 30px 5px 15px;
        cursor: default;

        &:hover {
          background: #f3f3f3;
        }
      }
    }
    .canvas-contextmenu-item {

    }
  }
</style>

<template>
  <!-- 右键菜单 -->
  <div class="canvas-contextmenu" v-if="data.isEnable" v-show="data.isShow" :style="style">
    <ul v-if="data.type === 'canvas'">
      <li @click="handleClick('canvas-create', $event)">新建</li>
      <li @click="handleClick('canvas-save', $event)">保存</li>
      <li @click="handleClick('canvas-run', $event)">运行</li>
      <li @click="handleClick('canvas-empty', $event)">清空画布</li>
    </ul>
    <ul v-if="data.type === 'node'">
      <li @click="handleClick('node-edit', $event)">编辑节点</li>
      <li @click="handleClick('node-remove', $event)">删除节点</li>
    </ul>
    <ul v-if="data.type === 'link'">
      <li @click="handleClick('link-remove', $event)">删除线条</li>
    </ul>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        // 菜单项
        menuList: {
          Node: [],
          Canvas: []
        }
      }
    },
    computed: {
      style: function () {
        let _t = this
        return {
          left: parseInt(_t.data.positionX) + 'px',
          top: parseInt(_t.data.positionY) + 'px'
        }
      },
      ...mapState({
        data: state => state.flowchart.contextmenu.data,
        nodeList: state => state.flowchart.canvas.nodeList,
        linkList: state => state.flowchart.canvas.linkList
      })
    },
    methods: {
      handleClick: function (actionName, event) {
        let _t = this
        // 更新节点端点信息
        let updateLinkedPortName = function (linkKey, targetNodeKey) {
          // 删除端点上的linkKey
          delete _t.nodeList[targetNodeKey].linkKey[linkKey]
          // 删除线条时需要更新关联的端点信息，如：端点状态
          if (targetNodeKey) {
            let linkedPortName = _t.nodeList[targetNodeKey].linkedPortName
            let tmpLinkedPortName = {}
            for (let port in linkedPortName) {
              let portLinkArr = linkedPortName[port]
              let tmpPortLinkArr = []
              // 标识
              let hasLinkKey = false
              if (portLinkArr.length) {
                for (let i = 0, len = portLinkArr.length; i < len; i++) {
                  // 查找到存在linkKey的arr
                  if (portLinkArr[i] === linkKey) {
                    hasLinkKey = true
                    for (let j = 0, length = portLinkArr.length; j < length; j++) {
                      if (portLinkArr[j] !== linkKey) {
                        tmpPortLinkArr.push(portLinkArr[j])
                      }
                    }
                    break
                  }
                }
              }
              tmpLinkedPortName[port] = hasLinkKey ? tmpPortLinkArr : portLinkArr
            }

            _t.nodeList[targetNodeKey].linkedPortName = tmpLinkedPortName
          }
        }
        switch (actionName) {
          case 'canvas-create':
            // 分发action，执行相应操作，先更新为null
            _t.$store.dispatch('updateFlowchartToolbarAction', null)
            setTimeout(function () {
              // 分发action，执行相应操作
              _t.$store.dispatch('updateFlowchartToolbarAction', 'create')
            }, 0)
            break
          case 'canvas-save':
            // 分发action，执行相应操作，先更新为null
            _t.$store.dispatch('updateFlowchartToolbarAction', null)
            setTimeout(function () {
              // 分发action，执行相应操作
              _t.$store.dispatch('updateFlowchartToolbarAction', 'save')
            }, 0)
            break
          case 'canvas-empty':
            // 分发action，更新画布状态
            _t.$store.dispatch('updateFlowchartCanvasStatus', 'create')
            // 清空画布
            _t.$store.dispatch('emptyFlowchartCanvas')
            break
          case 'canvas-run':
            // 分发action，执行相应操作，先更新为null
            _t.$store.dispatch('updateFlowchartToolbarAction', null)
            setTimeout(function () {
              // 分发action，执行相应操作
              _t.$store.dispatch('updateFlowchartToolbarAction', 'run')
            }, 0)
            break
          case 'node-edit':
            // 显示右侧配置项
            _t.$store.dispatch('updateFlowchartCanvasNodeOptions', {
              isShow: true,
              // 当前节点key
              currentNodeKey: _t.data.nodeInfo.nodeKey || null
            })
            break
          case 'node-remove':
            let nodeKey = _t.data.nodeInfo.nodeKey || null
            if (nodeKey) {
              delete _t.nodeList[nodeKey]
              // 删除节点时需要删除节点关联的线条
              for (let linkKey in _t.linkList) {
                let link = _t.linkList[linkKey]
                let targetNodeKey = null
                let flag = false
                if (link.startPort.nodeKey === nodeKey) {
                  targetNodeKey = link.stopPort.nodeKey
                  flag = true
                } else if (link.stopPort.nodeKey === nodeKey) {
                  targetNodeKey = link.startPort.nodeKey
                  flag = true
                }
                if (flag) {
                  // 删除线条
                  delete _t.linkList[linkKey]
                  updateLinkedPortName(linkKey, targetNodeKey)
                }
              }

              // 分发action 更新nodeList数据
              _t.$store.dispatch('updateFlowchartCanvasNodeList', _t.nodeList)
              // 分发action 更新linkList数据
              _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
              // 分发action，更新画布状态
              _t.$store.dispatch('updateFlowchartCanvasStatus', 'editing')
            }
            break
          case 'link-remove':
            let linkKey = _t.data.linkInfo.linkKey || null
            if (linkKey) {
              // 删除线条时需要更新关联的端点信息，如：端点状态
              let linkInfo = _t.linkList[linkKey]
              let startPortNodeKey = linkInfo.startPort.nodeKey
              let stopPortNodeKey = linkInfo.stopPort.nodeKey
              // 更新起点
              updateLinkedPortName(linkKey, startPortNodeKey)
              // 更新终点
              updateLinkedPortName(linkKey, stopPortNodeKey)
              // 删除线条
              delete _t.linkList[linkKey]

              // 分发action 更新nodeList数据
              _t.$store.dispatch('updateFlowchartCanvasNodeList', _t.nodeList)
              // 分发action 更新linkList数据
              _t.$store.dispatch('updateFlowchartCanvasLinkList', _t.linkList)
              // 分发action，更新画布状态
              _t.$store.dispatch('updateFlowchartCanvasStatus', 'editing')
            }
            break
        }
      }
    }
  }
</script>

