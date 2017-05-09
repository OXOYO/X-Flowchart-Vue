/**
* Created by OXOYO on 2017/5/9.
*
*/

<style>
  html {
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
    /*background-color: #e7e8eb;*/
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .myFlowchart {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<template>
  <div class="myFlowchart">
    <x-flowchart :treeData="treeData" :canvasData="canvasData" :toolbarCallback="toolbarCallback"></x-flowchart>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        treeData: [
          {
            title: '组件类_1',
            draggable: false,
            children: [
              {
                id: '1-1',
                title: '组件_1_1',
                draggable: true
              },
              {
                id: '1-2',
                title: '组件_1_2',
                draggable: true
              }
            ]
          },
          {
            title: '组件类_2',
            draggable: false,
            children: [
              {
                id: '2-1',
                title: '组件_2_1',
                draggable: true
              },
              {
                id: '2-2',
                title: '组件_2_2',
                draggable: true
              }
            ]
          },
          {
            title: '组件类_3',
            draggable: false,
            children: [
              {
                id: '3-1',
                title: '组件_3_1',
                draggable: true
              },
              {
                id: '3-2',
                title: '组件_3_2',
                draggable: true
              }
            ]
          },
          {
            title: '组件类_4',
            draggable: false
          }
        ],
        canvasData: {}
      }
    },
    computed: {
      ...mapState({
        nodeList: state => state.flowchart.canvas.nodeList,
        linkList: state => state.flowchart.canvas.linkList,
        isFullscreen: state => state.flowchart.canvas.zoombar.isFullscreen,
        layoutContentStyle: function () {
          let _t = this
          if (_t.isFullscreen) {
            return {
              top: 0,
              bottom: 0,
              margin: 0
            }
          }
          return {}
        },
        buttonsConfig: state => state.flowchart.toolbar.buttons,
        contextmenuAction: state => state.flowchart.toolbar.actionName,
        canvasFormData: state => state.flowchart.canvas.formData,
        canvasCurrentStatus: state => state.flowchart.canvas.status.current
      })
    },
    watch: {
      contextmenuAction: function (actionName) {
        let _t = this
        if (actionName) {
          _t.toolbarCallback(actionName)
        }
      }
    },
    methods: {
      toolbarCallback: function (actionName) {
        console.log('toolbarClick actionName', actionName)
        let _t = this
        let getObjLength = function (obj) {
          let tmpArr = Object.keys(obj) || []
          return tmpArr.length
        }
        switch (actionName) {
          case 'create':
            if (_t.canvasCurrentStatus === 'editing' || getObjLength(_t.nodeList)) {
              let msg = _t.canvasCurrentStatus === 'editing' ? '当前处于编辑状态，确定要离开吗？' : '画布不为空，确定要离开吗？'
              _t.$Modal.confirm({
                title: '提示',
                content: msg,
                onOk: function () {
                  // 清空画布
                  _t.$store.dispatch('emptyFlowchartCanvas')
                  // 分发action，更新画布状态
                  _t.$store.dispatch('updateFlowchartCanvasStatus', 'create')
                }
              })
            }
            break
          case 'save':
            console.log('Canvas Save Data nodeList', _t.nodeList)
            console.log('Canvas Save Data linkList', _t.linkList)
            // 判断画布上是否有数据
            if (!getObjLength(_t.nodeList)) {
              _t.$Message.info('画布不能为空！')
              return
            }
            /*
             if (!getObjLength(_t.linkList)) {
             _t.$Message.info('暂无有效连接！')
             return
             }
             */
            break
          case 'run':
            console.log('Canvas Run Data nodeList', _t.nodeList)
            console.log('Canvas Run Data linkList', _t.linkList)
            // 判断画布上是否有数据
            if (!getObjLength(_t.nodeList)) {
              _t.$Message.info('画布不能为空！')
              return
            }
            /*
             if (!getObjLength(_t.linkList)) {
             _t.$Message.info('暂无有效连接！')
             return
             }
             */
            // 分发action，更新画布状态
            _t.$store.dispatch('updateFlowchartCanvasStatus', 'running')
            setTimeout(function () {
              // 分发action，更新画布状态
              _t.$store.dispatch('updateFlowchartCanvasStatus', 'runSuccess')
              _t.$Message.success('执行运行操作成功！')
            }, 5000)
            break
        }
      }
    }
  }
</script>

