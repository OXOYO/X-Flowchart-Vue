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
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .header {
      display: inline-block;
      width: 100%;
      position: relative;

      .title {
        width: 100%;
        height: 25px;
        line-height: 25px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        text-indent: 10px;
      }

      .handler {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 10;
      }
    }
    .body {
      display: inline-block;
      width: 100%;
    }
  }
</style>

<template>
  <div class="card-item">
    <div class="header" @click="handleToggle">
      <div class="title" v-if="title">{{ title }}</div>
      <div class="handler">
        <Icon type="ios-arrow-up" v-show="enableFold && !isFolded"></Icon>
        <Icon type="ios-arrow-down" v-show="enableFold && isFolded"></Icon>
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
      enableFold: {
        type: Boolean,
        default: false
      },
      fold: {
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
