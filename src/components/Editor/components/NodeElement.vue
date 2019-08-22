/**
* Created by OXOYO on 2019/7/2.
*
* NodeElement 节点元素
*/

<style scoped lang="less" rel="stylesheet/less">
  .node-element {
    display: inline-block;
    margin: 2px;
    border: 1px solid transparent;

    &:hover {
      border-color: rgba(0, 0, 0, .1);
      cursor: move;
    }
    .content {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div
    class="node-element"
    :style="elementStyle"
    @mousedown="handleMouseDown"
  >
    <div class="content">
      {{ title }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NodeElement',
    props: {
      title: {
        type: String,
        required: true
      },
      info: {
        type: Object,
        required: true,
        default () {
          return {
            shape: 'circle',
            label: 'circle',
            enable: true,
            width: 40,
            height: 40,
            anchorPoints: [ [0, 0], [0, 1], [1, 0], [1, 1] ]
          }
        }
      },
      width: {
        type: Number,
        default: 40
      },
      height: {
        type: Number,
        default: 40
      }
    },
    computed: {
      elementStyle () {
        let _t = this
        let style = {}
        if (_t.width) {
          style.width = _t.width + 'px'
        }
        if (_t.height) {
          style.height = _t.height + 'px'
        }
        return style
      }
    },
    methods: {
      handleMouseDown (event) {
        let _t = this
        _t.$X.utils.bus.$emit('board/materials/editor/add/node', _t.info)
      }
    }
  }
</script>
