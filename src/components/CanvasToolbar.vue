/**
* Created by OXOYO on 2017/4/18.
*
*/

<style scoped lang="less">
  .canvas-toolbar {
    position: absolute;
    z-index: 1800;
    height: 60px;
    line-height: 60px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, .1);
    bottom: 0;
    background: #fff;
    text-align: center;
    vertical-align: middle;

    .toolbar-button-group {
      margin: auto 10px;
    }
  }
</style>

<template>
  <div class="canvas-toolbar" @contextmenu.stop.prevent>
    <Button-group class="toolbar-button-group">
      <Button
        type="dashed"
        @click="handleAction('create')"
      >新建</Button>
      <Button
        :disabled="!buttonsConfig.save.enable"
        :loading="buttonsConfig.save.isLoading"
        type="primary"
        @click="handleAction('save')"
      >保存</Button>
    </Button-group>
    <Button
      :disabled="!buttonsConfig.run.enable"
      :loading="buttonsConfig.run.isLoading"
      type="info"
      @click="handleAction('run')"
    >运行</Button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      toolbarCallback: {
        type: Function
      },
      config: {
        type: Object,
        default: function () {
          return {
            buttons: {
              save: {
                enable: true
              },
              run: {
                enable: false
              }
            }
          }
        }
      }
    },
    computed: {
      ...mapState({
        buttonsConfig: state => state.flowchart.toolbar.buttons,
        canvasHistoryStatus: state => state.flowchart.canvas.status.history,
        canvasCurrentStatus: state => state.flowchart.canvas.status.current
      })
    },
    watch: {
      canvasCurrentStatus: function (val) {
        let _t = this
        _t.updateFlowchartToolbarButtons(val)
      }
    },
    methods: {
      handleAction: function (actionName) {
        let _t = this
        if (_t.toolbarCallback) {
          _t.toolbarCallback(actionName)
        }
      },
      updateFlowchartToolbarButtons: function (canvasStatus) {
        let _t = this
        // 通过画布状态来更新按钮配置
        // 画布状态 init: 初始状态 create: 新建 editing: 编辑中 running: 运行中 read: 只读 loading: 加载中
        let buttonsConfig = null
        switch (canvasStatus) {
          case 'init':
            buttonsConfig = {
              save: {
                enable: true,
                isLoading: false
              },
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'create':
            buttonsConfig = {
              save: {
                enable: false,
                isLoading: false
              },
              run: {
                enable: false,
                isLoading: false
              }
            }
            break
          case 'editing':
            buttonsConfig = {
              save: {
                enable: true,
                isLoading: false
              },
              run: {
                enable: false,
                isLoading: false
              }
            }
            break
          case 'running':
            buttonsConfig = {
              save: {
                enable: false,
                isLoading: false
              },
              run: {
                enable: false,
                isLoading: true
              }
            }
            break
          case 'runFail':
            buttonsConfig = {
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'runSuccess':
            buttonsConfig = {
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'runStatusFail':
            buttonsConfig = {
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'runStatusSuccess':
            buttonsConfig = {
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'runDone':
            buttonsConfig = {
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'read':
            buttonsConfig = {
              save: {
                enable: false,
                isLoading: false
              },
              run: {
                enable: true,
                isLoading: false
              }
            }
            break
          case 'loading':
            buttonsConfig = {
              save: {
                enable: false,
                isLoading: false
              },
              run: {
                enable: false,
                isLoading: false
              }
            }
            break
        }
        if (buttonsConfig) {
          // 分发action，更新toolbar按钮状态
          _t.$store.dispatch('updateFlowchartToolbarButtons', buttonsConfig)
        }
      }
    },
    created: function () {
      let _t = this
      let canvasCurrentStatus = _t.$store.state.flowchart.canvas.status.current
      _t.updateFlowchartToolbarButtons(canvasCurrentStatus)
    }
  }
</script>

