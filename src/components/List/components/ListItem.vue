/**
* Created by OXOYO on 2018/7/13.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .navigate{
    font-size: 14px;

    .menu-block {
      width: 100% !important;
      text-align: left;

      display: inline-block;
      margin: 0;
      padding: 0;
      outline: 0;
      color: #495060;
      font-size: 14px;
      position: relative;

      &:after {
        display: none;
      }

      .menu-group {

        .menu-group-header {
          height: 48px;
          line-height: 48px;
          font-size: 14px;
          padding-left: 28px;
          color: #999;
        }
        .menu-group-body {

          .menu-item {
            display: inline-block;
            margin: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*padding: 14px 24px 14px 34px;*/
            position: relative;
            cursor: pointer;
            transition: all .2s ease-in-out;

            &:hover {
              background: #f3f3f3;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="navigate">
    <div class="menu-block">
      <div
        class="menu-group"
        v-for="category in navigate.components"
        :key="category.type"
        :title="category.title"
      >
        <div class="menu-group-header">{{ category.title }}</div>
        <div class="menu-group-body">
          <!--<div
            class="menu-item"
            v-for="component in category.children"
            :key="component.name"
            :name="component.name"
            draggable="true"
            @dragstart="handleDragStart(component, $event)"
          >
            <XFCIcon :type="component.icon"></XFCIcon>
            {{ component.title }}
          </div>-->
          <component
            class="menu-item"
            v-for="(component, index) in category.children"
            :key="index"
            :name="component.name"
            :is="component.name"
            :title="component.title || component.name"
            draggable="true"
            @dragstart.native="handleDragStart(component, $event)"
          >
            <XFCIcon :type="component.icon"></XFCIcon>
            {{ component.title }}
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/config.js'
import navigate from '../config/navigate'

export default {
  name: 'XFCListItem',
  data () {
    return {
      Config,
      navigate,
      lang: this.$lang
    }
  },
  methods: {
    handleDragStart: function (component, event) {
      let _t = this
      console.log('handleDragStart', component.name)
      // 拖拽的节点数据
      let nodeInfo = {
        // 唯一标识，防止在画布上拖拽时重复生成
        id: 'node-' + ((new Date()).getTime()),
        component: component,
        props: {},
        slots: {},
        options: {},
        innerHTML: ''
      }
      event.dataTransfer.setData('node', JSON.stringify(nodeInfo))
      console.log('handleDragStart nodeInfo', nodeInfo, _t.lang)
    }
  }
}
</script>
