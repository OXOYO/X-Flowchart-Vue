/**
* Created by OXOYO on 2019/5/29.
*
* Tooltip
*/

<style scoped lang="less" rel="stylesheet/less">
  .tooltip-box {
    position: relative;
    cursor: default;

    &.hover {
      .tooltip {
        visibility: visible;
      }
    }

    .tooltip {
      visibility: hidden;
      background: #222;
      color: #fff;
      white-space: nowrap;
      padding: 6px 8px;
      line-height: 16px;
      min-height: 16px;
      vertical-align: bottom;
      max-width: 200px;
      text-overflow: ellipsis;
      font-size: 12px;
      position: absolute;
      top: -45px;
      left: 50%;

      &:after {
        content: "";
        position: absolute;
        border-top: 5px solid #222;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        bottom: -5px;
        left: 50%;
        margin-left: -5px;
      }
    }
    .content {
      display: inline-block;
    }
  }
</style>

<template>
  <div
    ref="tooltipBox"
    :class="{ 'tooltip-box': true, 'hover': isShow }"
    @mouseover="handleMouseOver"
    @mouseout="handleMouseOut"
  >
    <div ref="tooltip" class="tooltip" :style="tooltipStyle">
      <slot name="content">{{ content }}</slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tooltip',
    props: {
      content: [String, Number]
    },
    data () {
      return {
        isShow: false,
        tooltipStyle: {}
      }
    },
    methods: {
      handleMouseOver () {
        this.isShow = true
      },
      handleMouseOut () {
       this.isShow = false
      }
    },
    mounted () {
      let _t = this
      let el = _t.$refs.tooltip
      let marginLeft = el.clientWidth ? el.clientWidth / -2 : 0
      if (marginLeft) {
        _t.tooltipStyle = {
          'margin-left': marginLeft + 'px'
        }
      }
    }
  }
</script>
