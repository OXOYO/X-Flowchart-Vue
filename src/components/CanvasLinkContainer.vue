/**
* Created by OXOYO on 2017/4/11.
* 画布线条容器
*/

<style lang="less">
  .canvas-link-box {
    position: absolute;
    z-index: 1100;
    height: 100%;
    width: 100%;
    background: url("../../static/images/grid_background_01.gif") repeat;
  }
</style>

<template>
  <svg class="canvas-link-box" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">
        <circle cx="0" cy="0" r="3" style="stroke: none; fill:#000000;"/>
      </marker>
      <marker id="midArrow" markerWidth="13" markerHeight="13" refx="0" refy="4" orient="auto" markerUnits="strokeWidth">
        <path d="M2,2 L2,6 L8,4 L2,2" style="fill: #000000;" />
      </marker>
      <marker id="markerArrow" markerWidth="13" markerHeight="13" refX="2" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M2,2 L2,6 L8,4 L2,2" style="fill: #807E78;"></path>
      </marker>
    </defs>
    <x-canvas-link
      v-for="item in linkList"
      :linkInfo="item"
      :key="item.linkKey"
    ></x-canvas-link>
  </svg>
</template>

<script>
  import { mapState } from 'vuex'
  import CanvasLink from './CanvasLink.vue'

  export default {
    components: {
      'x-canvas-link': CanvasLink
    },
    props: {
      addLink: {
        type: Object
      }
    },
    computed: {
      ...mapState({
        linkList: state => state.flowchart.canvas.linkList
      })
    }
  }
</script>

