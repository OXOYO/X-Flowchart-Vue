/**
* Created by OXOYO on 2019/5/29.
*
* Icon
*/

<style scoped lang="less" rel="stylesheet/less">
  .icon {
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
  <div class="icon" :title="title">
    <div v-if="iconfont" class="iconfont" :class="[iconfont ? iconPrefix + iconfont : '']" :style="fontSize"></div>
    <img v-else-if="img" class="img" :src="img" :style="imgStyle">
    <div v-else class="label" :style="fontSize">{{ label }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      iconPrefix: {
        type: String,
        default: 'xfc-icon-'
      },
      iconfont: String,
      img: String,
      label: String,
      title: String,
      size: String
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
      fontSize () {
        return {
          'font-size': this.sizeValue
        }
      },
      imgStyle () {
        return {
          width: this.sizeValue,
          height: this.sizeValue
        }
      }
    }
  }
</script>
