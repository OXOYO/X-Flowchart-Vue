/**
* Created by OXOYO on 2018/9/12.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .material-item {
    display: inline-block;
    font-size: 0;
  }
</style>

<template>
  <div class="material-item">
    <P5
      @sketch="sketch"
    ></P5>
  </div>
</template>

<script>
export default {
  name: 'XMRound',
  methods: {
    sketch: function (sketch) {
      console.log('sketch', sketch)
      sketch.setup = function () {
        sketch.createCanvas(30, 30)
        sketch.background('red')
      }
      sketch.draw = function () {
        // sketch.fill('red')
        sketch.strokeWeight(2)
        sketch.ellipse(15, 15, 26, 26)
      }
    }
  }
}
</script>
