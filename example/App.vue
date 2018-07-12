<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .x-flowchart-example {
    width: 100%;
    height: 800px;
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
    <div class="x-flowchart-example">
      <!-- XFlowchart -->
      <XFlowchart></XFlowchart>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>
