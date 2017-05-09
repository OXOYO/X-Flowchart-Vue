/**
 * Created by OXOYO on 2017/5/2.
 * 工具类
 */

export const closest = function (el, selector) {
  let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector

  while (el) {
    if (matchesSelector.call(el, selector)) {
      break
    }
    el = el.parentElement
  }
  return el
}

// 画布格子
export const grid = {
  // 初始化格子
  init: function (canvasConfig, gridConfig) {
    if (!canvasConfig) {
      return []
    }
    // 格子默认配置
    let defGridConfig = {
      width: 10,
      height: 10,
      // 对角线
      diagonal: 14
    }
    // 处理配置
    gridConfig = {
      ...gridConfig,
      ...defGridConfig
    }

    // 计算各种数量
    let gridNumX = parseInt(canvasConfig.width / gridConfig.width)
    let gridNumY = parseInt(canvasConfig.height / gridConfig.height)
    // 循环生成grid
    let gridArr = []
    // 横向填充
    for (let y = 0; y < gridNumY; y++) {
      for (let x = 0; x < gridNumX; x++) {
        // 计算各个格子的顶点、中心点坐标
        gridArr.push({
          leftTop: {
            x: x,
            y: y
          },
          rightTop: {
            x: (x + 1) * gridConfig.width,
            y: 0
          },
          rightBottom: {
            x: (x + 1) * gridConfig.width,
            y: (y + 1) * gridConfig.height
          },
          leftBottom: {
            x: 0,
            y: (y + 1) * gridConfig.height
          },
          centre: {
            x: x * gridConfig.width + (gridConfig.width / 2),
            y: y * gridConfig.height + (gridConfig.height / 2)
          }
        })
      }
    }
    return gridArr
  },
  // 获取节点在grid中的坐标
  getPositionOnGrid: function (nodeKey, mousePosition) {
    if (!nodeKey) {
      return null
    }
    setTimeout(function () {
      let node = document.querySelector('[nodeKey="' + nodeKey + '"]')
      let nodeWidth = node.offsetWidth
      let nodeHeight = node.offsetHeight
      // 计算节点各个顶点的坐标
      let nodePostion = {
        leftTop: {
          x: 0,
          y: 0
        },
        rightTop: {
          x: nodeWidth,
          y: 0
        },
        rightBottom: {
          x: nodeWidth,
          y: nodeHeight
        },
        leftBottom: {
          x: 0,
          y: nodeHeight
        },
        centre: {
          x: nodeWidth / 2,
          y: nodeHeight / 2
        }
      }
      console.log(nodePostion)
      // 根据鼠标位置和顶点坐标计算节点所占用的格子
      console.log('getZeroPosition', grid.getZeroPosition())
    }, 0)
  },
  // 计算坐标原点位置
  getZeroPosition: function () {
    let layoutContentDom = document.querySelector('#layoutContent')
    let sidebarDom = document.querySelector('#sidebar')
    // 屏幕信息
    // let screenInfo = {
    //   width: document.body.clientWidth,
    //   height: document.body.clientHeight
    // }
    console.log('sidebarDom.width', sidebarDom.clientWidth, 'layoutContentDom.width', layoutContentDom.clientWidth)
    // 原点坐标
    let zeroPosition = {
      x: layoutContentDom.offsetLeft + layoutContentDom.offsetParent.offsetLeft,
      y: layoutContentDom.offsetTop
    }
    console.log(zeroPosition)
  }
}
