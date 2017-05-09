/**
* Created by OXOYO on 2017/4/21.
* 缩放控制栏
*/

<style scoped lang="less">
  .canvas-zoombar {
    position: absolute;
    z-index: 1800;
    width: 40px;
    right: 25px;
    top: 60px;
    background: #fff;
    text-align: center;
    font-size: 16px;
    transition: right .5s ease-in-out .1s;

    .canvas-zoombar-item {
      height: 40px;
      line-height: 40px;
      width: 40px;
      position: relative;
      cursor: default;

      &:hover {
       background: #f3f3f3;
        .ivu-icon {
          transform: rotate(360deg);
        }
       }

      &+.canvas-zoombar-item {

        &:before {
          content: ' ';
          width: 20px;
          height: 2px;
          background: #f3f3f3;
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -10px;
         }
        }
        .ivu-icon {
          transition: transform .5s ease-in-out .1s;
        }
    }
  }
</style>

<template>
  <div class="canvas-zoombar" :style="{ right: zoombarRight }">
    <div class="canvas-zoombar-item zoom-in" @click="handleZoom('in')" title="放大">
      <Icon type="plus-round"></Icon>
    </div>
    <div class="canvas-zoombar-item zoom-default" @click="handleZoom('default')" title="还原">
      <Icon type="refresh"></Icon>
    </div>
    <div class="canvas-zoombar-item zoom-out" @click="handleZoom('out')" title="缩小">
      <Icon type="minus-round"></Icon>
    </div>
    <div v-if="isSupportFullscreen" class="canvas-zoombar-item fullscreen" @click="handleFullscreen" :title="isFullscreen ? '退出全屏' : '全屏'">
      <Icon v-if="!isFullscreen" type="arrow-expand"></Icon>
      <Icon v-if="isFullscreen" type="arrow-shrink"></Icon>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        zoomStep: 0.1
      }
    },
    computed: {
      // 是否支持全屏
      isSupportFullscreen: function () {
        let docElm = document.documentElement
        if (docElm.requestFullScreen || docElm.webkitRequestFullScreen || docElm.mozRequestFullScreen || docElm.msRequestFullscreen) {
          return true
        }
        return false
      },
      ...mapState({
        zoom: state => state.flowchart.canvas.zoombar.zoom,
        zoombarRight: state => state.flowchart.canvas.zoombar.right,
        isFullscreen: state => state.flowchart.canvas.zoombar.isFullscreen,
        nodeOptionIsShow: state => state.flowchart.canvas.nodeOptions.isShow
      })
    },
    watch: {
      nodeOptionIsShow: function (val) {
        let _t = this
        let tmpRight = 0
        if (val) {
          tmpRight = '325px'
        } else {
          tmpRight = '25px'
        }

        // 更新zoom
        _t.$store.dispatch('updateFlowchartCanvasZoom', {
          right: tmpRight
        })
      }
    },
    methods: {
      handleZoom: function (actionName) {
        let _t = this
        let tmpZoom = 1
        switch (actionName) {
          case 'default':
            tmpZoom = 1
            break
          case 'in':
            tmpZoom = _t.zoom + _t.zoomStep
            break
          case 'out':
            tmpZoom = _t.zoom - _t.zoomStep
            break
          default:
            tmpZoom = 1
        }

        // 更新zoom
        _t.$store.dispatch('updateFlowchartCanvasZoom', {
          zoom: tmpZoom
        })
      },
      handleFullscreen: function () {
        let _t = this
        // 更新全屏标识
        let isFullscreen = !_t.isFullscreen
        // 计算span值
        if (isFullscreen) {
          // 全屏
          let docElm = document.documentElement
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen()
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen()
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen()
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen()
          }
        } else {
          // 退出全屏
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        }

        // 分发action 更新全屏标识
        _t.$store.dispatch('toggleFullscreen', {
          isFullscreen: isFullscreen
        })
      }
    }
  }
</script>

