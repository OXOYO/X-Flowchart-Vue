/**
* Created by OXOYO on 2018/9/11.
*
*/

<style scoped lang="less" rel="stylesheet/less">
  .p5 {
    display: inline-block;
  }
</style>

<template>
  <div class="p5"></div>
</template>

<script>
const p5 = require('p5')

export default {
  name: 'P5',
  mounted: function () {
    let _t = this
    // let eventNames = {
    //   preload: 'preload',
    //   setup: 'setup',
    //   draw: 'draw',
    //   keyPressed: 'keypressed',
    //   keyReleased: 'keyreleased',
    //   keyTyped: 'keytyped',
    //   mouseMoved: 'mousemoved',
    //   mouseDragged: 'mousedragged',
    //   mousePressed: 'mousepressed',
    //   mouseReleased: 'mousereleased',
    //   mouseClicked: 'mouseclicked',
    //   doubleClicked: 'doubleclicked',
    //   mouseWheel: 'mousewheel',
    //   touchStarted: 'touchstarted',
    //   touchMoved: 'touchmoved',
    //   touchEnded: 'touchended',
    //   deviceMoved: 'devicemoved',
    //   deviceTurned: 'deviceturned',
    //   deviceShaken: 'deviceshaken'
    // }
    /* eslint-disable */
    new p5 (sketch => {
      _t.$emit('sketch', sketch)
      // for (let p5EventName in eventNames) {
      //   let vueEventName = eventNames[p5EventName]
      //   let savedCallback = sketch[p5EventName]
      //   sketch[p5EventName] = (...args) => {
      //     if (savedCallback) {
      //       savedCallback(sketch, ...args)
      //     }
      //     _t.$emit(vueEventName, sketch, ...args)
      //   }
      // }
    }, _t.$el)
    /* eslint-enable */
  }
}
</script>
