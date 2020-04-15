/**
* Created by OXOYO on 2019/7/1.
*
* Sketchpad 画板
*/

<style scoped lang="less" rel="stylesheet/less">
  .sketchpad-box {
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .sketchpad {
      display: inline-block;
      width: 960px;
      height: 1200px;
      position: absolute;
      left: 50%;
      margin-left: -480px;
      margin-top: 100px;
      margin-bottom: 100px;
      z-index: 100;
      background: #FFFFFF;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
    }
    .inputBox {
      display: none;
    }
  }
</style>

<template>
  <div class="sketchpad-box" :style="boxStyle" @dblclick="ondblclickPad">
    <div class="sketchpad" id="sketchpad" @dblclick.stop>
      <!-- 文本输入框 -->
      <input class="inputBox" autofocus value="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Sketchpad',
    data () {
      return {
        // 面板样式
        panelStyle: {
          left: null,
          right: null
        }
      }
    },
    computed: {
      boxStyle () {
        let _t = this
        let boxStyle = {}
        let keys = Object.keys(_t.panelStyle)
        keys.forEach(key => {
          let panelStyle = _t.panelStyle[key]
          if (panelStyle) {
            // 位置数据
            let positionVal = isNaN(parseInt(panelStyle[key])) ? 0 : parseInt(panelStyle[key])
            let width = isNaN(parseInt(panelStyle.width)) ? 0 : parseInt(panelStyle.width)
            boxStyle[key] = positionVal + width + 'px'
          }
        })
        return boxStyle
      }
    },
    methods: {
      ondblclickPad () {
        let _t = this
        _t.$X.utils.bus.$emit('editor/pad/dblclick')
      }
    },
    created () {
      let _t = this
      _t.$X.utils.bus.$on('editor/panel/toggle', function (data) {
        _t.$set(_t.panelStyle, data.name, data.style)
      })
    }
  }
</script>
