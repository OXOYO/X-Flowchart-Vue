/**
 * Created by OXOYO on 2017/4/5.
 * mutations.js
 */

import * as Types from './types'

export default {
  // flowchart 相关操作
  [Types.SET_FLOWCHART_TREE_DATA] (state, data) {
    state.flowchart.tree.status = true
    state.flowchart.tree.data = {
      ...state.flowchart.tree.data,
      ...data
    }
  },
  // 获取组件树
  [Types.GET_MODULE_TREE_SUCCESS] (state, data) {
    state.flowchart.tree.status = true
    state.flowchart.tree.data = data
  },
  [Types.GET_MODULE_TREE_FAIL] (state, data) {
    state.flowchart.tree.status = false
    state.flowchart.tree.data = data
  },
  [Types.SET_FLOWCHART_CANVAS_DATA] (state, data) {
    state.flowchart.canvas.data = {
      ...state.flowchart.canvas.data,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_STATUS] (state, data) {
    // 处理当前状态
    let canvasCurrentStatus
    let canvasHistoryStatus = state.flowchart.canvas.status.history
    let len = canvasHistoryStatus.length
    // 处理状态回滚
    if (data === 'revert') {
      canvasCurrentStatus = len > 0 ? canvasHistoryStatus[len - 1] : 'init'
    } else {
      canvasCurrentStatus = data
    }
    // 处理历史状态
    if (state.flowchart.canvas.status.current) {
      state.flowchart.canvas.status.history.push(state.flowchart.canvas.status.current)
    }

    state.flowchart.canvas.status.current = canvasCurrentStatus
  },
  [Types.UPDATE_FLOWCHART_CANVAS_FORM_DATA] (state, data) {
    state.flowchart.canvas.formData = {
      ...state.flowchart.canvas.formData,
      ...data
    }
  },
  [Types.SET_FLOWCHART_CANVAS_NODE_LIST] (state, data) {
    state.flowchart.canvas.nodeList = {
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_NODE_LIST] (state, data) {
    state.flowchart.canvas.nodeList = {
      ...state.flowchart.canvas.nodeList,
      ...data
    }
  },
  [Types.EMPTY_FLOWCHART_CANVAS_NODE_LIST] (state, data) {
    state.flowchart.canvas.nodeList = {}
  },
  [Types.SET_FLOWCHART_CANVAS_LINK_LIST] (state, data) {
    state.flowchart.canvas.linkList = {
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_LINK_LIST] (state, data) {
    state.flowchart.canvas.linkList = {
      ...state.flowchart.canvas.linkList,
      ...data
    }
  },
  [Types.EMPTY_FLOWCHART_CANVAS_LINK_LIST] (state, data) {
    state.flowchart.canvas.linkList = {}
  },
  [Types.EMPTY_FLOWCHART_CANVAS] (state, data) {
    state.flowchart.canvas.nodeList = {}
    state.flowchart.canvas.linkList = {}
    state.flowchart.canvas.nodeOptions = {
      isShow: false,
      currentNodeKey: null,
      data: {}
    }
  },
  [Types.UPDATE_FLOWCHART_CONTEXTMENU] (state, data) {
    state.flowchart.contextmenu.data = {
      ...state.flowchart.contextmenu.data,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_ZOOM] (state, data) {
    state.flowchart.canvas.zoombar = {
      ...state.flowchart.canvas.zoombar,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_FULLSCREEN] (state, data) {
    state.flowchart.canvas.zoombar = {
      ...state.flowchart.canvas.zoombar,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_NODE_OPTIONS] (state, data) {
    state.flowchart.canvas.nodeOptions = {
      ...state.flowchart.canvas.nodeOptions,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_NODE_OPTIONS_LIST] (state, data) {
    state.flowchart.canvas.nodeOptions.data = {
      ...state.flowchart.canvas.nodeOptions.data,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_CANVAS_NODE_CONTAINER] (state, data) {
    state.flowchart.canvas.nodeContainer = {
      ...state.flowchart.canvas.nodeContainer,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_SAVE_ACTION_MODAL] (state, data) {
    state.flowchart.modal.saveAction = {
      ...state.flowchart.modal.saveAction,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_TOOLBAR_BUTTONS] (state, data) {
    state.flowchart.toolbar.buttons = {
      ...state.flowchart.toolbar.buttons,
      ...data
    }
  },
  [Types.UPDATE_FLOWCHART_TOOLBAR_ACTION] (state, data) {
    state.flowchart.toolbar.actionName = data
  }
}
