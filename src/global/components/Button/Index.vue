/**
 * Created by OXOYO on 2020/9/3
 *
 *
 */

<style scoped lang="less">
  .x-btn {
    display: inline-block;
    border-radius: 0;
    font-weight: 400;
    vertical-align: middle;
    cursor: pointer;
    background-image: none;
    border: 1px solid #dcdee2;
    white-space: nowrap;
    user-select: none;
    height: 32px;
    line-height: 1.5;
    padding: 0 15px;
    font-size: 14px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #515a6e;
    background-color: #fff;

    &:hover {
      color: #57a3f3;
      background-color: #fff;
      border-color: #57a3f3;
    }

    &+.x-btn {
      margin-left: 10px;
    }
    &-type-default {}
    &-type-primary {
      color: #fff;
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      &:active,
      &:hover {
        color: #ffffff;
        background-color: #57a3f3;
        border-color: #57a3f3;
      }
    }
    &-type-dashed {
      color: #515a6e;
      background-color: #fff;
      border-color: #dcdee2;
      border-style: dashed;
      &:hover {
        color: #57a3f3;
        background-color: #fff;
        border-color: #57a3f3;
      }
    }
    &-type-text {
      color: #515a6e;
      background-color: transparent;
      border-color: transparent;
      &:hover {
        color: #57a3f3;
        background-color: #fff;
        border-color: transparent;
      }
    }
    &-size-small {
      height: 24px;
      padding: 0 7px;
      font-size: 14px;
    }
    &-size-large {
      height: 40px;
      padding: 0 15px;
      font-size: 16px;
      border-radius: 4px;
    }
    &-long {
      width: 100%;
    }
  }
</style>

<template>
  <div class="x-btn" :class="classList" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XButton',
    props: {
      type: {
        type: String,
        validator (value) {
          return ['default', 'primary', 'dashed', 'text'].includes(value)
        },
        default: 'default'
      },
      size: {
        type: String,
        validator (value) {
          return ['default', 'small', 'large'].includes(value)
        },
        default: 'default'
      }
    },
    computed: {
      classList () {
        const type = `x-btn-type-${this.type}`
        const size = `x-btn-size-${this.size}`
        return [ type, size ]
      }
    },
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
</script>
