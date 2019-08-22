/**
* Created by OXOYO on 2019/7/1.
*
* ContextMenu 右键菜单
*/

<style scoped lang="less" rel="stylesheet/less">
  .context-menu {
    position: absolute;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
    padding: 5px 0;
    z-index: 999;
  }
</style>

<template>
  <div class="context-menu">
    <h1>TODO ContextMenu</h1>
  </div>
</template>

<script>
  export default {
    name: 'ContextMenu'
  }
</script>
