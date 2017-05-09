/**
* Created by OXOYO on 2017/4/11.
* 节点配置信息
*/

<style scoped lang="less">
  .canvas-node-options {
    position: absolute;
    z-index: 2000;
    top: 0;
    right: -300px;
    bottom: 0;
    width: 300px;
    border-left: 1px solid rgba(0, 0, 0, .1);
    transition: right .5s ease-in-out;
    background: #ffffff;

    &.open {
     right: 0;

      .options-tab {
        &:hover {
          .ivu-icon {
            transform: rotate(360deg);
          }
        }
        .ivu-icon-chevron-right {
          transform: rotate(0deg);
        }
      }
    }

     .options-form {
       height: 100%;
       width: 100%;
       position: relative;

       .options-form-head {
         position: absolute;
         top: 0;
         width: 100%;
         height: 60px;
         line-height: 60px;
         background: #fff;
         border-bottom: 1px solid rgba(0, 0, 0, .1);

         .options-title {
           display: inline-block;
           float: left;
           padding: 0 15px;
         }
         .options-close {
           display: inline-block;
           float: right;
           padding: 0 15px;
           cursor: default;

           &:hover {
              color: red;
            }
         }
       }
        .options-form-body {
          position: absolute;
          top: 60px;
          bottom: 60px;
          left: 0;
          right: 0;
          overflow: auto;
          padding: 15px;
        }
        .options-form-foot {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 60px;
          line-height: 60px;
          border-top: 1px solid rgba(0, 0, 0, .1);
          text-align: center;
        }
     }

    .options-tab {
      position: absolute;
      left: -20px;
      top: 50%;
      width: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: -20px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, .1);
      border-right-color: transparent;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      font-size: 16px;
      cursor: default;

        &:hover {
          .ivu-icon {
            transform: rotate(180deg);
          }
        }

        .ivu-icon {
          transition: transform .5s ease-in-out .1s;
        }
        .ivu-icon-chevron-right {
          display: inline-block;
          transform: rotate(-180deg);
        }
    }

    .nodata {
      text-align: center;
    }
  }
  .spin-icon-load{
    animation: animation-spin 1s linear infinite;
  }
  @keyframes animation-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>

<template>
  <div class="canvas-node-options" :class="{ open: isShow }" @contextmenu.stop.prevent @wheel.stop>
    <!-- 表单 -->
    <div class="options-form">
      <div class="options-form-head">
        <div class="options-title">编辑节点</div>
        <div class="options-close" @click="handleClose">
          <Icon type="close"></Icon>
        </div>
      </div>
      <div class="options-form-body">
        <div class="nodata" v-if="!isNoData">暂无配置参数！</div>
        <Spin fix v-if="isLoading">
          <Icon type="load-c" size=18 class="spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        <Form v-if="!isLoading" :model="nodeOptions" label-position="top">
          <Form-item
            v-for="(item, key) in nodeOptions.options"
            :key="item"
            :label="item.label.title"
          >
            <Input v-model="nodeOptions.options[key].control.val" placeholder=""></Input>
          </Form-item>
        </Form>
      </div>
      <div class="options-form-foot">
        <Button type="primary" @click="saveNodeOptions">暂存</Button>
      </div>
    </div>
    <div class="options-tab" @click="handleTab">
      <Icon type="chevron-right"></Icon>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        nodeOptions: {},
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        isShow: state => state.flowchart.canvas.nodeOptions.isShow,
        currentNodeKey: state => state.flowchart.canvas.nodeOptions.currentNodeKey,
        optionsList: state => state.flowchart.canvas.nodeOptions.data,
        treeData: state => state.flowchart.tree.data,
        nodeList: state => state.flowchart.canvas.nodeList
      }),
      isNoData: function () {
        let _t = this
        let tmpArr = []
        let isNoData = false
        if (_t.nodeOptions.hasOwnProperty('options')) {
          tmpArr = Object.keys(_t.nodeOptions.options)
        }
        isNoData = !!tmpArr.length
        return isNoData
      }
    },
    watch: {
      currentNodeKey: function (val) {
        let _t = this
        _t.isLoading = true
        // 显示的话，则去拉取节点配置信息
        if (val) {
          if (_t.optionsList[_t.currentNodeKey]) {
            _t.nodeOptions = _t.optionsList[_t.currentNodeKey]
            _t.hideLoading()
          } else {
            // 获取原始节点信息
            let baseNodeInfo = null
            for (let key in _t.treeData) {
              if (baseNodeInfo) {
                break
              }
              let item = _t.treeData[key]
              if (item.children && item.children.length) {
                for (let childKey in item.children) {
                  let childItem = item.children[childKey]
                  if (childItem.id === _t.nodeList[_t.currentNodeKey].baseId) {
                    baseNodeInfo = childItem.data
                    break
                  }
                }
              }
            }
//            if (!baseNodeInfo) {
//              return
//            }
            setTimeout(function () {
              // 当前节点配置信息
              _t.nodeOptions = {
                saved: false,
                options: [{
                  label: {
                    title: '字段001'
                  },
                  control: {
                    key: 'id',
                    val: 1000
                  }
                }]
              }
              // 分发action，更新及诶的配置信息
              _t.$store.dispatch('updateFlowchartCanvasNodeOptionsList', {
                [_t.currentNodeKey]: _t.nodeOptions
              })
              _t.hideLoading()
            }, 5000)
          }
        } else {
          _t.nodeOptions = {
            saved: false,
            options: []
          }
          _t.hideLoading()
        }
      }
    },
    methods: {
      hideLoading: function () {
        let _t = this
        setTimeout(function () {
          _t.isLoading = false
        }, 500)
      },
      handleClose: function () {
        let _t = this
        // 显示右侧配置项
        _t.$store.dispatch('updateFlowchartCanvasNodeOptions', {
          isShow: false,
          // 当前节点key
          currentNodeKey: null
        })
        // 清空
        _t.nodeOptions = {
          saved: false,
          options: []
        }
      },
      handleTab: function () {
        let _t = this

        _t.$store.dispatch('updateFlowchartCanvasNodeOptions', {
          isShow: !_t.isShow
        })
      },
      saveNodeOptions: function () {
        let _t = this
        _t.nodeOptions.saved = true
        // 更新节点信息
        _t.$store.dispatch('updateFlowchartCanvasNodeOptionsList', {
          [_t.currentNodeKey]: _t.nodeOptions
        })
        // 分发action，更新画布状态
        _t.$store.dispatch('updateFlowchartCanvasStatus', 'editing')
        // 提示
        _t.$Message.success('暂存成功！')
      }
    }
  }
</script>

