import Vue from 'vue'
import Vuex from 'vuex'

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
      history: []
    }
  },
  mutations: {
    'board/materials/editor/currentItem/update': (state, data) => {
      state.editor.currentItem = data
    }
  },
  actions: {

  },
  getters: {
    currentItem: state => state.editor.currentItem
  }
})
