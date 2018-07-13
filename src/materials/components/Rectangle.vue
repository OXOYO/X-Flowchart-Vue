/**
* Created by OXOYO on 2018/7/13.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .material-item {
    width: 100px;
    height: 80px;
    border: 2px solid rgba(0, 0, 0, 1);
  }
</style>

<template>
  <div class="material-item"></div>
</template>

<script>
export default {
  name: 'Rectangle',
  props: {
    styles: {
      type: Object
    }
  }
}
</script>
