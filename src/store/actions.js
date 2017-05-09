/**
 * Created by OXOYO on 2017/4/5.
 * actions.js 操作
 */

import * as Types from './types'

// 切换全屏
export const toggleFullscreen = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_FULLSCREEN, payload)
}

// flowchart 相关操作
export const setFlowchartTreeData = ({ commit }, payload) => {
  commit(Types.SET_FLOWCHART_TREE_DATA, payload)
}
export const setFlowchartCanvasData = ({ commit }, payload) => {
  commit(Types.SET_FLOWCHART_CANVAS_DATA, payload)
}
export const updateFlowchartCanvasStatus = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_STATUS, payload)
}
export const updateFlowchartCanvasFormData = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_FORM_DATA, payload)
}
export const setFlowchartCanvasNodeList = ({ commit }, payload) => {
  commit(Types.SET_FLOWCHART_CANVAS_NODE_LIST, payload)
}
export const updateFlowchartCanvasNodeList = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_NODE_LIST, payload)
}
export const emptyFlowchartCanvasNodeList = ({ commit }, payload) => {
  commit(Types.EMPTY_FLOWCHART_CANVAS_NODE_LIST, payload)
}
export const setFlowchartCanvasLinkList = ({ commit }, payload) => {
  commit(Types.SET_FLOWCHART_CANVAS_LINK_LIST, payload)
}
export const updateFlowchartCanvasLinkList = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_LINK_LIST, payload)
}
export const emptyFlowchartCanvasLinkList = ({ commit }, payload) => {
  commit(Types.EMPTY_FLOWCHART_CANVAS_LINK_LIST, payload)
}
export const emptyFlowchartCanvas = ({ commit }, payload) => {
  commit(Types.EMPTY_FLOWCHART_CANVAS, payload)
}
export const updateFlowchartContextmenu = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CONTEXTMENU, payload)
}
export const updateFlowchartCanvasZoom = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_ZOOM, payload)
}
export const updateFlowchartCanvasNodeOptions = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_NODE_OPTIONS, payload)
}
export const updateFlowchartCanvasNodeOptionsList = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_NODE_OPTIONS_LIST, payload)
}
export const updateFlowchartCanvasNodeContainer = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_CANVAS_NODE_CONTAINER, payload)
}
export const updateFlowchartSaveActionModal = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_SAVE_ACTION_MODAL, payload)
}
export const updateFlowchartToolbarButtons = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_TOOLBAR_BUTTONS, payload)
}
export const updateFlowchartToolbarAction = ({ commit }, payload) => {
  commit(Types.UPDATE_FLOWCHART_TOOLBAR_ACTION, payload)
}
