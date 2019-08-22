/**
 * Created by OXOYO on 2019/8/14.
 *
 *
 */
// import base from './base'
import { polylineFinding } from './brokenLine'

export default {
  name: 'x-broken',
  extendName: 'polyline',
  options: {
    // ...base,
    draw (cfg, group) {
      const { startPoint, endPoint } = cfg
      const controlPoints = this.getControlPoints(cfg)
      let points = [startPoint]
      if (controlPoints) {
        console.log('controlPoints', controlPoints)
        points.push(controlPoints)
      }
      points.push(endPoint)
      let path = this.getPath(points)
      console.log('path', path)
      const keyShape = group.addShape('path', {
        className: 'edge-shape',
        attrs: {
          ...cfg,
          path: path
        }
      })
      return keyShape
    },
    getShapeStyle (cfg) {
      const startPoint = cfg.startPoint
      const endPoint = cfg.endPoint
      const controlPoints = this.getControlPoints(cfg)
      let points = [ startPoint ]
      if (controlPoints) {
        points = points.concat(controlPoints)
      }
      points.push(endPoint)
      const path = this.getPath(points)
      // let style = editorStyle.edgeStyle
      let style = { stroke: '#A3B1BF', strokeOpacity: 0.92, lineWidth: 1, lineAppendWidth: 8, endArrow: true }
      if (cfg.reverse) {
        style = { ...style, lineDash: [1, 3] }
      } else {
        style = { ...style, lineDash: null }
      }

      return {
        path,
        ...style
        // ,
        // endArrow: {
        //   path: 'M 0,0 L -10,-4 S -8 0,-10 4 Z'
        // }
      }
    },
    getPath (points) {
      const path = []
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        if (i === 0) {
          path.push([ 'M', point.x, point.y ])
        } else if (i === points.length - 1) {
          path.push([ 'L', point.x, point.y ])
        } else {
          const prevPoint = points[i - 1]
          let nextPoint = points[i + 1]
          let cornerLen = 5
          if (Math.abs(point.y - prevPoint.y) > cornerLen || Math.abs(point.x - prevPoint.x) > cornerLen) {
            if (prevPoint.x === point.x) {
              path.push(['L', point.x, point.y > prevPoint.y ? point.y - cornerLen : point.y + cornerLen])
            } else if (prevPoint.y === point.y) {
              path.push(['L', point.x > prevPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y])
            }
          }
          const yLen = Math.abs(point.y - nextPoint.y)
          const xLen = Math.abs(point.x - nextPoint.x)
          if (yLen > 0 && yLen < cornerLen) {
            cornerLen = yLen
          } else if (xLen > 0 && xLen < cornerLen) {
            cornerLen = xLen
          }
          if (prevPoint.x !== nextPoint.x && nextPoint.x === point.x) {
            path.push(['Q', point.x, point.y, point.x, point.y > nextPoint.y ? point.y - cornerLen : point.y + cornerLen])
          } else if (prevPoint.y !== nextPoint.y && nextPoint.y === point.y) {
            path.push(['Q', point.x, point.y, point.x > nextPoint.x ? point.x - cornerLen : point.x + cornerLen, point.y])
          }
        }
      }
      return path
    },
    getControlPoints (cfg) {
      // if (!cfg.sourceNode) {
      //   return cfg.controlPoints
      // }
      return polylineFinding(cfg.sourceNode, cfg.targetNode, cfg.startPoint, cfg.endPoint, 15)
    }
  }
}
