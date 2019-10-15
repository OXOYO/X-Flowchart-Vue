/**
* Created by OXOYO on 2019/5/29.
*
* Icon
*/

<style scoped lang="less" rel="stylesheet/less">
  .icon {

  }
</style>

<template>
  <span v-if="type" class="icon iconfont" :class="[type ? 'xfv-icon-' + type : '']"></span>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      type: String
    }
  }
</script>
