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

    .tool-box {
      padding: 0;

      .tool-item {
        padding: 5px 10px;

        &:hover {
          color: #000000;
          background: rgba(0, 0, 0, .1);
        }

        .tool-box {
          padding: 5px 0;
          background: #FFF;
          box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
        }

        .item-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }
        .item-label {}
        .item-more {
          display: inline-block;
          float: right;
          width: 16px;
          height: 16px;
        }
      }
      .divider {
        width: calc(~"100% - 10px");
      }
    }
  }
</style>

<template>
  <div class="context-menu" v-show="isShow" :style="contextMenuStyle">
    <ToolBox mode="vertical">
      <template v-for="(item, index) in contextMenuList">
        <ToolItem
          v-if="item.type === 'text'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'dropdown-list'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @mouseenter.native="handleItemHover"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <div class="item-more">
              <Icon type="ios-arrow-forward"></Icon>
            </div>
          </template>
          <template v-slot:content>
            <ToolBox mode="vertical">
              <template v-for="(child, childIndex) in item.children">
                <ToolItem
                  v-if="child.type === 'normal'"
                  :key="'contextmenu_item_' + index + '_child_' + childIndex"
                  :title="$t(child.lang)"
                  :active="child.active"
                  :disabled="child.disabled"
                  @click.native="handleChildClick(item, child)"
                >
                  <template v-slot:label>
                    <div class="item-icon">
                      <XIcon :type="child.icon"></XIcon>
                    </div>
                    <span class="item-label">{{ child.lang ? $t(child.lang) : child.label }}</span>
                  </template>
                </ToolItem>
                <XDivider
                  class="divider"
                  v-if="child.divider"
                  :key="'contextmenu' + '_divider_' + index + '_child_' + childIndex"
                  mode="horizontal"
                />
              </template>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'link'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <a :href="item.link" target="_blank" style="color: #333333;">
              <div class="item-icon">
                <XIcon :type="item.icon"></XIcon>
              </div>
              <span class="item-label">{{ $t(item.lang) }}</span>
            </a>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'normal'"
          :key="'contextmenu_item_' + index"
          :title="$t(item.lang)"
          :active="item.active"
          :disabled="item.disabled"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
          </template>
        </ToolItem>
        <XDivider
          class="divider"
          v-if="item.divider"
          :key="'contextmenu' + '_divider_' + index"
          mode="horizontal"
        />
      </template>
    </ToolBox>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ToolBox from '../../ToolBox/Index'
  import ToolItem from '../../ToolBox/ToolItem'

  export default {
    name: 'ContextMenu',
    components: {
      ToolBox,
      ToolItem
    },
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
          if (item.enable && item.contextmenu && item.contextmenu.enable) {
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
      handleChildClick (item, child) {
        let _t = this
        if (child.disabled) {
          return
        }
        let payload = null
        switch (item.name) {
          case 'lineWidth':
          case 'lineType':
          case 'lineStyle':
          case 'download':
            payload = {
              name: item.name,
              data: child.name
            }
            break
          case 'zoom':
          case 'startArrow':
          case 'endArrow':
            payload = {
              name: item.name,
              data: child.data
            }
            break
          case 'language':
            // 更新cookie
            let cookieKey = _t.$X.config.cookie.getItem('locale')
            _t.$X.Cookies.set(cookieKey, child.name, {
              expires: 7,
              path: _t.$X.config.cookie.path
            })
            _t.$i18n.locale = _t.$X.langs.locale = child.name
            break
        }
        if (payload) {
          _t.$X.utils.bus.$emit('editor/tool/trigger', payload)
        }
      },
      handleToolClick (item) {
        let _t = this
        if (item.disabled) {
          return
        }
        _t.$X.utils.bus.$emit('editor/tool/trigger', {
          name: item.name,
          data: _t.currentItem
        })
        _t.doHide()
      },
      handleItemHover (event) {
        let target = event.target
        let toolBox = target.querySelector('.tool-box')
        if (toolBox && target.clientWidth) {
          toolBox.style.left = target.clientWidth + 'px'
        }
      }
    },
    created () {
      let _t = this
      _t.$X.utils.bus.$on('editor/contextmenu/open', _t.doShow)
      _t.$X.utils.bus.$on('editor/contextmenu/close', _t.doHide)
    }
  }
</script>
