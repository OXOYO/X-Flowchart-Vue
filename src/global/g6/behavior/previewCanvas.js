/**
 * Created by OXOYO on 2019/9/27.
 *
 * 预览画布交互
 */

export default {
  name: 'preview-canvas',
  options: {
    getDefaultCfg () {
      return {
        config: {}
      }
    },
    getEvents () {
      return {
        'node:contextmenu': 'onNodeContextmenu',
        'canvas:contextmenu': 'onCanvasContextmenu',
        'edge:contextmenu': 'onEdgeContextmenu'
      }
    },
    onNodeContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'node',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onCanvasContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'canvas',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onEdgeContextmenu (event) {
      let _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'edge',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    }
  }
}
