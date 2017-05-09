/**
* Created by OXOYO on 2017/4/11.
* 画布线条
*/
<style lang="less">
  path {
    /*transition: stroke-width .5s ease-in-out;*/

    &:hover,
    &.hover {
       stroke-width: 5;
       stroke: #00c0ff !important;
       stroke-dasharray: 10, 2;
       stroke-dashoffset: 50;
       animation: dash 1s ease-in-out infinite;
     }

    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        defConfig: {
          // 路径相关默认配置
          path: {
            'stroke': '#807E78',
            'stroke-width': 3,
            'fill': 'none',
//            'marker-start': 'url(#markerCircle)',
//            'marker-mid': 'url(#midArrow)',
            'marker-end': 'url(#markerArrow)'
          },
          // margin
          margin: 80,
          maxDistance: 100
        },
        // 右键菜单
        contextmenu: {
          // 是否启用
          isEnable: true,
          isShow: false,
          positionX: 0,
          positionY: 0,
          type: 'link'
        },
        hoverClass: ''
      }
    },
    props: {
      config: {
        type: Object
      },
      linkInfo: {
        type: Object
      }
    },
    render (h) {
      let _t = this
      let linkInfo = _t.linkInfo
      // 起点
      let startPort = linkInfo.startPort
      // 鼠标位置
      let mousePort = linkInfo.path
      // 终点
      let stopPort = linkInfo.stopPort
      if (stopPort && stopPort.x !== null && stopPort.y !== null) {
        mousePort = stopPort
      }
      // 路径
      let path = []
      if (startPort && startPort.x !== null && startPort.y !== null) {
        // 起点
        path.push('M' + startPort.x + ' ' + startPort.y)
      }
      if (mousePort && mousePort.hasOwnProperty('x') && mousePort.hasOwnProperty('y')) {
        // 根据端点类型求第一个拐点
        let turnOne = {}
        // 根据鼠标位置求第二拐点
        let turnTwo = {}
        // 根据鼠标与拐点二的距离求第三拐点
//        let turnThree = {}
        switch (startPort.portName) {
          case 'top':
            turnOne = {
              x: startPort.x,
//              y: startPort.y - _t.defConfig.margin
              y: startPort.y - Math.abs(startPort.y - mousePort.y) / 2
            }
            turnTwo = {
              x: mousePort.x,
              y: turnOne.y
            }
            break
          case 'right':
            turnOne = {
//              x: startPort.x + _t.defConfig.margin,
              x: startPort.x + Math.abs(mousePort.x - startPort.x) / 2,
              y: startPort.y
            }
            turnTwo = {
              x: turnOne.x,
              y: mousePort.y
            }
            break
          case 'bottom':
            turnOne = {
              x: startPort.x,
//              y: startPort.y + _t.defConfig.margin
              y: startPort.y + Math.abs(mousePort.y - startPort.y) / 2
            }
            turnTwo = {
              x: mousePort.x,
              y: turnOne.y
            }
            break
          case 'left':
            turnOne = {
//              x: startPort.x - _t.defConfig.margin,
              x: startPort.x - Math.abs(startPort.x - mousePort.x) / 2,
              y: startPort.y
            }
            turnTwo = {
              x: turnOne.x,
              y: mousePort.y
            }
            break
        }
        // FIXME ??? 如果循环计算拐点会如何
        let turnPointArr = [
          turnOne,
          turnTwo
        ]
        let getTrunPoint = function () {
          let latPoint
          let nextPoint = {
            ...mousePort
          }
          let flag = false
          let isOdd = turnPointArr.length % 2
          if (turnPointArr.length) {
            latPoint = turnPointArr[turnPointArr.length - 1]
          } else {
            latPoint = turnTwo
          }
          // 根据鼠标与最后一个拐点的位置计算下一个拐点
          if (nextPoint.x - latPoint.x > _t.defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x + _t.defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.x - nextPoint.x > _t.defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              x: latPoint.x - _t.defConfig.maxDistance
            }
            flag = true
          }
          if (nextPoint.y - latPoint.y > _t.defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y + _t.defConfig.maxDistance
            }
            flag = true
          } else if (latPoint.y - nextPoint.y > _t.defConfig.maxDistance) {
            nextPoint = {
              ...nextPoint,
              y: latPoint.y - _t.defConfig.maxDistance
            }
            flag = true
          }
          // 计算完插入下一个节点
          if (flag) {
            // 奇数
            if (!isOdd) {
//              nextPoint = {
//                ...nextPoint,
//                x: nextPoint.x,
//                y: nextPoint.y - 100
//              }
            }
            turnPointArr.push(nextPoint)
            getTrunPoint()
          }
        }
        getTrunPoint()
        turnPointArr.push(mousePort)
        for (let i = 0, len = turnPointArr.length, item; i < len; i++) {
          item = turnPointArr[i]
          path.push('L' + item.x + ' ' + item.y)
        }
      }

      let pathOptions = {
        attrs: {
          ..._t.defConfig.path,
          ..._t.config,
          ..._t.linkInfo.config,
          linkKey: _t.linkInfo.linkKey,
          d: path.join(' ')
        },
        on: {
          mouseenter: function (event) {
            event.stopPropagation()
            /*
            if (typeof event.target.className === 'object') {
              event.target.className = {
                baseVal: 'hover',
                animVal: 'hover'
              }
            }
            */
          },
          mouseleave: function (event) {
            event.stopPropagation()
            /*
            if (typeof event.target.className === 'object') {
              event.target.className = {
                baseVal: '',
                animVal: ''
              }
            }
            */
          },
          mousedown: function (event) {
            event.stopPropagation()
//            let _t = this

//            if (_t.linkInfo) {
//              _t.linkInfo.config = {
//                ..._t.linkInfo.config,
//                stroke: 'red'
//              }
//            }
          },
          contextmenu: function (event) {
            event.stopPropagation()
            event.preventDefault()
            let offsetX = parseInt(event.offsetX)
            let offsetY = parseInt(event.offsetY)

            // 更新contextmenu
            let contextmenu = {
              isEnable: true,
              isShow: true,
              positionX: offsetX,
              positionY: offsetY,
              type: 'link',
              nodeInfo: {
                nodeKey: null
              },
              linkInfo: {
                linkKey: _t.linkInfo.linkKey || null
              }
            }
            // 分发action 更新contextmenu数据
            _t.$store.dispatch('updateFlowchartContextmenu', contextmenu)
          }
        }
      }
      // 拼装完整path
      return h('path', pathOptions)
    }
  }
</script>

