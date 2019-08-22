/**
* Created by OXOYO on 2019/7/1.
*
* CardBox 卡片盒子
*/

<style scoped lang="less" rel="stylesheet/less">
  .card-box {
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    padding-top: 40px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
    background: #ffffff;
    z-index: 200;
    overflow-y: auto;
    overflow-x: hidden;
    transition: all .5s ease-in-out;

    .handler {
      display: inline-block;
      width: 100%;
      height: 25px;
      line-height: 25px;
    }
  }
</style>

<template>
  <div class="card-box" :style="boxStyle">
    <div class="handler">
      <!-- 折叠 -->
      <XIcon :type="foldIcon" style="margin: 0 10px" @click.native="handleFoldClick"></XIcon>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'CardBox',
    props: {
      width: {
        type: Number,
        default: 300
      },
      // 显示位置
      placement: {
        type: String,
        default: 'right'
      }
    },
    data () {
      return {
        // 是否折叠
        isFold: false
      }
    },
    computed: {
      boxStyle () {
        let _t = this
        let style = {}
        if (_t.placement) {
          style[_t.placement] = 0
        }
        if (_t.width) {
          style.width = _t.width + 'px'
        }
        // 处理折叠
        if (_t.isFold) {
          style.width = '36px'
        }
        return style
      },
      foldIcon () {
        let _t = this
        let icon = ''
        if (_t.placement === 'right') {
          if (_t.isFold) {
            icon = 'rewind'
          } else {
            icon = 'fast-forward'
          }
        } else if (_t.placement === 'left') {
          if (_t.isFold) {
            icon = 'fast-forward'
          } else {
            icon = 'rewind'
          }
        }
        return icon
      }
    },
    methods: {
      handleFoldClick () {
        let _t = this
        _t.isFold = !_t.isFold
      }
    }
  }
</script>
