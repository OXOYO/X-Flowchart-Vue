/**
* Created by OXOYO on 2019/8/22.
*
* App
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <Editor></Editor>
</template>

<script>
  import Editor from './components/Editor/Index'
  export default {
    name: 'App',
    components: {
      Editor
    },
    created () {
      // 阻止浏览器默认右键菜单
      document.oncontextmenu = function (event) {
        if (event.stopPropagation) {
          event.stopPropagation()
        }
        if (event.preventDefault) {
          event.preventDefault()
        }
      }
    }
  }
</script>
