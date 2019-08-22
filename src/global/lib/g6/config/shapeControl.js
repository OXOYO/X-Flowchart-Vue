/**
 * Created by OXOYO on 2019/7/11.
 *
 * 图形控制
 */

export default {
  style: {
    default: {
      point: {
        radius: 3,
        symbol: 'square',
        fill: '#FFFFFF',
        fillOpacity: 0,
        stroke: '#558EF0',
        strokeOpacity: 0
      },
      edge: {
        fill: '#FFFFFF',
        fillOpacity: 0,
        stroke: 'red',
        strokeOpacity: 0
      }
    },
    active: {
      point: {
        fillOpacity: 1,
        strokeOpacity: 1
      },
      edge: {
        fillOpacity: 1,
        strokeOpacity: 1
      }
    },
    inactive: {
      point: {
        fillOpacity: 0,
        strokeOpacity: 0
      },
      edge: {
        fillOpacity: 0,
        strokeOpacity: 0
      }
    }
  }
}
