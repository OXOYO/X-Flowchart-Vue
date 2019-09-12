/**
 * Created by OXOYO on 2019/7/16.
 *
 * 线条配置
 */

export default {
  style: {
    default: {
      stroke: '#000000',
      strokeOpacity: 1
    },
    active: {
      shadowColor: 'red',
      shadowBlur: 4,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    },
    inactive: {
      shadowColor: ''
    }
  },
  type: {
    solid: {
      lineDash: []
    },
    dashed: {
      lineDash: [ 5, 5 ]
    },
    dot: {
      lineDash: [ 2, 2 ]
    }
  }
}
