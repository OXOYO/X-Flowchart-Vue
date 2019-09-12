/**
 * Created by OXOYO on 2019/7/8.
 *
 * 锚点背景配置
 */

export default {
  style: {
    default: {
      radius: 10,
      symbol: 'circle',
      fill: '#1890FF',
      fillOpacity: 0,
      stroke: '#1890FF',
      strokeOpacity: 0,
      cursor: 'crosshair'
    },
    hover: {
      fillOpacity: 1,
      strokeOpacity: 1
    },
    unhover: {
      fillOpacity: 0,
      strokeOpacity: 0
    },
    active: {
      fillOpacity: 0.3,
      strokeOpacity: 0.5
    },
    inactive: {
      fillOpacity: 0,
      strokeOpacity: 0
    }
  }
}
