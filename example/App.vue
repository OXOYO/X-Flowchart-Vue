<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<template>
  <div id="app">
    <div id="xfc"></div>
  </div>
</template>

<script>
  import xfc from '../dist/xfc.umd.min.js'
  import '../dist/xfc.css'
  export default {
    name: 'app',
    mounted () {
      xfc({
        el: '#xfc'
      })
    }
  }
</script>
