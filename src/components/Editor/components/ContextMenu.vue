/**
* Created by OXOYO on 2019/7/1.
*
* ContextMenu 右键菜单
*/

<style scoped lang="less" rel="stylesheet/less">
  .context-menu {
    position: absolute;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
    padding: 5px 0;
    z-index: 999;

    .menu-item {
      padding: 5px 20px;

      &:hover {
        background: rgba(0, 0, 0, .1);
      }

      .item-icon {
        margin-right: 10px;
      }
      .item-label {}
    }
  }
</style>

<template>
  <div class="context-menu" v-show="isShow" :style="contextMenuStyle">
    <Menu :active-name="activeMenu" @on-select="handleContextmenuTrigger">
      <MenuItem
        v-for="(item, index) in contextMenuList"
        :key="'menu_item_' + index"
        :name="item.name"
        class="menu-item"
      >
        <XIcon :type="item.icon" class="item-icon"></XIcon>
        <span class="item-label">{{ $t(item.lang) }}</span>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ContextMenu',
    props: {
      toolList: {
        type: Array,
        rquired: true
      }
    },
    data () {
      return {
        isShow: false,
        activeMenu: '',
        options: null,
        contextMenuList: []
      }
    },
    computed: {
      ...mapGetters([
        'currentItem'
      ]),
      contextMenuStyle: function () {
        let _t = this
        let style = {}
        if (!_t.options) {
          return style
        }
        let x = _t.options.x !== undefined ? (parseInt(_t.options.x) > 0 ? parseInt(_t.options.x) : 0) : 0
        let y = _t.options.y !== undefined ? (parseInt(_t.options.y) > 0 ? parseInt(_t.options.y) : 0) : 0
        // 判断是否超出边界
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
          let winHeight = document.documentElement.clientHeight
          let winWidth = document.documentElement.clientWidth
          if (x + 200 > winWidth) {
            style['right'] = '10px'
          } else {
            style['left'] = x + 'px'
          }
          if (y + 100 > winHeight) {
            style['bottom'] = '42px'
          } else {
            style['top'] = y + 'px'
          }
        }
        return style
      }
    },
    methods: {
      handleContextMenuList () {
        let _t = this
        let contextMenuList = []
        _t.toolList.forEach(item => {
          if (item.contextmenu && item.contextmenu.enable) {
            if (!item.contextmenu.hasOwnProperty('target') || (item.contextmenu.hasOwnProperty('target') && (item.contextmenu.target.length && _t.options && _t.options.type && item.contextmenu.target.includes(_t.options.type)))) {
              contextMenuList.push(item)
            }
          }
        })
        _t.contextMenuList = contextMenuList
      },
      doShow (data) {
        let _t = this
        _t.options = data
        _t.handleContextMenuList()
        _t.isShow = true
      },
      doHide () {
        let _t = this
        _t.options = null
        _t.contextMenuList = []
        _t.isShow = false
      },
      handleContextmenuTrigger (name) {
        let _t = this
        _t.$X.utils.bus.$emit('editor/tool/trigger', {
          name: name,
          data: _t.currentItem
        })
        _t.doHide()
      }
    },
    created () {
      let _t = this
      _t.$X.utils.bus.$on('editor/contextmenu/open', _t.doShow)
      _t.$X.utils.bus.$on('editor/contextmenu/close', _t.doHide)
    }
  }
</script>
