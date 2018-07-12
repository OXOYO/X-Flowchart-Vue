/**
* Created by OXOYO on 2018/3/28.
*
* 刻度尺
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_scale {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2500;
    /*overflow: hidden;*/
    transition: all .5s ease-in .1s;

    .scale_x {
      position: absolute;
      left: 0;
      z-index: 2500;
      width: 100%;
      height: 18px;
      background: url('../../../assets/scale_x.png') repeat-x;

      .scale_item {
        top: 1px;
      }
    }
    .scale_y {
      position: absolute;
      top: 0;
      z-index: 2500;
      width: 18px;
      height: 100%;
      background: url('../../../assets/scale_y.png') repeat-y;

      .scale_item {
        width: 8px;
        left: 3px;
        word-wrap: break-word;
      }
    }
    .scale_item {
      position: absolute;
      font: 10px/1 Arial, sans-serif;
      color: #333;
      cursor: default;
    }

    .toolTip {
      position: absolute;
      display: none;
      margin: 15px;
    }

    .guides_x {
      position: absolute;
      top: 0;
      z-index: 2500;
      height: 1px;
      background: #4AFFFF;
      cursor: row-resize;

      &:hover {
        .toolTip {
          display: inline-block;
        }
      }

      &:after {
        content: ' ';
        position: absolute;
        z-index: -1;
        top: -1px;
        right: 0;
        bottom: 0;
        left: 0;
        height: 3px;
        background: transparent;
      }
    }
    .guides_y {
      position: absolute;
      left: 0;
      z-index: 2500;
      width: 1px;
      background: #4AFFFF;
      cursor: col-resize;

      &:hover {
        .toolTip {
          display: inline-block;
        }
      }

      &:after {
        content: ' ';
        position: absolute;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: -1px;
        height: 3px;
        background: transparent;
      }
    }
  }
</style>

