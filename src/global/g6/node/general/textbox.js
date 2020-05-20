/**
 * Created by OXOYO on 2019/7/8.
 *
 * 文本框
 */

// import * as G6Util from '@antv/util'
// import base from '../base'

export default {
  name: 'textbox',
  extendName: 'single-node',
  options: {
    // ...base,
    draw (cfg, group) {
      const shape = group.addShape('dom', {
        name: 'dom',
        attrs: {
          width: cfg.size[0],
          height: cfg.size[1],
          html: `
        <div onclick="alert('Hi')" style="background-color: #fff; border: 2px solid #5B8FF9; border-radius: 5px; width: ${cfg.size[0] - 5}px; height: ${cfg.size[1] - 5}px; display: flex;">
          <div style="height: 100%; width: 33%; background-color: #CDDDFD">
            <img alt="" style="line-height: 100%; margin-left: 7px;" src="https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*Q_FQT6nwEC8AAAAAAAAAAABkARQnAQ" width="20" height="20" />
          </div>
          <span style="margin:auto; padding: auto; color: #5B8FF9">${cfg.label}</span>
        </div>
          `
        },
        draggable: true
      })
      return shape
    }
  }
}
