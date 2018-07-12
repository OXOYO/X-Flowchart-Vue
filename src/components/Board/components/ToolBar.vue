/**
* Created by OXOYO on 2018/3/27.
*
* 画板工具栏
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_tool-bar {
    display: inline-block;
    position: absolute;
    z-index: 2500;
    background: #ffffff;
    border: 1px solid #dddddd;
    overflow: hidden;
    transition: all .5s ease-in .1s;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);

    .bar-list {
      display: inline-block;

      .bar-item {
        position: relative;
        /*width: 40px;*/
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding: 5px;

        +.bar-item {
          &:before {
            content: ' ';
            width: 20px;
            height: 1px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -10px;
            background: #dddddd;
            display: inline-block;
          }
        }

        .iconfont {
          width: 20px;
          height: 20px;
          line-height: 20px;
          /*padding: 5px;*/
          display: inline-block;
          color: #333333;

          &:hover {
            color: #2d8cf0;
          }
        }
      }
    }
  }
</style>

<template>
  <div
    class="xfc_tool-bar"
    :style="style"
    @dblclick.stop.prevent
    @contextmenu.stop.prevent
    @mousedown.stop.prevent
  >
    <div class="bar-list">
      <div
        class="bar-item"
        v-for="(item, index) in barList"
        v-if="item.enable" :key="index"
        @contextmenu.stop.prevent
        @mousedown.stop.prevent
        @click.stop.prevent="triggerBarItem(item)"
      >
        <XUITooltip
          v-if="item.toolTip && item.toolTip.enable && item.toolTip.content"
          transfer
          :placement="toolTip.placement[config.position]"
          :content="item.toolTip.content"
        >
          <XFCIcon :type="item.icon" :title="item.text"></XFCIcon>
        </XUITooltip>
        <XFCIcon v-else :type="item.icon" :title="item.text"></XFCIcon>
      </div>
    </div>
  </div>
</template>

