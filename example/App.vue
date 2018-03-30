<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

<template>
  <div id="app">
    <a href="https://github.com/OXOYO/X-Flowchart-Vue" target="_blank">
      <img
        style="position: absolute; top: 0; right: 0; border: 0; z-index: 5000"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
        alt="Fork me on GitHub"
      >
    </a>
    <img src="./assets/logo.png">
    <!--<HelloWorld/>-->
    <XFlowchart></XFlowchart>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
