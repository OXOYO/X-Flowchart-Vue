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
        stroke: '#29B6F2',
        strokeOpacity: 0,
        zIndex: -1
      },
      edge: {
        lineDash: [ 5, 5 ],
        fillOpacity: 0,
        stroke: '#29B6F2',
        strokeOpacity: 0,
        zIndex: -1
      },
      rotate: {
        opacity: 0,
        zIndex: -1
      }
    },
    active: {
      point: {
        fillOpacity: 1,
        strokeOpacity: 1,
        zIndex: 20
      },
      edge: {
        fillOpacity: 0,
        strokeOpacity: 1,
        zIndex: 10
      },
      rotate: {
        opacity: 1,
        zIndex: 10
      }
    },
    inactive: {
      point: {
        fillOpacity: 0,
        strokeOpacity: 0,
        zIndex: -1
      },
      edge: {
        fillOpacity: 0,
        strokeOpacity: 0,
        zIndex: -1
      },
      rotate: {
        opacity: 0,
        zIndex: -1
      }
    }
  }
}
