/**
 * Created by OXOYO on 2020/9/3
 *
 *
 */

<style scoped lang="less">
  .x-dropdown-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #515a6e;
    font-size: 14px;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
    &:hover {
      background: #f3f3f3;
    }
  }
  .x-dropdown-item-disabled {
    color: #c5c8ce;
    cursor: not-allowed;
  }
  .x-dropdown-item-selected {
    color: #2d8cf0;
  }
</style>

<template>
  <li :class="classes" @click="handleClick">
    <slot></slot>
  </li>
</template>

<script>
  const prefixCls = 'x-dropdown-item'
  export default {
    name: 'XDropdownItem',
    props: {
      name: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Boolean,
        default: false
      },
      divided: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      classes () {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-selected`]: this.selected,
            [`${prefixCls}-divided`]: this.divided
          }
        ]
      }
    },
    methods: {
      handleClick () {
        if (this.disabled) {
          return
        }
        const $parent = this.$X.utils.common.findComponentUpward(this, 'XDropdown')
        $parent.$emit('on-click', this.name)
      }
    }
  }
</script>
