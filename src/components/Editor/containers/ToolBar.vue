/**
* Created by OXOYO on 2019/7/1.
*
* ToolBar 工具栏
*/

<style scoped lang="less" rel="stylesheet/less">
  .tool-bar {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    width: 100%;
    padding: 0 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);
    background: #ffffff;
    z-index: 500;
    transition: all .5s ease-in-out;

    .tool-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-content: flex-start;
      flex: 1 1 auto;
      z-index: 10;

      &.left {
        justify-content: flex-start;
      }
      &.center {
        justify-content: center;
      }
      &.right {
        justify-content: flex-end;
      }
      .tool-item {
        display: inline-block;
      }
    }
  }
</style>

<template>
  <div class="tool-bar" :style="toolBarStyle">
    <Handler
      class="handler"
      mode="horizontal"
      position="bottom"
      :expand="isExpand"
      :callback="toggleHandler"
    >
    </Handler>
    <template v-for="(type, typeIndex) in Object.keys(toolMap)">
      <ToolBox :key="typeIndex" :class="type">
        <template v-for="(item, index) in toolMap[type].filter(target => target.enable)">
          <ToolItem
            v-if="item.type === 'text'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item, type)"
          >
            <template v-slot:label>
              <XIcon v-if="item.icon" :type="item.icon"></XIcon>
              <span v-else>{{ $t(item.lang) }}</span>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'dropdown-color-picker'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
          >
            <template v-slot:label>
              <template v-if="item.disabled">
                <div style="margin: 0 3px;">
                  <XIcon
                    :type="item.icon"
                    style="vertical-align: middle;"
                  >
                  </XIcon>
                  <Icon type="ios-arrow-down"></Icon>
                </div>
              </template>
              <template v-else>
                <Dropdown trigger="click" @on-click="(val) => handleDropdownClick(item, type, val)">
                  <div style="margin: 0 3px;">
                    <XIcon
                      :type="item.icon"
                      style="vertical-align: middle;"
                    >
                    </XIcon>
                    <Icon type="ios-arrow-down"></Icon>
                  </div>
                  <SketchPicker slot="list" :value="formData[item.name]" @input="(val) => handleToolClick(item, type, val)"></SketchPicker>
                </Dropdown>
              </template>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'dropdown-list'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
          >
            <template v-slot:label>
              <template v-if="item.disabled">
                <div style="margin: 0 3px;">
                  <XIcon
                    :type="item.children[item.selected].icon"
                    style="vertical-align: middle;"
                    :style="item.children[item.selected].style"
                  >
                  </XIcon>
                  <Icon type="ios-arrow-down"></Icon>
                </div>
              </template>
              <template v-else>
                <Dropdown trigger="click" @on-click="(val) => handleDropdownClick(item, type, val)">
                  <div style="margin: 0 3px;">
                    <XIcon
                      :type="item.children[item.selected].icon || item.icon"
                      style="vertical-align: middle;"
                      :style="item.children[item.selected].style"
                    >
                    </XIcon>
                    <Icon type="ios-arrow-down"></Icon>
                  </div>
                  <DropdownMenu slot="list">
                    <DropdownItem
                      v-for="(child, childIndex) in item.children"
                      :key="childIndex"
                      :name="childIndex"
                      :disabled="child.disabled"
                      :divided="child.divided"
                      :selected="item.selected === childIndex"
                    >
                      <template v-if="child.icon">
                        <XIcon :type="child.icon" :title="$t(child.lang)" :style="child.style"></XIcon>
                      </template>
                      <template v-else>
                        <span>{{ child.lang ? $t(child.lang) : child.label }}</span>
                      </template>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'link'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item, type)"
          >
            <template v-slot:label>
              <a :href="item.link" target="_blank" style="color: #333333;">
                <XIcon v-if="item.icon" :type="item.icon"></XIcon>
                <span v-else>{{ $t(item.lang) }}</span>
              </a>
            </template>
          </ToolItem>
          <ToolItem
            v-if="item.type === 'normal'"
            :key="'tool_' + type + '_item_' + index"
            :title="$t(item.lang)"
            :active="item.active"
            :disabled="item.disabled"
            @click.native="handleToolClick(item, type)"
          >
            <template v-slot:label>
              <XIcon v-if="item.icon" :type="item.icon"></XIcon>
              <span v-else>{{ $t(item.lang) }}</span>
            </template>
          </ToolItem>
          <Divider :key="'tool_' + type + '_divider_' + index" v-if="item.divider" type="vertical" style="height: 100%;" />
        </template>
      </ToolBox>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  import Handler from '../components/Handler'
  import ToolBox from '../../ToolBox/Index'
  import ToolItem from '../../ToolBox/ToolItem'
  import config from '../config/index'

  export default {
    name: 'ToolBar',
    components: {
      Handler,
      ToolBox,
      ToolItem
    },
    data () {
      return {
        // 模式
        mode: 'edit',
        // 选中的值
        selected: {
          zoom: 0,
          lineWidth: 0,
          lineType: 0,
          lineStyle: 0,
          startArrow: 0,
          endArrow: 0,
          language: 0
        },
        formData: {
          ...config.$X
        },
        // 是否展开
        isExpand: true
      }
    },
    computed: {
      ...mapGetters([
        'currentItem'
      ]),
      toolBarStyle () {
        let _t = this
        let style = {}
        // 处理展开
        if (_t.isExpand) {
          style.top = 0
        } else {
          style.top = '-40px'
        }
        return style
      },
      toolMap () {
        let _t = this
        return {
          left: [
            {
              name: 'logo',
              label: 'logo',
              lang: 'L10000',
              type: 'text',
              icon: '',
              enable: true,
              divider: false
            }
          ],
          center: [
            {
              name: 'undo',
              label: 'Undo',
              lang: 'L10001',
              type: 'normal',
              icon: 'undo',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'redo',
              label: 'Redo',
              lang: 'L10002',
              type: 'normal',
              icon: 'redo',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true
            },
            {
              name: 'copy',
              label: 'Copy',
              lang: 'L10003',
              type: 'normal',
              icon: 'copy',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'paste',
              label: 'Paste',
              lang: 'L10004',
              type: 'normal',
              icon: 'paste',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'clear',
              label: 'Clear',
              lang: 'L10005',
              type: 'normal',
              icon: 'clear',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true
            },
            {
              name: 'zoom',
              label: 'Zoom',
              lang: 'L10029',
              type: 'dropdown-list',
              icon: 'zoom',
              enable: true,
              disabled: false,
              divider: false,
              // 默认选中项index
              selected: _t.selected.zoom,
              // 子节点
              children: [
                {
                  name: '25%',
                  label: '25%',
                  lang: '',
                  icon: '',
                  data: 0.25,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '50%',
                  label: '50%',
                  lang: '',
                  icon: '',
                  data: 0.5,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '75%',
                  label: '75%',
                  lang: '',
                  icon: '',
                  data: 0.75,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '100%',
                  label: '100%',
                  lang: '',
                  icon: '',
                  data: 1,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '125%',
                  label: '125%',
                  lang: '',
                  icon: '',
                  data: 1.25,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '150%',
                  label: '150%',
                  lang: '',
                  icon: '',
                  data: 1.5,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '200%',
                  label: '200%',
                  lang: '',
                  icon: '',
                  data: 2,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '300%',
                  label: '300%',
                  lang: '',
                  icon: '',
                  data: 3,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: '400%',
                  label: '400%',
                  lang: '',
                  icon: '',
                  data: 4,
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'zoomIn',
              label: 'Zoom In',
              lang: 'L10006',
              type: 'normal',
              icon: 'zoom-in',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'zoomOut',
              label: 'Zoom Out',
              lang: 'L10007',
              type: 'normal',
              icon: 'zoom-out',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'fit',
              label: 'Fit',
              lang: 'L10008',
              type: 'normal',
              icon: 'fit',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'actualSize',
              label: 'Actual Size',
              lang: 'L10009',
              type: 'normal',
              icon: 'actual-size',
              enable: true,
              disabled: false,
              divider: true
            },
            {
              name: 'fill',
              label: 'fill',
              lang: 'L10011',
              type: 'dropdown-color-picker',
              icon: 'fill',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'lineColor',
              label: 'line color',
              lang: 'L10012',
              type: 'dropdown-color-picker',
              icon: 'line-color',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'lineWidth',
              label: 'line width',
              lang: 'L10013',
              type: 'dropdown-list',
              icon: 'line-width',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false,
              // 默认选中项index
              selected: _t.selected.lineWidth,
              // 子节点
              children: [
                {
                  name: 1,
                  label: '1px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 2,
                  label: '2px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 3,
                  label: '3px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 4,
                  label: '4px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 5,
                  label: '5px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 6,
                  label: '6px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 7,
                  label: '7px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 8,
                  label: '8px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 9,
                  label: '9px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 10,
                  label: '10px',
                  lang: '',
                  icon: '',
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'lineStyle',
              label: 'line style',
              lang: 'L10014',
              type: 'dropdown-list',
              icon: 'line-style',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true,
              // 默认选中项index
              selected: _t.selected.lineStyle,
              // 子节点
              children: [
                {
                  name: 'solid',
                  label: 'solid',
                  lang: '',
                  icon: 'solid',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'dashed',
                  label: 'dashed',
                  lang: '',
                  icon: 'dashed',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'dot',
                  label: 'dot',
                  lang: '',
                  icon: 'dot',
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'lineType',
              label: 'line type',
              lang: 'L10015',
              type: 'dropdown-list',
              icon: '',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false,
              // 默认选中项index
              selected: _t.selected.lineType,
              // 子节点
              children: [
                {
                  name: 'x-line',
                  label: 'line',
                  lang: '',
                  icon: 'flow-line',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'x-broken',
                  label: 'broken',
                  lang: '',
                  icon: 'flow-broken',
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'x-cubic',
                  label: 'cubic',
                  lang: '',
                  icon: 'flow-curve',
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'startArrow',
              label: 'start arrow',
              lang: 'L10016',
              type: 'dropdown-list',
              icon: '',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false,
              // 默认选中项index
              selected: _t.selected.startArrow,
              // 子节点
              children: [
                {
                  name: 'none',
                  label: 'none',
                  lang: '',
                  icon: 'solid',
                  style: {},
                  data: false,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'solidArrow',
                  label: 'solid arrow',
                  lang: '',
                  icon: 'solid-arrow',
                  style: {},
                  data: {
                    path: 'M 10,0 L -10,-10 L -10,10 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'normalArrow',
                  label: 'normal arrow',
                  lang: '',
                  icon: 'normal-arrow',
                  style: {},
                  data: {
                    path: 'M 10,0 L -10,-10 L -11,-9 L 9,0 L-11,9 L -10,10 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'asynchArrow',
                  label: 'asynch arrow',
                  lang: '',
                  icon: 'asynch-arraw',
                  style: {},
                  data: {
                    path: 'M 10,0 L -10,-10 L -11,-9 L 9,0 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'endArrow',
              label: 'end arrow',
              lang: 'L10017',
              type: 'dropdown-list',
              icon: '',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true,
              // 默认选中项index
              selected: _t.selected.endArrow,
              // 子节点
              children: [
                {
                  name: 'none',
                  label: 'none',
                  lang: '',
                  icon: 'solid',
                  style: {},
                  data: false,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'solidArrow',
                  label: 'solid arrow',
                  lang: '',
                  icon: 'solid-arrow',
                  style: {
                    display: 'inline-block',
                    transform: 'rotate(180deg)'
                  },
                  data: {
                    path: 'M 10,0 L -10,-10 L -10,10 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'normalArrow',
                  label: 'normal arrow',
                  lang: '',
                  icon: 'normal-arrow',
                  style: {
                    display: 'inline-block',
                    transform: 'rotate(180deg)'
                  },
                  data: {
                    path: 'M 10,0 L -10,-10 L -11,-9 L 9,0 L-11,9 L -10,10 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'asynchArrow',
                  label: 'asynch arrow',
                  lang: '',
                  icon: 'asynch-arraw',
                  style: {
                    display: 'inline-block',
                    transform: 'rotate(180deg)'
                  },
                  data: {
                    path: 'M 10,0 L -10,-10 L -11,-9 L 9,0 Z',
                    d: 10
                  },
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            },
            {
              name: 'toFront',
              label: 'To Front',
              lang: 'L10018',
              type: 'normal',
              icon: 'to-front',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'toBack',
              label: 'To Back',
              lang: 'L10019',
              type: 'normal',
              icon: 'to-back',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true
            },
            {
              name: 'marquee',
              label: 'Marquee',
              lang: 'L10020',
              type: 'normal',
              icon: 'marquee',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'group',
              label: 'Group',
              lang: 'L10021',
              type: 'normal',
              icon: 'group',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: false
            },
            {
              name: 'ungroup',
              label: 'Ungroup',
              lang: 'L10022',
              type: 'normal',
              icon: 'ungroup',
              enable: true,
              disabled: _t.mode === 'preview',
              divider: true
            },
            {
              name: 'edit',
              label: 'edit',
              lang: 'L10023',
              type: 'normal',
              icon: 'edit',
              enable: _t.mode === 'preview',
              disabled: false,
              divider: false
            },
            {
              name: 'preview',
              label: 'preview',
              lang: 'L10024',
              type: 'normal',
              icon: 'preview',
              enable: _t.mode === 'edit',
              disabled: false,
              divider: false
            },
            {
              name: 'fullscreen',
              label: 'fullscreen',
              lang: 'L10025',
              type: 'normal',
              icon: 'full-screen',
              enable: true,
              disabled: false,
              divider: false
            },
            {
              name: 'language',
              label: 'language',
              lang: 'L10026',
              type: 'dropdown-list',
              icon: 'language',
              enable: true,
              disabled: false,
              divider: false,
              // 默认选中项index
              selected: _t.selected.language,
              // 子节点
              children: [
                {
                  name: 'zh-CN',
                  label: '简体中文',
                  lang: '',
                  icon: '',
                  style: {},
                  data: false,
                  enable: true,
                  disabled: false,
                  divider: false
                },
                {
                  name: 'en-US',
                  label: 'English',
                  lang: '',
                  icon: '',
                  style: {},
                  data: false,
                  enable: true,
                  disabled: false,
                  divider: false
                }
              ]
            }
          ],
          right: [
            {
              name: 'github',
              label: 'github',
              lang: 'L10027',
              type: 'link',
              icon: 'github',
              link: _t.$X.config.system.github,
              enable: true,
              divider: false
            },
            {
              name: 'feedback',
              label: 'feedback',
              lang: 'L10028',
              type: 'link',
              icon: 'feedback',
              link: _t.$X.config.system.feedback,
              enable: true,
              divider: false
            }
          ]
        }
      }
    },
    methods: {
      toggleHandler (val) {
        let _t = this
        _t.isExpand = val !== undefined ? val : !_t.isExpand
      },
      handleDropdownClick (item, type, val) {
        let _t = this
        console.log('item', item, type, val)
        _t.selected[item.name] = val
        let child = item.children[val]
        _t.formData[item.name] = child.name
        let payload = null
        switch (item.name) {
          case 'lineWidth':
          case 'lineType':
          case 'lineStyle':
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
      handleToolClick (item, type, val) {
        let _t = this
        if (item.disabled) {
          return
        }
        console.log('MaterialsEditor tool click', item.name, type, val)
        if (type === 'center') {
          let data = {}
          switch (item.name) {
            case 'edit':
              _t.mode = 'edit'
              break
            case 'preview':
              _t.mode = 'preview'
              break
            case 'fill':
            case 'lineColor':
              let color = val.hex8
              _t.formData[item.name] = color
              data = color
              break
            case 'toFront':
            case 'toBack':
              data = _t.currentItem
              break
          }
          _t.$X.utils.bus.$emit('editor/tool/trigger', {
            name: item.name,
            data: data
          })
        }
      }
    },
    created () {
      let _t = this
      _t.$X.utils.bus.$on('editor/pad/dblclick', _t.toggleHandler)
    }
  }
</script>
