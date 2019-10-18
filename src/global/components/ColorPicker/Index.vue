/**
* Created by OXOYO on 2019/10/17.
*
* ColorPicker
*/

<style scoped lang="less" rel="stylesheet/less">
  .color-picker-box {
    position: relative;

    .preview {
      display: inline-block;
      &:hover {
        color: #57a3f3;
      }
      .color-preview {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        background: transparent;
        border: 1px solid #cccccc;
        margin-right: 3px;
      }
      .color-icon {
        vertical-align: middle;
      }
    }
    .panel {
      position: absolute;
      z-index: 10;
      background: #ffffff;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, .1);

      .sketch-picker {
        border: none;
        box-shadow: none;
      }
      .btn-block {
        text-align: right;
        padding: 10px;
        border-top: 1px solid #eee;

        .btn {
          &+.btn {
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="color-picker-box" v-click-outside="doHide">
    <div class="preview" @click="togglePanel" v-if="preview">
      <slot name="preview">
        <div class="color-preview" :style="{ background: color }"></div>
        <Icon class="color-icon" type="ios-arrow-down"></Icon>
      </slot>
    </div>
    <div class="panel" v-show="!preview || (preview && showPanel)">
      <SketchPicker
        class="sketch-picker"
        :value="color"
        :presetColors="presetColors"
        @input="handleChange"
      ></SketchPicker>
      <div class="btn-block">
        <Button class="btn" type="default" size="small" @click="doHide">{{ $t('L10203') }}</Button>
        <Button class="btn" type="primary" size="small" @click="doConfirm">{{ $t('L10205') }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ColorPicker',
    props: {
      value: {
        type: String,
        default: ''
      },
      // 是否显示预览
      preview: {
        type: Boolean,
        default: true
      },
      // 预设颜色
      presetColors: {
        type: Array,
        default: () => [
          '#2d8cf0',
          '#19be6b',
          '#ff9900',
          '#ed4014',
          '#00b5ff',
          '#19c919',
          '#f9e31c',
          '#ea1a1a',
          '#9b1dea',
          '#00c2b1',
          '#ac7a33',
          '#1d35ea',
          '#8bc34a',
          '#f16b62',
          '#ea4ca3',
          '#0d94aa',
          '#febd79',
          '#5d4037',
          '#00bcd4',
          '#f06292',
          '#cddc39',
          '#607d8b',
          '#000000',
          '#ffffff'
        ]
      }
    },
    data () {
      return {
        showPanel: false,
        color: ''
      }
    },
    watch: {
      value (val) {
        let _t = this
        _t.color = val
      }
    },
    methods: {
      doShow () {
        let _t = this
        _t.showPanel = true
      },
      doHide () {
        let _t = this
        _t.showPanel = false
        _t.$emit('on-close')
      },
      togglePanel () {
        let _t = this
        _t.showPanel = !_t.showPanel
      },
      handleChange (val) {
        let _t = this
        _t.color = typeof val === 'object' && val.hasOwnProperty('hex8') ? val.hex8 : ''
        _t.$emit('input', _t.color)
      },
      doConfirm () {
        let _t = this
        _t.$emit('on-change', _t.color)
        _t.doHide()
      }
    }
  }
</script>
