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
  name: 'XMText',
  methods: {
    sketch: function (sketch) {
      console.log('sketch', sketch)
      sketch.setup = function () {
        sketch.createCanvas(30, 30)
      }
      sketch.draw = function () {
        sketch.textSize(30)
        sketch.fill('#000000')
        sketch.textAlign(sketch.LEFT, sketch.TOP)
        sketch.text('T', 7, -5)
      }
    }
  }
}
</script>
