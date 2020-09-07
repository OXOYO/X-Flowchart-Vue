/**
 * Created by OXOYO on 2020/9/3
 *
 *
 */

<style scoped lang="less">
  .x-dropdown-menu {
    min-width: 100px;
  }
</style>

<template>
  <ul class="x-dropdown-menu">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'XDropdownMenu'
  }
</script>
