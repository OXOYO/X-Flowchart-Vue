/**
 * Created by OXOYO on 2019/7/8.
 *
 * 锚点配置
 */

export default {
  style: {
    default: {
      radius: 3,
      symbol: 'circle',
      fill: '#FFFFFF',
      fillOpacity: 0,
      stroke: '#1890FF',
      strokeOpacity: 0,
      cursor: 'crosshair',
      zIndex: -1
    },
    hover: {
      fillOpacity: 1,
      strokeOpacity: 1,
      zIndex: 50
    },
    unhover: {
      fillOpacity: 0,
      strokeOpacity: 0,
      zIndex: -1
    },
    active: {
      fillOpacity: 1,
      strokeOpacity: 1,
      zIndex: 50
    },
    inactive: {
      fillOpacity: 0,
      strokeOpacity: 0,
      zIndex: -1
    }
  }
}