<script>
import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XFCToolBar',
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board.toolBar
      }
    },
    // 是否展开
    expand: {
      type: Boolean,
      default: true
    }
  },
  data () {
    let _t = this
    return {
      // 默认工具列表
      defBarList: [
        {
          name: 'expand',
          text: '展开',
          icon: 'expand',
          category: 'expand',
          enable: true,
          action: {
            type: 'bus',
            handler: 'XFC/expand/toggle/all',
            params: false
          },
          toolTip: {
            enable: false,
            content: ''
          }
        },
        {
          name: 'fold',
          text: '折叠',
          icon: 'fold',
          category: 'expand',
          enable: true,
          action: {
            type: 'bus',
            handler: 'XFC/expand/toggle/all',
            params: true
          },
          toolTip: {
            enable: false,
            content: ''
          }
        },
        {
          name: 'zoom-in',
          text: '放大',
          icon: 'zoom-in',
          category: 'zoom',
          enable: true,
          action: {
            type: 'bus',
            handler: 'XFC/canvas/zoom',
            params: {
              type: 'zoom-in',
              callback: (content) => {
                _t.handleToolTipContent('zoom', content)
              }
            }
          },
          toolTip: {
            enable: true,
            content: ''
          }
        },
        {
          name: 'zoom-reset',
          text: '还原',
          icon: 'zoom',
          category: 'zoom',
          enable: true,
          action: {
            type: 'bus',
            handler: 'XFC/canvas/zoom',
            params: {
              type: 'zoom-reset',
              callback: (content) => {
                _t.handleToolTipContent('zoom', content)
              }
            }
          },
          toolTip: {
            enable: true,
            content: ''
          }
        },
        {
          name: 'zoom-out',
          text: '缩小',
          icon: 'zoom-out',
          category: 'zoom',
          enable: true,
          action: {
            type: 'bus',
            handler: 'XFC/canvas/zoom',
            params: {
              type: 'zoom-out',
              callback: (content) => {
                _t.handleToolTipContent('zoom', content)
              }
            }
          },
          toolTip: {
            enable: true,
            content: ''
          }
        }
      ],
      // 工具列表
      barList: [],
      // 工具栏默认样式，// 位置，可选值 top-left || top-right || bottom-right || bottom-left
      defStyle: {
        'top-left': {
          top: '100px',
          left: '450px'
        },
        'top-right': {
          top: '100px',
          right: '450px'
        },
        'bottom-right': {
          bottom: '100px',
          right: '450px'
        },
        'bottom-left': {
          bottom: '100px',
          left: '450px'
        }
      },
      // 工具栏样式
      style: {},
      // 工具栏与其他面板间距, 默认50px
      distance: 50,
      toolTip: {
        placement: {
          'top-left': 'right',
          'top-right': 'left',
          'bottom-right': 'left',
          'bottom-left': 'right'
        }
      }
    }
  },
  watch: {
    expand: function (val) {
      let _t = this
      console.log('isExpand', val)
      // 处理barList
      _t.handleBarList(val)
    }
  },
  methods: {
    // 初始化
    init: function () {
      let _t = this
      // 计算样式
      _t.style = {
        ..._t.defStyle[_t.config.position],
        ..._t.config.style
      }
      // 处理barList
      _t.handleBarList(_t.expand)
    },
    // 处理barList
    handleBarList: function (isExpand) {
      let _t = this
      // 处理barList
      let tmpArr = _t.defBarList.filter(item => {
        if (item.category === 'expand') {
          if (isExpand) {
            if (item.name === 'expand') {
              return item
            }
          } else {
            if (item.name === 'fold') {
              return item
            }
          }
        } else {
          return item
        }
      })
      _t.barList = tmpArr
    },
    // 触发菜单
    triggerBarItem: function (info) {
      console.log('triggerBarItem', info.text, info.name)
      // 执行菜单相应操作
      if (info && info.action && info.action.type) {
        switch (info.action.type) {
          case 'bus':
            console.log('info.action.handler', info.action.handler)
            utils.bus.$emit(info.action.handler, info.action.params)
            break
        }
      }
    },
    // 处理toolTip content
    handleToolTipContent: function (category, content) {
      let _t = this
      _t.barList.map(item => {
        if (item.category === category) {
          item.toolTip.content = content
        }
        return item
      })
    }
  },
  created: function () {
    let _t = this
    // 初始化
    _t.init()
    // 监听事件
    utils.bus.$on('XFC/expand/toggle/single', function (data) {
      let tmpObj = {}
      if (data && data.position) {
        switch (_t.config.position) {
          case 'top-left':
            if (data.position === 'top') {
              tmpObj = {
                top: data.val.top + _t.distance + 'px',
                left: _t.style.left
              }
            } else if (data.position === 'left') {
              tmpObj = {
                top: _t.style.top,
                left: data.val.left + _t.distance + 'px'
              }
            }
            break
          case 'top-right':
            if (data.position === 'top') {
              tmpObj = {
                top: data.val.top + _t.distance + 'px',
                right: _t.style.right
              }
            } else if (data.position === 'right') {
              tmpObj = {
                top: _t.style.top,
                right: data.val.right + _t.distance + 'px'
              }
            }
            break
          case 'bottom-right':
            if (data.position === 'bottom') {
              tmpObj = {
                bottom: data.val.bottom + _t.distance + 'px',
                right: _t.style.right
              }
            } else if (data.position === 'right') {
              tmpObj = {
                bottom: _t.style.bottom,
                right: data.val.right + _t.distance + 'px'
              }
            }
            break
          case 'bottom-left':
            if (data.position === 'bottom') {
              tmpObj = {
                bottom: data.val.bottom + _t.distance + 'px',
                left: _t.style.left
              }
            } else if (data.position === 'left') {
              tmpObj = {
                bottom: _t.style.bottom,
                left: data.val.left + _t.distance + 'px'
              }
            }
            break
        }
        if (Object.keys(tmpObj).length) {
          _t.style = tmpObj
        }
      }
    })
  }
}
</script>
