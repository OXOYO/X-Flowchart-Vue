/**
* Created by OXOYO on 2018/3/21.
*
* 元素列表组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_list {
    position: absolute;
    top: 0px;
    bottom: 0;
    left: 0;
    /*width: 400px;*/
    /*margin-left: -400px;*/
    padding-top: 50px;
    border-right: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
    box-shadow: 2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;

    &.block_expand {
      margin-left: 0;
    }

    &:hover {
      .handler {
        margin-right: -10px;
      }
    }

    .block_header {
      width: 100%;
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid #dddddd;
      text-align: left;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-left: 20px;
        display: inline-block;
      }
    }
    .block_body {
      position: absolute;
      top: 90px;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 20px 10px;
      z-index: 2000;
      background: #ffffff;
      overflow-y: auto;

      .list_item {
        height: 20px;
        line-height: 20px;
        padding: 10px;
        margin: 5px;
        border-bottom: 1px solid;
      }
    }
  }
</style>

<template>
  <div :class="{'xfc_list': true, 'block_expand': isExpand}" :style="computedStyle">
    <div class="block_header">
      <div class="title">
        资源列表
      </div>
    </div>
    <div class="block_body">
      <slot>
        <XFCListItem></XFCListItem>
      </slot>
    </div>
    <XFCHandler class="handler" mode="vertical" position="right" :expand="isExpand" :callback="toggleHandler"></XFCHandler>
  </div>
</template>

<script>
import XFCListItem from './components/ListItem.vue'
import XFCHandler from '@/global/components/Handler.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XFCList',
  components: {
    XFCListItem,
    XFCHandler
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.list
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true
    }
  },
  computed: {
    computedStyle: function () {
      let _t = this
      return {
        ..._t.config.style,
        'margin-left': _t.isExpand ? 0 : _t.config.style['margin-left']
      }
    }
  },
  methods: {
    // 切换handler显示/隐藏
    toggleHandler: function (val) {
      let _t = this
      _t.isExpand = val !== undefined ? val : !_t.isExpand
      _t.$nextTick(function () {
        let elWidth = _t.isExpand ? _t.$el.offsetWidth : 0
        // 广播事件
        utils.bus.$emit('XFC/expand/toggle/single', {
          position: 'left',
          val: {
            left: elWidth
          }
        })
      })
    }
  },
  created: function () {
    let _t = this
    console.log('List Config::', _t.config)
    // 监听事件
    utils.bus.$on('XFC/expand/toggle/all', function (val) {
      _t.toggleHandler(val)
    })
  }
}
</script>
