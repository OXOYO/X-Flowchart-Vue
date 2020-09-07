/**
* Created by OXOYO on 2019/5/29.
*
* Icon
*/

<style scoped lang="less" rel="stylesheet/less">
  .x-icon {
    display: inline-block;
    .iconfont {}
    .img {
      width: 100%;
      height: auto;
    }
    .label {}
  }
</style>

<template>
  <div class="x-icon" :title="title">
    <div v-if="iconfont" class="iconfont" :class="[iconfont ? iconPrefix + iconfont : '']" :style="fontStyle"></div>
    <img v-else-if="img" class="img" :src="img" :style="imgStyle">
    <div v-else class="label" :style="fontStyle">{{ label }}</div>
  </div>
</template>

<script>
  export default {
    name: 'XIcon',
    props: {
      iconPrefix: {
        type: String,
        default: 'xfc-icon-'
      },
      iconfont: String,
      img: String,
      label: String,
      title: String,
      size: [Number, String],
      imgSize: [Number, String, Array]
    },
    computed: {
      sizeValue () {
        const sizeMap = {
          small: 10,
          default: 16,
          large: 24
        }
        let size
        if (Object.keys(sizeMap).includes(this.size)) {
          size = sizeMap[this.size]
        } else if (!isNaN(parseInt(this.size))) {
          size = parseInt(this.size)
        }
        if (!size) {
          size = sizeMap.default
        }
        return `${size}px`
      },
      imgSizeValue () {
        let imgSizeValue
        if (this.imgSize) {
          if (Array.isArray(this.imgSize)) {
            if (this.imgSize.length === 1) {
              imgSizeValue = [this.imgSize[0], this.imgSize[0]]
            } else if (this.imgSize.length >= 2) {
              imgSizeValue = [this.imgSize[0], this.imgSize[1]]
            }
          } else if (!isNaN(parseInt(this.imgSize))) {
            imgSizeValue = [parseInt(this.imgSize), parseInt(this.imgSize)]
          }
        }
        return imgSizeValue
      },
      fontStyle () {
        return {
          'font-size': this.sizeValue
        }
      },
      imgStyle () {
        if (this.imgSizeValue && Array.isArray(this.imgSizeValue)) {
          const [ width, height ] = this.imgSizeValue
          return {
            width: `${width}px`,
            height: `${height}px`
          }
        }
        return {}
      }
    }
  }
</script>
