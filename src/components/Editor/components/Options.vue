/**
* Created by OXOYO on 2019/7/1.
*
* Options 配置信息面板
*/

<style lang="less" rel="stylesheet/less">
  .options {
    display: inline-block;
    width: 100%;
    height: 100%;

    .form-item-block {
      padding: 10px 20px;

      .row {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: space-between;
        &.row-start {
          justify-content: flex-start;
        }
        .col {
          display: flex;
          align-items: center;
          align-content: center;
          justify-content: center;
          width: auto;
          line-height: 1;

          &.col-large {
            width: 100%;
            .ivu-form-item-content {
              flex: 1 1 auto;
            }
          }
          &.col-start {
            justify-content: flex-start;
          }

          +.col {
            margin-left: 10px;
          }
          .ivu-form-item-label {
            min-width: 50px;
            text-align: right;
            padding: 0 10px 0 0;
          }
          .ivu-form-item-content {
            display: inline-block;
            min-width: 80px;
          }
        }
      }

      .input-number {
        /*width: 60px;*/
      }

      .color-picker-box {
        .color-preview {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        .color-picker {

        }
      }
    }
  }
</style>

<template>
  <div class="options">
    <Form v-if="isNode || isEdge" label-position="top">
      <!-- 元素属性 -->
      <CardItem v-if="isNode" :title="$t('L10103')" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="X">
              <InputNumber class="input-number" v-model="formData.attrs.x" size="small" @on-change="val => handleChange(val, 'x')"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Y">
              <InputNumber class="input-number" v-model="formData.attrs.y" size="small" @on-change="val => handleChange(val, 'y')"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Width">
              <InputNumber class="input-number" v-model="formData.attrs.width" size="small" @on-change="val => handleChange(val, 'width')"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Height">
              <InputNumber class="input-number" v-model="formData.attrs.height" size="small" @on-change="val => handleChange(val, 'height')"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素样式 -->
      <CardItem :title="$t('L10104')" :enableFold="true">
        <div class="form-item-block">
          <template v-if="isNode">
            <div class="row">
              <FormItem class="col" label="Fill">
                <XColorPicker v-model="fillColor" @on-change="val => handleChange(val, 'fillColor')"></XColorPicker>
              </FormItem>
              <FormItem class="col" label="Fill Opacity">
                <Slider
                  v-model="formData.style.fillOpacity"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  @on-change="val => handleChange(val, 'fillOpacity')"
                >
                </Slider>
              </FormItem>
            </div>
            <div class="row">
              <FormItem class="col col-large col-start" label="Gradient">
                <div class="row row-start">
                  <Select class="col" v-model="gradientDirection" size="small" @on-change="val => handleChange(val, 'gradientDirection')">
                    <Option
                      v-for="(item, index) in gradientDirectionList"
                      :key="index"
                      :value="item.value"
                      :label="item.label"
                    >
                    </Option>
                  </Select>
                  <XColorPicker class="col" v-model="gradientColor" @on-change="val => handleChange(val, 'gradientColor')"></XColorPicker>
                </div>
              </FormItem>
            </div>
          </template>
          <div class="row">
            <FormItem class="col" label="Stroke">
              <XColorPicker v-model="formData.style.stroke" @on-change="val => handleChange(val, 'stroke')"></XColorPicker>
            </FormItem>
            <FormItem v-if="isEdge" class="col" label="stroke Opacity">
              <Slider
                v-model="formData.style.strokeOpacity"
                :min="0"
                :max="1"
                :step="0.1"
              >
              </Slider>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Line Dash">
              <Select v-model="lineDashName" size="small" @on-change="val => handleChange(val, 'lineDash')">
                <Option
                  v-for="(item, index) in lineDashList"
                  :key="index"
                  :value="item.name"
                  :label="item.name"
                >
                  <XIcon
                    v-if="item.icon"
                    :type="item.icon"
                    style="vertical-align: middle;"
                    :style="item.style"
                  >
                  </XIcon>
                  <span v-else>{{ item.label }}</span>
                </Option>
              </Select>
            </FormItem>
            <FormItem class="col" label="Line Width">
              <Slider
                v-model="formData.style.lineWidth"
                :min="1"
                :max="10"
                :step="1"
                @on-change="val => handleChange(val, 'lineWidth')"
              >
              </Slider>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="shadowColor">
              <XColorPicker v-model="formData.style.shadowColor" @on-change="val => handleChange(val, 'shadowColor')"></XColorPicker>
            </FormItem>
            <FormItem class="col" label="shadowBlur">

            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素文本样式 -->
      <CardItem :title="$t('L10105')" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="Label">
              <Input v-model="formData.label" size="small" style="width: 270px;" @on-change="val => handleChange(val, 'label')"></Input>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Position" v-if="formData.labelCfg">
              <Select v-model="formData.labelCfg.position" size="small" @on-change="val => handleChange(val, 'labelCfg.position')">
                <Option value="center">center</Option>
                <Option value="top">top</Option>
                <Option value="left">left</Option>
                <Option value="right">right</Option>
                <Option value="bottom">bottom</Option>
              </Select>
            </FormItem>
            <FormItem class="col" label="Offset" v-if="formData.labelCfg">
              <InputNumber v-model="formData.labelCfg.offset" size="small" @on-change="val => handleChange(val, 'labelCfg.offset')"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
    </Form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CardItem from './CardItem'

  export default {
    name: 'Options',
    components: {
      CardItem
    },
    data () {
      return {
        firstItem: null,
        lineDashName: null,
        gradientDirection: 0,
        fillColor: '#FFFFFF',
        gradientColor: '#FFFFFF',
        formData: {},
        // 渐变方向列表
        gradientDirectionList: [
          { name: 'top', label: 'Top', value: 270 },
          { name: 'right', label: 'Right', value: 0 },
          { name: 'bottom', label: 'Bottom', value: 90 },
          { name: 'left', label: 'Left', value: 180 }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'editor',
        'currentItem',
        'toolList'
      ]),
      lineDashList () {
        const _t = this
        const edgeConfig = _t.editor.$C.edge
        const lineDash = _t.toolList.find(item => item.enableTool && item.name === 'lineDash')
        const list = []
        if (lineDash && lineDash.enable && lineDash.children) {
          lineDash.children.forEach(item => {
            if (item.enable) {
              const typeData = edgeConfig.type[item.name]
              list.push({
                name: item.name,
                label: item.label,
                lang: item.lang,
                icon: item.icon,
                lineDash: typeData && typeData.lineDash ? typeData.lineDash : []
              })
            }
          })
        }
        return list
      },
      isNode () {
        return this.firstItem && this.firstItem.type === 'node'
      },
      isEdge () {
        return this.firstItem && this.firstItem.type === 'edge'
      }
    },
    watch: {
      currentItem: {
        handler (val) {
          const _t = this
          console.log('watch')
          // 取第一个节点
          _t.firstItem = val[0]
          if (_t.firstItem) {
            // 解构属性
            const model = JSON.parse(JSON.stringify(_t.firstItem.model))
            console.log('model', model)
            const { labelCfg } = model
            const formData = {}
            if (_t.isNode) {
              const { x, y, width, height, style, label } = model
              // 元素属性
              formData.attrs = {
                x,
                y,
                width,
                height
              }
              // 元素样式属性
              formData.style = {
                fill: style.fill,
                stroke: style.stroke,
                lineWidth: style.lineWidth,
                lineDash: style.lineDash,
                shadowColor: style.shadowColor,
                shadowBlur: style.shadowBlur,
                shadowOffsetX: style.shadowOffsetX,
                shadowOffsetY: style.shadowOffsetY,
                fillOpacity: style.fillOpacity
              }
              // 元素文本
              formData.label = label
              formData.labelCfg = {
                position: labelCfg.position,
                offset: labelCfg.offset
              }
            } else if (_t.isEdge) {
              const {
                // type,
                style,
                label
              } = model
              // 元素属性
              // formData.attrs = {
              //   type
              // }
              // 元素样式属性
              formData.style = {
                stroke: style.stroke,
                lineWidth: style.lineWidth,
                lineDash: style.lineDash,
                shadowColor: style.shadowColor,
                shadowBlur: style.shadowBlur,
                shadowOffsetX: style.shadowOffsetX,
                shadowOffsetY: style.shadowOffsetY,
                strokeOpacity: style.strokeOpacity,
                lineAppendWidth: style.lineAppendWidth,
                endArrow: style.endArrow,
                startArrow: style.startArrow
              }
              // 元素文本
              formData.label = label
              formData.labelCfg = {
                position: labelCfg.position,
                refX: labelCfg.refX,
                refY: labelCfg.refY,
                autoRotate: labelCfg.autoRotate
              }
            }
            // 元素文本样式，节点与边通用
            formData.labelStyle = {
              fill: labelCfg.style.fill,
              stroke: labelCfg.style.stroke,
              lineWidth: labelCfg.style.lineWidth,
              shadowColor: labelCfg.style.shadowColor,
              shadowBlur: labelCfg.style.shadowBlur,
              shadowOffsetX: labelCfg.style.shadowOffsetX,
              shadowOffsetY: labelCfg.style.shadowOffsetY,
              opacity: labelCfg.style.opacity,
              font: labelCfg.style.font,
              textAlign: labelCfg.style.textAlign,
              textBaseline: labelCfg.style.textBaseline,
              fontStyle: labelCfg.style.fontStyle,
              fontVariant: labelCfg.style.fontVariant,
              fontWeight: labelCfg.style.fontWeight,
              fontSize: labelCfg.style.fontSize,
              fontFamily: labelCfg.style.fontFamily,
              lineHeight: labelCfg.style.lineHeight
            }
            /*
            // 处理线条样式
            const target = _t.lineDashList.find(item => JSON.stringify(item.lineDash) === JSON.stringify(_t.formData.style.lineDash))
            _t.lineDashName = target ? target.name : ''
            // 处理填充色
            if (/^l\(\d{1,3}\)/gi.test(_t.formData.style.fill)) {
              const gradientDirection = _t.formData.style.fill.match(/^l\((\d{1,3})\)/gi)[0].match(/\d{1,3}/gi)[0]
              const [fillColor, gradientColor] = _t.formData.style.fill.match(/[0,1]{1}:#([\da-f]{3}){1,2}/gi)
              console.log('fileColor', gradientDirection, typeof gradientDirection, fillColor, gradientColor)
              _t.gradientDirection = gradientDirection ? parseInt(gradientDirection) : 0
              _t.fillColor = fillColor.replace('0:', '')
              _t.gradientColor = gradientColor.replace('1:', '')
            }
            */
            _t.formData = formData
          } else {
            _t.formData = {}
          }
        },
        deep: true
      }
    },
    methods: {
      handleChange (val, from) {
        const _t = this
        console.log('change', val, from)
        // 处理数据
        let model = {
          style: _t.formData.style,
          label: _t.formData.label,
          labelCfg: {
            ..._t.formData.labelCfg,
            style: _t.formData.labelStyle
          }
        }
        if (_t.isNode) {
          model = {
            ...model,
            ..._t.formData.attrs
          }
        }
        // 处理lineDash
        if (_t.lineDashName) {
          const target = _t.lineDashList.find(item => item.name === _t.lineDashName)
          model.style.lineDash = target ? target.lineDash : []
        }
        // 处理渐变色
        if (typeof _t.gradientDirection === 'number' && _t.gradientColor && _t.fillColor) {
          model.style.fill = `l(${_t.gradientDirection}) 0:${_t.fillColor} 1:${_t.gradientColor}`
        } else {
          model.style.fill = _t.fillColor
        }
        // node元素需处理size
        if (_t.isNode) {
          model.size = [ _t.formData.width, _t.formData.height ]
        }
        // 当前节点数组
        const currentItemArr = _t.currentItem
        // 更新第一个节点
        if (_t.firstItem) {
          currentItemArr[0] = {
            ..._t.firstItem,
            model
          }
        }
        // 广播事件
        _t.$X.utils.bus.$emit('editor/currentItem/update', currentItemArr)
      }
    }
  }
</script>
