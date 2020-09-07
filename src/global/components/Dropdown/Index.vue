/**
 * Created by OXOYO on 2020/9/3
 *
 *
 */

<style scoped lang="less">
  .x-dropdown {
    position: relative;

    .x-dropdown-rel {}
    .x-dropdown-list {
      position: absolute;
      margin: 5px 0;
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
      z-index: 900;
    }
  }
</style>

<template>
  <div class="x-dropdown" v-click-outside="onClickOutside">
    <div class="x-dropdown-rel" @click="handleClick">
      <slot></slot>
    </div>
    <div class="x-dropdown-list" v-show="currentVisible">
      <slot name="list"></slot>
    </div>
  </div>
</template>

<script>
  import { createPopper } from '@popperjs/core'
  export default {
    name: 'XDropdown',
    props: {
      trigger: {
        type: String,
        validator (value) {
          return ['hover', 'click', 'contextMenu'].includes(value)
        },
        default: 'hover'
      },
      placement: {
        type: String,
        validator (value) {
          return ['top', 'bottom', 'right', 'left'].includes(value)
        },
        default: 'bottom'
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentVisible: false,
        popper: null
      }
    },
    watch: {
      visible (val) {
        this.currentVisible = val
      },
      currentVisible (val) {
        if (val) {
          this.popperUpdate()
        } else {
          this.popperDestroy()
        }
        this.$emit('on-visible-change', val)
      }
    },
    methods: {
      handleClose () {
        this.currentVisible = false
      },
      handleOpen () {
        this.currentVisible = true
      },
      handleClick () {
        this.currentVisible = !this.currentVisible
      },
      onClickOutside () {
        this.handleClose()
      },
      popperUpdate () {
        if (this.popper) {
          this.$nextTick(() => {
            this.popper.update()
          })
        } else {
          const rel = this.$el.querySelector('.x-dropdown-rel')
          const list = this.$el.querySelector('.x-dropdown-list')
          this.popper = createPopper(rel, list, {
            placement: this.placement
          })
        }
      },
      popperDestroy () {
        if (this.popper) {
          this.popper.destroy()
          this.popper = null
        }
      }
    },
    mounted () {
      this.$on('on-click', key => {
        this.currentVisible = false
      })
    }
  }
</script>
