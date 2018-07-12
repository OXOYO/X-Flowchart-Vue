/**
* Created by OXOYO on 2018/3/28.
*
* 右键菜单
*/

<style lang="less" rel="stylesheet/less">
  .xfc-context-menu {
    position: absolute;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, .1);
    padding: 5px 0;

    .context-menu-item {
      padding: 5px 10px 5px 40px;
      position: relative;
      cursor: default;
      border: 1px solid transparent;
      border-left: none;
      border-right: none;

      &:before {
        content: ' ';
        display: inline-block;
        position: absolute;
        top: 0;
        left: 30px;
        bottom: 0;
        width: 1px;
        background-color: #f5f7f9;
      }
      &:hover {
        /*background: #f0f0f0;*/
        background: #f3f3f3;
        /*border-color: #57a3f3;*/
        /*box-shadow: 0 0 2px 2px rgba(45, 140, 240, .2);*/

        .context-menu-child {
          display: inline-block;
        }

        >.context-menu-icon {
          transform: rotate(360deg);
          transform-origin: center center;
        }
      }
      >.context-menu-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        height: 12px;
        width: 12px;
        margin-top: -6px;
        font-size: 12px;
        transition: all .5s ease-in .1s;
        display: inline-block;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 12px;
        -webkit-font-smoothing: antialiased;
      }
      .context-menu-label {
        display: inline-block;
        position: relative;
        width: 100%;
        text-align: left;
        height: 22px;
        line-height: 22px;

        .context-menu-label-text {
          display: inline-block;
          font-size: 14px;
          text-align: left;
        }
        .context-menu-icon-child {
          display: inline-block;
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -0.5em;
        }
      }
      .context-menu-child {
        position: absolute;
        z-index: 1;
        display: none;
        background: #fff;
        right: 0;
        top: 0;
        box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
        padding: 5px 0;
      }
    }
  }
</style>

<template>
  <div
    v-if="contextMenuInfo.isShow"
    class="xfc-context-menu"
    :style="contextMenuStyle"
    @mousedown.stop.prevent
    @click.stop.prevent
  >
    <!-- FIXME 可以考虑自定义菜单的实现 -->
    <!--
    <template
      v-if="contextMenuInfo.list && contextMenuInfo.list.length"
      v-for="item in contextMenuInfo.list"
    >
    -->
    <ContextMenuItem
      v-if="contextMenuInfo.list && contextMenuInfo.list.length"
      v-for="(item, index) in contextMenuInfo.list"
      :info="item"
      :key="index"
    >
      <div
        v-if="item.children && item.children.length"
        class="context-menu-child"
        :style="item.childrenStyle"
        slot="child"
      >
        <ContextMenuItem
          v-for="childItem in item.children"
          :info="childItem"
          :key="childItem.name"
        >
        </ContextMenuItem>
      </div>
    </ContextMenuItem>
    <!--</template>-->
  </div>
</template>

<script>
import ContextMenuItem from './ContextMenuItem.vue'
import utils from '@/global/utils'

export default {
  name: 'XFCContextMenu',
  components: {
    ContextMenuItem
  },
  data () {
    return {
      contextMenuInfo: {
        x: 0,
        y: 0,
        isShow: false
      }
    }
  },
  computed: {
    contextMenuStyle: function () {
      let _t = this
      let x = _t.contextMenuInfo.x !== undefined ? (parseInt(_t.contextMenuInfo.x) > 0 ? parseInt(_t.contextMenuInfo.x) : 0) : 0
      let y = _t.contextMenuInfo.y !== undefined ? (parseInt(_t.contextMenuInfo.y) > 0 ? parseInt(_t.contextMenuInfo.y) : 0) : 0
      let tmpObj = {}
      // 判断是否超出边界
      if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        let winHeight = document.documentElement.clientHeight
        let winWidth = document.documentElement.clientWidth
        if (x + 200 > winWidth) {
          tmpObj['right'] = '10px'
        } else {
          tmpObj['left'] = x + 'px'
        }
        if (y + 100 > winHeight) {
          tmpObj['bottom'] = '42px'
        } else {
          tmpObj['top'] = y + 'px'
        }
      }
      return tmpObj
    }
  },
  created: function () {
    let _t = this
    // 监听菜单打开
    utils.bus.$on('XFC/contextMenu/show', function (val) {
      console.log('contextMenu show data', val)
      if (val) {
        _t.contextMenuInfo = val
      }
      _t.contextMenuInfo.isShow = true
    })
    utils.bus.$on('XFC/contextMenu/hide', function (val) {
      console.log('contextMenu hide data', val)
      // 重置 contextMenuInfo
      _t.contextMenuInfo = {
        x: 0,
        y: 0,
        isShow: false
      }
    })
  },
  beforeDestroy: function () {
    // let _t = this
    utils.bus.$off([
      'XFC/contextMenu/show',
      'XFC/contextMenu/hide'
    ])
  }
}
</script>
