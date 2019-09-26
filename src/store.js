import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editor: {
      currentItem: {
        id: null,
        type: null,
        model: null
      },
      // 剪贴板
      clipboard: null,
      // 操作历史
      history: [],
      // 工具列表
      toolList: [
          {
            name: 'logo',
            label: 'logo',
            lang: 'L10000',
            type: 'text',
            icon: '',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'left'
            },
            contextmenu: {
              enable: false,
              target: []
            }
          },
          {
            name: 'undo',
            label: 'Undo',
            lang: 'L10001',
            type: 'normal',
            icon: 'undo',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: []
            }
          },
          {
            name: 'redo',
            label: 'Redo',
            lang: 'L10002',
            type: 'normal',
            icon: 'redo',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: []
            }
          },
          {
            name: 'copy',
            label: 'Copy',
            lang: 'L10003',
            type: 'normal',
            icon: 'copy',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            // FIXME 通用mod助手用于设置跨平台快捷方式，用于将command+c在Windows和Linux上映射到ctrl+c
            shortcuts: 'mod+c',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'paste',
            label: 'Paste',
            lang: 'L10004',
            type: 'normal',
            icon: 'paste',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: 'mod+v',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'delete',
            label: 'Delete',
            lang: 'L10010',
            type: 'normal',
            icon: 'delete',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: 'del',
            toolbar: {
              enable: false,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'clear',
            label: 'Clear',
            lang: 'L10005',
            type: 'normal',
            icon: 'clear',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: 'ctrl+shift+c',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas']
            }
          },
          {
            name: 'zoom',
            label: 'Zoom',
            lang: 'L10029',
            type: 'dropdown-list',
            icon: 'zoom',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: false,
              target: []
            },
            // 默认选中项index
            selected: 0,
            // 锁定下拉菜单label
            lockLabel: true,
            // 子节点
            children: [
              {
                name: '25%',
                label: '25%',
                lang: '',
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
                type: 'normal',
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
            mode: ['edit', 'preview'],
            divider: false,
            // FIXME mod+= 用于支持主键盘区的+，mod+plus用于支持数字键盘区的+
            shortcuts: ['mod+=', 'mod+plus'],
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'zoomOut',
            label: 'Zoom Out',
            lang: 'L10007',
            type: 'normal',
            icon: 'zoom-out',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: 'mod+-',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'fit',
            label: 'Fit',
            lang: 'L10008',
            type: 'normal',
            icon: 'fit',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: 'mod+0',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'actualSize',
            label: 'Actual Size',
            lang: 'L10009',
            type: 'normal',
            icon: 'actual-size',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: true,
            shortcuts: 'mod+1',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'fill',
            label: 'fill',
            lang: 'L10011',
            type: 'dropdown-color-picker',
            icon: 'fill',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'lineColor',
            label: 'line color',
            lang: 'L10012',
            type: 'dropdown-color-picker',
            icon: 'line-color',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'lineWidth',
            label: 'line width',
            lang: 'L10013',
            type: 'dropdown-list',
            icon: 'line-width',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: true,
            // 子节点
            children: [
              {
                name: 1,
                label: '1px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 2,
                label: '2px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 3,
                label: '3px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 4,
                label: '4px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 5,
                label: '5px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 6,
                label: '6px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 7,
                label: '7px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 8,
                label: '8px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 9,
                label: '9px',
                lang: '',
                type: 'normal',
                icon: '',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 10,
                label: '10px',
                lang: '',
                type: 'normal',
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
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: false,
            // 子节点
            children: [
              {
                name: 'solid',
                label: 'solid',
                lang: '',
                type: 'normal',
                icon: 'solid',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 'dashed',
                label: 'dashed',
                lang: '',
                type: 'normal',
                icon: 'dashed',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 'dot',
                label: 'dot',
                lang: '',
                type: 'normal',
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
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: false,
            // 子节点
            children: [
              {
                name: 'x-line',
                label: 'line',
                lang: '',
                type: 'normal',
                icon: 'flow-line',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 'x-broken',
                label: 'broken',
                lang: '',
                type: 'normal',
                icon: 'flow-broken',
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 'x-cubic',
                label: 'cubic',
                lang: '',
                type: 'normal',
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
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: false,
            // 子节点
            children: [
              {
                name: 'none',
                label: 'none',
                lang: '',
                type: 'normal',
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
                type: 'normal',
                icon: 'solid-arrow',
                style: {},
                data: {
                  path: 'M10,0 L-10,-10 L-10,10 Z',
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
                type: 'normal',
                icon: 'normal-arrow',
                style: {},
                data: {
                  path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 L-10.707,-9.293 L-10,-10 Z',
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
                type: 'normal',
                icon: 'asynch-arraw',
                style: {},
                data: {
                  path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 Z',
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
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: false,
            // 子节点
            children: [
              {
                name: 'none',
                label: 'none',
                lang: '',
                type: 'normal',
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
                type: 'normal',
                icon: 'solid-arrow',
                style: {
                  display: 'inline-block',
                  transform: 'rotate(180deg)'
                },
                data: {
                  path: 'M10,0 L-10,-10 L-10,10 Z',
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
                type: 'normal',
                icon: 'normal-arrow',
                style: {
                  display: 'inline-block',
                  transform: 'rotate(180deg)'
                },
                data: {
                  path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 L-10.707,-9.293 L-10,-10 Z',
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
                type: 'normal',
                icon: 'asynch-arraw',
                style: {
                  display: 'inline-block',
                  transform: 'rotate(180deg)'
                },
                data: {
                  path: 'M10,0 L-10,10 L-10.707,9.293 L8.568,0 Z',
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
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'toBack',
            label: 'To Back',
            lang: 'L10019',
            type: 'normal',
            icon: 'to-back',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['node', 'edge']
            }
          },
          {
            name: 'marquee',
            label: 'Marquee',
            lang: 'L10020',
            type: 'normal',
            icon: 'marquee',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: []
            }
          },
          {
            name: 'group',
            label: 'Group',
            lang: 'L10021',
            type: 'normal',
            icon: 'group',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: []
            }
          },
          {
            name: 'ungroup',
            label: 'Ungroup',
            lang: 'L10022',
            type: 'normal',
            icon: 'ungroup',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: true,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: []
            }
          },
          {
            name: 'edit',
            label: 'edit',
            lang: 'L10023',
            type: 'normal',
            icon: 'edit',
            enable: true,
            disabled: false,
            mode: ['preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: false,
              target: []
            }
          },
          {
            name: 'preview',
            label: 'preview',
            lang: 'L10024',
            type: 'normal',
            icon: 'preview',
            enable: true,
            disabled: false,
            mode: ['edit'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: false,
              target: []
            }
          },
          {
            name: 'download',
            label: 'download',
            lang: 'L10030',
            type: 'dropdown-list',
            icon: 'download',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: true,
            // 子节点
            children: [
              {
                name: 'image',
                label: 'Image',
                lang: '',
                type: 'normal',
                icon: 'image',
                style: {},
                data: false,
                enable: true,
                disabled: false,
                divider: false
              },
              {
                name: 'json',
                label: 'Json',
                lang: '',
                type: 'normal',
                icon: 'json',
                style: {},
                data: false,
                enable: true,
                disabled: false,
                divider: false
              }
            ]
          },
          {
            name: 'fullscreen',
            label: 'fullscreen',
            lang: 'L10025',
            type: 'normal',
            icon: 'full-screen',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'language',
            label: 'language',
            lang: 'L10026',
            type: 'dropdown-list',
            icon: 'language',
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'center'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            },
            // 默认选中项index
            selected: 0,
            lockLabel: true,
            // 子节点
            children: [
              {
                name: 'zh-CN',
                label: '简体中文',
                lang: '',
                type: 'normal',
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
                type: 'normal',
                icon: '',
                style: {},
                data: false,
                enable: true,
                disabled: false,
                divider: false
              }
            ]
          },
          {
            name: 'github',
            label: 'github',
            lang: 'L10027',
            type: 'link',
            icon: 'github',
            link: config.system.github,
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'right'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          },
          {
            name: 'feedback',
            label: 'feedback',
            lang: 'L10028',
            type: 'link',
            icon: 'feedback',
            link: config.system.feedback,
            enable: true,
            disabled: false,
            mode: ['edit', 'preview'],
            divider: false,
            shortcuts: '',
            toolbar: {
              enable: true,
              position: 'right'
            },
            contextmenu: {
              enable: true,
              target: ['canvas', 'node', 'edge']
            }
          }
        ]
    }
  },
  mutations: {
    'editor/currentItem/update': (state, data) => {
      state.editor.currentItem = data
    },
    'editor/toolList/update': (state, data) => {
      state.editor.toolList = data
    }
  },
  actions: {

  },
  getters: {
    currentItem: state => state.editor.currentItem,
    toolList: state => state.editor.toolList
  }
})
