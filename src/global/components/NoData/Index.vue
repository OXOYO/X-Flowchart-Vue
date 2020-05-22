/**
 * Created by OXOYO on 2020/5/18
 *
 * 暂无数据
 */

<style scoped lang="less">
  .no-data {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    flex-wrap: nowrap;
    width: 100%;
    color: #000000;
    .icon {
      line-height: 1;
    }
    .text {
      font-size: 16px;
      margin: 0 10px;
    }

    &.small {
      .icon {
        font-size: 40px;
      }
    }
    &.medium {
      .icon {
        font-size: 60px;
      }
    }
    &.large {
      .icon {
        font-size: 80px;
      }
    }
    &.horizontal {
      flex-direction: row;
    }
    &.vertical {
      flex-direction: column;
    }
  }
</style>

<template>
  <div class="no-data" :class="className">
    <XIcon class="icon" :type="icon"></XIcon>
    <span class="text">
      {{ label }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'NoData',
    props: {
      icon: {
        type: String,
        default: 'no-data'
      },
      text: {
        type: String
      },
      textLang: {
        type: String,
        default: 'L10208'
      },
      size: {
        type: String,
        validator (value) {
          return ['small', 'medium', 'large'].includes(value)
        },
        default: 'medium'
      },
      // 模式
      mode: {
        type: String,
        validator (value) {
          return ['horizontal', 'vertical'].includes(value)
        },
        default: 'vertical'
      }
    },
    computed: {
      label () {
        const _t = this
        let text = ''
        if (_t.text) {
          text = _t.text
        }
        if (_t.textLang) {
          text = _t.$t(_t.textLang)
        }
        return text
      },
      className () {
        const _t = this
        const className = []
        if (_t.size) {
          className.push(_t.size)
        }
        if (_t.mode) {
          className.push(_t.mode)
        }
        return className
      }
    }
  }
</script>
