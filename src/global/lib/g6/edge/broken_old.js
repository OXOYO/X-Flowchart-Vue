/**
 * Created by OXOYO on 2019/7/11.
 *
 * 折线
 */

import base from './base'

const defConfig = {
  margin: 80,
  maxDistance: 100
}

export default {
  name: 'x-broken',
  extendName: 'line',
  options: {
    ...base,
    draw (cfg, group) {
      const { startPoint, endPoint } = cfg
      // 路径规划
      let path = []
      if (startPoint && startPoint.x !== null && startPoint.y !== null) {
        // 起点
        path.push([ 'M', startPoint.x, startPoint.y ])
      }
      if (endPoint && endPoint.hasOwnProperty('x') && endPoint.hasOwnProperty('y')) {
        // 根据端点类型求第一个拐点
        let turnOne = {}
        // 根据鼠标位置求第二拐点
        let turnTwo = {}
        switch (startPoint.anchorIndex) {
          // top
          case 0:
            turnOne = {
              x: startPoint.x,
              y: startPoint.y - Math.abs(startPoint.y - endPoint.y) / 2
            }
            turnTwo = {
              x: endPoint.x,
              y: turnOne.y
            }
            break
          // right
          case 3:
            turnOne = {
              x: startPoint.x + Math.abs(endPoint.x - startPoint.x) / 2,
              y: startPoint.y
            }
            turnTwo = {
              x: turnOne.x,
              y: endPoint.y
            }
            break
          // bottom
          case 1:
            turnOne = {
              x: startPoint.x,
              y: startPoint.y + Math.abs(endPoint.y - startPoint.y) / 2
            }
            turnTwo = {
              x: endPoint.x,
              y: turnOne.y
            }
            break
          // left
          case 2:
            turnOne = {
              x: startPoint.x - Math.abs(startPoint.x - endPoint.x) / 2,
              y: startPoint.y
            }
            turnTwo = {
              x: turnOne.x,
              y: endPoint.y
            }
            break
        }
        // FIXME ??? 如果循环计算拐点会如何
        let turnPointArr = [
          turnOne,
          turnTwo
        ]
        let getTurnPoint = function () {
          let latPoint
          let nextPoint = {
            ...endPoint
          }
          let flag = false
          if (turnPointArr.length) {
            latPoint = turnPointArr[turnPointArr.length - 1]
          } else {
            latPoint = turnTwo
          }
          // 根据鼠标与最后一个拐点的位置计算下一个拐点
          if (nextPoint.x - latPoint.x > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x + defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.x - nextPoint.x > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x - defConfig.maxDistance
            }
            flag = true
          }
          if (nextPoint.y - latPoint.y > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y + defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.y - nextPoint.y > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y - defConfig.maxDistance
            }
            flag = true
          }
          // 计算完插入下一个节点
          if (flag) {
            turnPointArr.push(nextPoint)
            getTurnPoint()
          }
        }
        getTurnPoint()
        turnPointArr.push(endPoint)
        for (let i = 0, len = turnPointArr.length, item; i < len; i++) {
          item = turnPointArr[i]
          path.push([ 'L', item.x, item.y ])
        }
      }
      const keyShape = group.addShape('path', {
        className: 'edge-shape',
        attrs: {
          ...cfg,
          path: path
        }
      })
      return keyShape
    },
    getControlPoints (cfg) {
      const { startPoint, endPoint } = cfg
      // 路径规划
      let path = []
      if (startPoint && startPoint.x !== null && startPoint.y !== null) {
        // 起点
        path.push({ x: startPoint.x, y: startPoint.y })
      }
      if (endPoint && endPoint.hasOwnProperty('x') && endPoint.hasOwnProperty('y')) {
        // 根据端点类型求第一个拐点
        let turnOne = {}
        // 根据鼠标位置求第二拐点
        let turnTwo = {}
        switch (startPoint.anchorIndex) {
          // top
          case 0:
            turnOne = {
              x: startPoint.x,
              y: startPoint.y - Math.abs(startPoint.y - endPoint.y) / 2
            }
            turnTwo = {
              x: endPoint.x,
              y: turnOne.y
            }
            break
          // right
          case 3:
            turnOne = {
              x: startPoint.x + Math.abs(endPoint.x - startPoint.x) / 2,
              y: startPoint.y
            }
            turnTwo = {
              x: turnOne.x,
              y: endPoint.y
            }
            break
          // bottom
          case 1:
            turnOne = {
              x: startPoint.x,
              y: startPoint.y + Math.abs(endPoint.y - startPoint.y) / 2
            }
            turnTwo = {
              x: endPoint.x,
              y: turnOne.y
            }
            break
          // left
          case 2:
            turnOne = {
              x: startPoint.x - Math.abs(startPoint.x - endPoint.x) / 2,
              y: startPoint.y
            }
            turnTwo = {
              x: turnOne.x,
              y: endPoint.y
            }
            break
        }
        // FIXME ??? 如果循环计算拐点会如何
        let turnPointArr = [
          turnOne,
          turnTwo
        ]
        let getTurnPoint = function () {
          let latPoint
          let nextPoint = {
            ...endPoint
          }
          let flag = false
          if (turnPointArr.length) {
            latPoint = turnPointArr[turnPointArr.length - 1]
          } else {
            latPoint = turnTwo
          }
          // 根据鼠标与最后一个拐点的位置计算下一个拐点
          if (nextPoint.x - latPoint.x > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x + defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.x - nextPoint.x > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x - defConfig.maxDistance
            }
            flag = true
          }
          if (nextPoint.y - latPoint.y > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y + defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.y - nextPoint.y > defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y - defConfig.maxDistance
            }
            flag = true
          }
          // 计算完插入下一个节点
          if (flag) {
            turnPointArr.push(nextPoint)
            getTurnPoint()
          }
        }
        getTurnPoint()
        turnPointArr.push(endPoint)
        for (let i = 0, len = turnPointArr.length, item; i < len; i++) {
          item = turnPointArr[i]
          path.push({ x: item.x, y: item.y })
        }
      }
      return path
    },
    getPath (points) {
      const path = []
      points.forEach((point, index) => {
        if (!index) {
          path.push([ 'M', point.x, point.y ])
        } else {
          path.push([ 'L', point.x, point.y ])
        }
      })
      console.log('path', path)
      return path
    }
  }
}
