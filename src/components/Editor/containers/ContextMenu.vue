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

    .tool-box {
      padding: 0;

      .tool-item {
        padding: 8px 10px;
        display: flex;
        align-items: center;

        &:hover {
          color: #000000;
          background: rgba(0, 0, 0, .1);

          .tool-box {
            visibility: visible;
          }
        }

        .tool-box {
          visibility: hidden;
          position: absolute;
          top: 0;
          padding: 5px 0;
          background: #FFF;
          box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
        }
        .item-link {
          display: inline-block;
          vertical-align: middle;
          width: 100%;
        }
        .item-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 1;
        }
        .item-label {
          flex: 1 1 auto;
          margin: 0 10px;
          line-height: 1;
          min-width: 60px;
          white-space: nowrap;
        }
        .item-shortcut {
          line-height: 1;
        }
        .item-more {
          display: inline-block;
          float: right;
          width: 16px;
          line-height: 1;
        }
      }
      .divider {
        width: calc(~"100% - 10px");
      }
    }
  }
</style>

<template>
  <div class="context-menu" v-show="isShow" :style="contextMenuStyle" @click.stop.prevent>
    <ToolBox mode="vertical">
      <template v-for="(item, index) in contextMenuList">
        <ToolItem
          v-if="item.type === 'text'"
          :key="'contextmenu_item_' + index"
          :active="item.active"
          :disabled="item.disabled"
          :style="item.contextmenu.style"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'dropdown-color-picker'"
          :key="'contextmenu_item_' + index"
          :active="item.active"
          :disabled="item.disabled"
          :style="item.contextmenu.style"
          @mouseenter.native="handleItemHover"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            <div class="item-more">
              <Icon type="ios-arrow-forward"></Icon>
            </div>
          </template>
          <template v-slot:content>
            <ToolBox mode="vertical" style="padding: 0;">
              <ToolItem style="padding: 0;">
                <XColorPicker
                  slot="label"
                  v-model="formData[item.name]"
                  :preview="false"
                  @on-change="(val) => handleToolClick(item, val, null)"
                  @on-close="doHide"
                >
                </XColorPicker>
              </ToolItem>
            </ToolBox>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'dropdown-list'"
          :key="'contextmenu_item_' + index"
          :active="item.active"
          :disabled="item.disabled"
          :style="item.contextmenu.style"
          @mouseenter.native="handleItemHover"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            <div class="item-more">
              <Icon type="ios-arrow-forward"></Icon>
            </div>
          </template>
          <template v-slot:content>
            <ToolBox mode="vertical">
              <template v-for="(child, childIndex) in item.children">
                <ToolItem
                  :key="'contextmenu_item_' + index + '_child_' + childIndex"
                  :active="child.active"
                  :disabled="child.disabled"
                  @click.native="handleChildClick(item, child, childIndex)"
                >
                  <template v-slot:label>
                    <template v-if="child.type === 'normal'">
                      <div class="item-icon">
                        <XIcon :type="child.icon"></XIcon>
                      </div>
                      <span class="item-label">{{ child.lang ? $t(child.lang) : child.label }}</span>
                    </template>
                    <template v-else-if="child.type === 'link'">
                      <a class="item-link" :href="child.link" target="_blank" style="color: #333333;" @click.stop>
                        <div class="item-icon">
                          <XIcon :type="child.icon"></XIcon>
                        </div>
                        <span class="item-label">{{ child.lang ? $t(child.lang) : child.label }}</span>
                      </a>
                    </template>
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
          :active="item.active"
          :disabled="item.disabled"
          :style="item.contextmenu.style"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <a :href="item.link" target="_blank" style="color: #333333;">
              <div class="item-icon">
                <XIcon :type="item.icon"></XIcon>
              </div>
              <span class="item-label">{{ $t(item.lang) }}</span>
              <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
            </a>
          </template>
        </ToolItem>
        <ToolItem
          v-if="item.type === 'normal'"
          :key="'contextmenu_item_' + index"
          :active="item.active"
          :disabled="item.disabled"
          :style="item.contextmenu.style"
          @click.native="handleToolClick(item)"
        >
          <template v-slot:label>
            <div class="item-icon">
              <XIcon :type="item.icon"></XIcon>
            </div>
            <span class="item-label">{{ $t(item.lang) }}</span>
            <span class="item-shortcut" v-if="item.shortcuts">{{ item.shortcuts.label }}</span>
          </template>
        </ToolItem>
        <XDivider
          class="divider"
          v-if="item.contextmenu.divider"
          :key="'contextmenu' + '_divider_' + index"
          mode="horizontal"
        />
      </template>
    </ToolBox>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import ToolBox from '../components/ToolBox/Index'
  import ToolItem from '../components/ToolBox/ToolItem'
  import config from '../config'

  export default {
    name: 'ContextMenu',
    components: {
      ToolBox,
      ToolItem
    },
    data () {
      return {
        isShow: false,
        activeMenu: '',
        options: null,
        contextMenuList: [],
        formData: {
          ...config.$X
        },
        contextMenuStyle: {}
      }
    },
    computed: {
      ...mapGetters([
        'currentItem',
        'toolList'
      ])
    },
    methods: {
      handleContextMenuList () {
        const _t = this
        const contextMenuList = []
        _t.toolList.forEach(item => {
          if (item.enableTool && item.enable && item.contextmenu && item.contextmenu.enable) {
            if (!item.contextmenu.hasOwnProperty('target') || (item.contextmenu.hasOwnProperty('target') && (item.contextmenu.target.length && _t.options && _t.options.type && item.contextmenu.target.includes(_t.options.type)))) {
              contextMenuList.push(item)
            }
          }
        })
        _t.contextMenuList = contextMenuList
      },
      handleContextMenuStyle () {
        const _t = this
        const style = {}
        if (!_t.options) {
          return style
        }
        _t.$nextTick(function () {
          const x = _t.options.x !== undefined ? (parseInt(_t.options.x) > 0 ? parseInt(_t.options.x) : 0) : 0
          const y = _t.options.y !== undefined ? (parseInt(_t.options.y) > 0 ? parseInt(_t.options.y) : 0) : 0
          // 判断是否超出边界
          if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
            const winHeight = document.documentElement.clientHeight
            const winWidth = document.documentElement.clientWidth
            const elHeight = _t.$el.clientHeight
            const elWidth = _t.$el.clientWidth
            if (x + elWidth > winWidth) {
              style['right'] = '10px'
            } else {
              style['left'] = x + 'px'
            }
            if (y + elHeight > winHeight) {
              style['bottom'] = '42px'
            } else {
              style['top'] = y + 'px'
            }
          }
          _t.contextMenuStyle = style
        })
      },
      doShow (data) {
        const _t = this
        _t.options = data
        _t.handleContextMenuList()
        // 处理样式
        _t.handleContextMenuStyle()
        _t.isShow = true
      },
      doHide () {
        const _t = this
        _t.options = null
        _t.contextMenuList = []
        _t.isShow = false
      },
      handleChildClick (item, child, childIndex) {
        const _t = this
        if (child.disabled) {
          return
        }
        let payload = {
          context: 'ContextMenu',
          name: item.name,
          type: item.type,
          data: child.data,
          selected: childIndex
        }
        _t.$X.utils.bus.$emit('editor/tool/trigger', payload)
        _t.doHide()
      },
      handleToolClick (item, val) {
        const _t = this
        if (item.disabled) {
          return
        }
        let payload = {
          context: 'ContextMenu',
          name: item.name
        }
        switch (item.name) {
          case 'paste':
            payload = {
              ...payload,
              data: _t.options
            }
            break
          case 'fill':
          case 'lineColor':
            _t.formData[item.name] = val
            payload = {
              ...payload,
              data: val
            }
            break
          case 'toFront':
          case 'toBack':
            payload = {
              ...payload,
              data: _t.currentItem
            }
            break
        }
        _t.$X.utils.bus.$emit('editor/tool/trigger', payload)
        _t.doHide()
      },
      handleItemHover (event) {
        const target = event.target
        const toolBox = target.querySelector('.tool-box')
        if (toolBox && target.clientWidth) {
          toolBox.style.left = target.clientWidth + 'px'
        }
      }
    },
    created () {
      const _t = this
      _t.$X.utils.bus.$on('editor/contextmenu/open', _t.doShow)
      _t.$X.utils.bus.$on('editor/contextmenu/close', _t.doHide)
    }
  }
</script>
