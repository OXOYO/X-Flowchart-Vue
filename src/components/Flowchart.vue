/**
* Created by OXOYO on 2017/4/7.
* flowchart
*/

<style scoped lang="less">
  .flowchart {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100%;
    background: #FFFCEF;

    &.fullscreen {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2000;
    }
  }
</style>

<template>
  <div class="flowchart" id="flowchart">
    <!-- 组件树 -->
    <x-tree :data="treeData"></x-tree>
    <!-- 画布 -->
    <x-canvas :data="canvasData" :toolbarCallback="toolbarCallback"></x-canvas>
  </div>
</template>

<script>
  import Tree from './Tree.vue'
  import Canvas from './Canvas.vue'

  export default {
    components: {
      'x-tree': Tree,
      'x-canvas': Canvas
    },
    props: {
      // 节点树数据
      treeData: {
        type: Array,
        required: true
      },
      // 画布数据
      canvasData: {
        type: Object
      },
      toolbarCallback: {
        type: Function
      }
    }
  }
</script>

