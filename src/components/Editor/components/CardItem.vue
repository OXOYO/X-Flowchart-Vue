/**
* Created by OXOYO on 2019/7/1.
*
* CardItem
*/

<style scoped lang="less" rel="stylesheet/less">
  .card-item {
    display: inline-block;
    width: 100%;
    /*height: 200px;*/
    position: relative;

    .header {
      display: inline-block;
      width: 100%;
      padding: 5px 0;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      &:hover {
        background: rgba(0, 0, 0, .1);
      }

      .title {
        width: 100%;
        height: 25px;
        line-height: 25px;
        text-indent: 10px;
        color: #000;

        &.bold {
          font-weight: 800;
        }
      }

      .handler {
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -9px;
        z-index: 10;
        cursor: pointer;
      }
    }
    .body {
      display: inline-block;
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
  }
</style>

<template>
  <div class="card-item">
    <div class="header" @click="handleToggle">
      <div :class="{ 'title': true, 'bold': bold }" v-if="title">{{ title }}</div>
      <div class="handler" v-if="enableFold">
        <Icon type="ios-arrow-up" v-show="!isFolded"></Icon>
        <Icon type="ios-arrow-down" v-show="isFolded"></Icon>
      </div>
    </div>
    <div class="body" v-show="!isFolded">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CardItem',
    props: {
      title: String,
      // 支持折叠
      enableFold: {
        type: Boolean,
        default: false
      },
      // 默认是否折叠
      fold: {
        type: Boolean,
        default: false
      },
      // 标题加粗
      bold: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        // 是否已折叠
        isFolded: false
      }
    },
    watch: {
      fold: function (val, newVal) {
        let _t = this
        if (_t.enableFold) {
          _t.isFolded = newVal
        }
      }
    },
    methods: {
      handleToggle: function () {
        let _t = this
        if (!_t.enableFold) {
          return
        }
        // 处理面板折叠
        _t.isFolded = !_t.isFolded
      }
    }
  }
</script>
