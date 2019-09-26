/**
* Created by OXOYO on 2019/5/18.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .tool-item {
    display: inline-block;
    position: relative;
  }
</style>

<template>
  <div :class="{ 'tool-item': true, 'active': active, 'disabled': disabled }">
    <slot name="label" class="label">{{ label }}</slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: 'ToolItem',
    props: {
      label: String,
      active: Boolean,
      disabled: Boolean
    }
  }
</script>
