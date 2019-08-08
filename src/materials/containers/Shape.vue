/**
* Created by OXOYO on 2018/9/11.
*
*/

<style scoped lang="less" rel="stylesheet/less">

</style>

<template>
  <div class="shape">
    <P5
      @sketch="sketch"
    ></P5>
  </div>
</template>

<script>
export default {
  name: 'Shape',
  methods: {
    sketch: function (sketch) {
      console.log('sketch', sketch)
      sketch.setup = function () {
        sketch.createCanvas(30, 30)
        sketch.background('red')
      }
      sketch.draw = function () {
        sketch.fill(255)
        sketch.rect(1, 1, 28, 28)
        sketch.strokeWeight(2)
      }
    }
  }
}
</script>
