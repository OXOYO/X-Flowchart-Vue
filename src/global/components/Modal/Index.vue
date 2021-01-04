/**
 * Created by OXOYO on 2020/9/3
 *
 *
 */

<style scoped lang="less">
  .x-modal {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2000;
    &-mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(55, 55, 55, .6);
      height: 100%;
    }
    &-wrap {
      z-index: 10;
      position: relative;
      margin: 0 auto;
      outline: 0;
      top: 100px;
      background-color: #fff;
      border: 0;
      border-radius: 0px;
      background-clip: padding-box;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    }
    &-header {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      border-bottom: 1px solid #e8eaec;
      padding: 14px 16px;
      line-height: 1;
      &_content {
        flex: 1 1 auto;
      }
      &_close {
        flex: 0 0 auto;
        cursor: pointer;
        color: #999999;
        &:hover {
          color: #444444;
        }
      }
    }
    &-body {
      padding: 16px;
      font-size: 14px;
      line-height: 1.5;
    }
    &-footer {
      border-top: 1px solid #e8eaec;
      padding: 12px 18px;
      text-align: right;
    }
  }
</style>

<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">

    <div class="x-modal" v-show="visible">
      <div v-if="mask" class="x-modal-mask" @click="onMaskClick"></div>
      <div class="x-modal-wrap" :style="wrapStyle">
        <div v-if="header" class="x-modal-header">
          <div class="x-modal-header_content">
            <slot name="header"></slot>
          </div>
          <div v-if="close" class="x-modal-header_close" @click="onCancel">
            <slot name="close">
              <XIcon iconfont="close"></XIcon>
            </slot>
          </div>
        </div>
        <div class="x-modal-body">
          <slot></slot>
        </div>
        <div v-if="footer" class="x-modal-footer">
          <slot name="footer">
            <XButton type="default" @click="onCancel">{{ cancelText }}</XButton>
            <XButton type="primary" @click="onOk">{{ okText }}</XButton>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'XModal',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      title: {},
      // 是否显示头部
      header: {
        type: Boolean,
        default: true
      },
      // 是否显示底部
      footer: {
        type: Boolean,
        default: true
      },
      // 是否显示关闭按钮
      close: {
        type: Boolean,
        default: true
      },
      // 是否显示遮罩
      mask: {
        type: Boolean,
        default: true
      },
      // 是否可以点击遮罩关闭
      maskClosable: {
        type: Boolean,
        default: true
      },
      // 确定按钮文字
      okText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      width: {
        type: String,
        default: '520px'
      },
      beforeClose: Function,
      appendToBody: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        closed: false
      }
    },
    computed: {
      wrapStyle () {
        const style = {}
        if (this.width) {
          style.width = this.width
        }
        return style
      }
    },
    watch: {
      visible: {
        handler (val) {
          if (val) {
            this.closed = false
            this.$emit('open')
            if (this.appendToBody) {
              document.body.appendChild(this.$el)
            }
          } else {
            if (!this.closed) {
              this.$emit('close')
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      onMaskClick () {
        console.log('onMaskClick', this.maskClosable)
        if (this.maskClosable) {
          this.handleClose()
        }
      },
      handleClose () {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.onCancel)
        } else {
          this.onCancel()
        }
      },
      onCancel () {
        this.closed = true
        this.$emit('update:visible', false)
        this.$emit('on-cancel')
      },
      onOk () {
        this.$emit('on-ok')
      },
      afterEnter () {
        this.$emit('opened')
      },
      afterLeave () {
        this.$emit('closed')
      }
    },
    destroyed () {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
</script>
