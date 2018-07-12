/**
* Created by OXOYO on 2018/3/28.
*
* 右键菜单元素
*/

<style scoped lang="less" rel="stylesheet/less">
</style>

<template>
  <div
    v-if="info.enable"
    class="context-menu-item"
    :name="info.name"
    :style="info.style"
    @click.stop.prevent="triggerMenuItem"
  >
    <XUIIcon
      class="context-menu-icon"
      v-if="info.icon && info.icon.category === 'iview'"
      :type="info.icon.type"
      :style="info.icon.style"
    >
    </XUIIcon>
    <i
      v-if="info.icon && info.icon.category === 'iconfont'"
      :class="['context-menu-icon', 'iconfont', info.icon.type]"
      :style="info.icon.style"
      :title="info.text"
    >
    </i>
    <div class="context-menu-label">
      <div class="context-menu-label-text">{{ info.text }}</div>
      <i
        v-if="info.children && info.children.length"
        :class="['context-menu-icon-child', 'iconfont', 'icon-arrow-right']"
      >
      </i>
    </div>
    <slot name="child"></slot>
  </div>
</template>

<script>
import utils from '@/global/utils'

export default {
  name: 'ContextMenuItem',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 触发菜单
    triggerMenuItem: function () {
      let _t = this
      console.log('triggerMenuItem', _t.info.text, _t.info.name)
      let handler
      // 执行菜单相应操作
      if (_t.info && _t.info.action && _t.info.action.type && _t.info.action.handler) {
        switch (_t.info.action.type) {
          case 'bus':
            handler = function () {
              utils.bus.$emit(_t.info.action.handler, _t.info.action.params)
            }
            break
          case 'callback':
            handler = function () {
              if (_t.info.action.handler && typeof _t.info.action.handler === 'function') {
                _t.info.action.handler(_t.info.action.params)
              }
            }
            break
        }
        // 执行前置钩子函数
        let beforeFlag = false
        if (_t.info.action.beforeTrigger && typeof _t.info.action.beforeTrigger === 'function') {
          beforeFlag = _t.info.action.beforeTrigger()
        } else {
          beforeFlag = true
        }
        // 执行处理函数
        if (beforeFlag) {
          handler()
        }
        // 执行后置钩子函数
        if (_t.info.action.afterTrigger && typeof _t.info.action.afterTrigger === 'function') {
          _t.info.action.afterTrigger()
        }
      }
      // 广播事件，关闭菜单
      utils.bus.$emit('XFC/contextMenu/hide')
    }
  }
}
</script>
