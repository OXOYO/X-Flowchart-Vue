/**
 * Created by OXOYO on 2017/4/5.
 * state.js 状态
 */

// 定义state
export default {
  projects: {
    tree: {
      data: [],
      status: false
    },
    treeRunRecord: {
      data: {},
      status: false
    }
  },
  flowchart: {
    tree: {
      data: {},
      status: false
    },
    canvas: {
      data: {},
      zoombar: {
        zoom: 1,
        right: '25px',
        isFullscreen: false
      },
      nodeList: {},
      linkList: {},
      nodeContainer: {},
      nodeOptions: {
        isShow: false,
        currentNodeKey: null,
        data: {}
      },
      // 画布状态 init: 初始状态 create: 新建 editing: 编辑中 running: 运行中 read: 只读 loading: 加载中
      status: {
        // 历史状态
        history: [],
        // 当前状态
        current: 'init'
      },
      formData: {}
    },
    contextmenu: {
      data: {
        // 是否启用
        isEnable: true,
        isShow: false,
        positionX: 0,
        positionY: 0,
        type: ''
      }
    },
    // 弹窗
    modal: {
      saveAction: {
        isShow: false
      }
    },
    // 工具栏
    toolbar: {
      buttons: {
        save: {
          enable: false,
          isLoading: false
        },
        run: {
          enable: false,
          isLoading: false
        }
      },
      actionName: null
    }
  }
}