<template>
  <div class="xfc_scale">
    <!-- 刻度尺 -->
    <div
      class="scale_x"
      :style="{ 'width': width + 'px' }"
      @mousedown.stop.prevent="handleMouseDownOnScale('x', $event)"
      @contextmenu.stop.prevent="handleRightClick($event)"
    >
      <div
        class="scale_item"
        v-for="(item, index) in scaleList.x"
        :key="'scale_x_' + index"
        :style="item.style"
        :type="item.type"
      >
        {{ item.text }}
      </div>
    </div>
    <div
      class="scale_y"
      :style="{ 'height': height + 'px'}"
      @mousedown.stop.prevent="handleMouseDownOnScale('y', $event)"
      @contextmenu.stop.prevent="handleRightClick($event)"
    >
      <div
        class="scale_item"
        v-for="(item, index) in scaleList.y"
        :key="'scale_y_' + index"
        :style="item.style"
      >
        {{ item.text }}
      </div>
    </div>
    <!-- 参考线 -->
    <template
      v-if="Object.keys(guidesMap).length && currentProject"
      v-for="(guidesMapByProject, projectID) in guidesMap"
    >
      <div
        class="guides_x"
        v-for="item in guidesMapByProject.x"
        v-show="currentProject === projectID && guidesMapByProject.showGuides"
        :key="item.key"
        :guides_key="item.key"
        :project_id="projectID"
        :style="[{ 'width': width + 'px' }, item.style ]"
        :title="item.text"
        :type="item.type"
        @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
      >
        <div class="toolTip" :style="item.toolTip.style">{{ item.toolTip.text }}</div>
      </div>
      <div
        class="guides_y"
        v-for="item in guidesMapByProject.y"
        v-show="currentProject === projectID && guidesMapByProject.showGuides"
        :key="item.key"
        :guides_key="item.key"
        :project_id="projectID"
        :style="[{ 'height': height + 'px' }, item.style ]"
        :title="item.text"
        :type="item.type"
        @mousedown.stop.prevent="handleMouseDownOnGuides(item, $event)"
      >
        <div class="toolTip" :style="item.toolTip.style">{{ item.toolTip.text }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XFCScale',
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.board.scale
      }
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 刻度尺列表
      scaleList: {
        x: [],
        y: []
      },
      // 按项目划分的参考线map
      guidesMap: {},
      // 当前激活的项目
      currentProject: '',
      // 缩放级别
      zoom: {
        // 当前缩放级别 0: 未缩放 1: 放大一级 -1: 缩小一级
        current: 0,
        max: 5,
        min: -5
      }
    }
  },
  watch: {
    width: function (val) {
      console.log('width', val)
      let _t = this
      _t.computeScaleList('x', val)
    },
    height: function (val) {
      console.log('height', val)
      let _t = this
      _t.computeScaleList('y', val)
    }
  },
  methods: {
    // 计算刻度列表
    computeScaleList: function (type, val) {
      let _t = this
      // FIXME 默认一个大刻度为50px，需考虑按zoom等级来定义一个大刻度的长度
      let scale = 50
      let count = Math.ceil(val / scale)
      // 默认间距2px
      let margin = 2
      let tmpArr = []
      if (type === 'x') {
        for (let i = 0; i < count; i++) {
          tmpArr.push({
            style: {
              left: i * scale + margin + 'px'
            },
            text: i * scale
          })
        }
        _t.scaleList.x = tmpArr
      } else if (type === 'y') {
        for (let i = 0; i < count; i++) {
          tmpArr.push({
            style: {
              top: i * scale + margin + 'px'
            },
            text: i * scale
          })
        }
        _t.scaleList.y = tmpArr
      }
    },
    // 处理刻度尺上mousedown事件
    handleMouseDownOnScale: function (type, event) {
      let _t = this
      // TODO 判断是否有已创建的项目，有则继续，无则提示
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      // 开始画线
      let timeNow = new Date().getTime()
      // 生成key
      let key = ['guides', type, timeNow].join('_')
      // 广播事件
      utils.bus.$emit('XFC/scale/guides/drag/start', {
        // 参考线key
        key: key,
        // 参考线类别
        type: type,
        // 状态
        status: {
          start: true,
          move: false,
          end: false
        },
        // 位置
        position: {
          start: {
            x: event.offsetX,
            y: event.offsetY
          }
        },
        // 条件
        condition: {
          draw: function (type, currentPosition, startPosition) {
            if (type === 'x') {
              if (currentPosition.y - startPosition.y > 5) {
                return true
              }
              return false
            } else if (type === 'y') {
              if (currentPosition.x - startPosition.x > 5) {
                return true
              }
              return false
            }
          }
        }
      })
    },
    // 处理参考线上mousedown事件
    handleMouseDownOnGuides: function (item, event) {
      // 广播事件
      utils.bus.$emit('XFC/scale/guides/drag/start', {
        // 参考线key
        key: item.key,
        // 参考线类别
        type: item.type,
        // 状态
        status: {
          start: true,
          move: false,
          end: false
        },
        // 位置
        position: {
          start: {
            x: event.offsetX,
            y: event.offsetY
          }
        },
        // 条件
        condition: {
          draw: function (type, currentPosition, startPosition) {
            if (type === 'x') {
              if (currentPosition.y - startPosition.y > 5) {
                return true
              }
              return false
            } else if (type === 'y') {
              if (currentPosition.x - startPosition.x > 5) {
                return true
              }
              return false
            }
          }
        }
      })
    },
    // 处理参考线移动
    handleGuidesMove: function (info) {
      let _t = this
      if (!info.status.start || !info.status.move) {
        return
      }
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      // 移动时显示参考线
      _t.guidesMap[_t.currentProject]['showGuides'] = true
      let guidesMap = {
        x: _t.guidesMap[_t.currentProject]['x'],
        y: _t.guidesMap[_t.currentProject]['y']
      }
      // 开始画线
      let timeNow = new Date().getTime()
      // 1.处理key
      info.key = info.key || ['guides', info.type, timeNow].join('_')
      let leftVal = info.position.move.x + 'px'
      let topVal = info.position.move.y + 'px'
      // 判断当前key是否已存在
      if (info.type === 'x') {
        guidesMap[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: topVal,
          style: {
            top: topVal
          },
          toolTip: {
            text: topVal,
            style: {
              display: 'inline-block',
              left: leftVal
            }
          }
        }
      } else if (info.type === 'y') {
        guidesMap[info.type][info.key] = {
          key: info.key,
          type: info.type,
          text: leftVal,
          style: {
            left: leftVal
          },
          toolTip: {
            text: leftVal,
            style: {
              display: 'inline-block',
              top: topVal
            }
          }
        }
      }
      _t.guidesMap[_t.currentProject] = {
        ..._t.guidesMap[_t.currentProject],
        ...guidesMap
      }
    },
    // 桌面右键点击
    handleRightClick: function (event) {
      let _t = this
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      let xfcEl = document.querySelector('#xfc')
      let xVal
      let yVal
      if (xfcEl) {
        xVal = event.clientX - xfcEl.offsetLeft
        yVal = event.clientY - xfcEl.offsetTop
      } else {
        xVal = event.offsetX
        yVal = event.offsetY
      }
      // 菜单信息
      let contextMenuInfo = {
        isShow: true,
        x: xVal,
        y: yVal,
        target: 'XFC_board',
        list: [
          {
            name: 'showGuides',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: _t.guidesMap[_t.currentProject]['showGuides'] ? '隐藏参考线' : '显示参考线',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XFC/scale/guides/toggle'
            }
          },
          {
            name: 'showToolTip',
            icon: {
              type: '',
              style: '',
              category: 'iconfont'
            },
            text: _t.guidesMap[_t.currentProject]['showToolTip'] ? '隐藏参考线坐标' : '显示参考线坐标',
            enable: true,
            action: {
              type: 'bus',
              handler: 'XFC/scale/guides/toolTip/toggle'
            }
          }
        ]
      }
      // 广播事件
      utils.bus.$emit('XFC/contextMenu/show', contextMenuInfo)
    },
    // 处理toolTip显示隐藏
    toggleToolTip: function () {
      let _t = this
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      // 遍历参考线，处理toolTip显示隐藏
      let guidesMap = {
        x: _t.guidesMap[_t.currentProject]['x'],
        y: _t.guidesMap[_t.currentProject]['y']
      }
      Object.keys(guidesMap).map(type => {
        Object.keys(guidesMap[type]).map(key => {
          guidesMap[type][key]['toolTip']['style'] = {
            ...guidesMap[type][key]['toolTip']['style'],
            'display': _t.guidesMap[_t.currentProject]['showToolTip'] ? 'inline-block' : 'none'
          }
        })
      })
      _t.guidesMap[_t.currentProject] = {
        ..._t.guidesMap[_t.currentProject],
        ...guidesMap
      }
    },
    clearGuidesByProject: function (projectID) {
      let _t = this
      // 清空当前项目的参考线
      _t.guidesMap = {
        ..._t.guidesMap,
        [projectID]: {
          ..._t.guidesMap[projectID],
          x: {},
          y: {}
        }
      }
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFC/scale/guides/drag/move', function (info) {
      _t.handleGuidesMove(info)
    })
    utils.bus.$on('XFC/scale/guides/drag/stop', function (info) {
      if (!info.status.start && !info.status.move && info.status.end) {
        // 处理toolTip显示隐藏
        _t.toggleToolTip()
      }
    })
    // 清空编辑器画板
    utils.bus.$on('XFC/board/clear', function () {
      // 清空所有参考线
      _t.guidesMap = {}
    })
    // 清空当前项目画布
    utils.bus.$on('XFC/canvas/clear', function (projectID) {
      // 清空当前项目的参考线
      _t.clearGuidesByProject(projectID)
    })
    // 清空当前项目的参考线
    utils.bus.$on('XFC/scale/guides/clear', function (projectID) {
      _t.clearGuidesByProject(projectID)
    })
    utils.bus.$on('XFC/scale/guides/toggle', function () {
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      _t.guidesMap[_t.currentProject]['showGuides'] = !_t.guidesMap[_t.currentProject]['showGuides']
    })
    utils.bus.$on('XFC/scale/guides/toolTip/toggle', function () {
      if (!Object.keys(_t.guidesMap).length || !_t.currentProject) {
        console.warn('Notice::请先创建项目！')
        return
      }
      _t.guidesMap[_t.currentProject]['showToolTip'] = !_t.guidesMap[_t.currentProject]['showToolTip']
      // 处理toolTip显示隐藏
      _t.toggleToolTip()
    })
    utils.bus.$on('XFC/project/add/ok', function (projectInfo) {
      _t.guidesMap = {
        ..._t.guidesMap,
        [projectInfo.id]: {
          x: {},
          y: {},
          // 显示参考线
          showGuides: true,
          // 显示toolTips
          showToolTip: false
        }
      }
      // 更新当前激活项目
      _t.currentProject = projectInfo.id
    })
    utils.bus.$on('XFC/project/trigger', function (projectID) {
      // 更新当前激活项目
      _t.currentProject = projectID
    })
    utils.bus.$on('XFC/project/remove', function (projectID) {
      // 删除当前操作对象数据
      delete _t.guidesMap[projectID]
    })
  }
}
</script>
