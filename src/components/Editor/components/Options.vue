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
    <Form v-if="Object.keys(formData).length" :model="formData" label-position="top">
      <!-- 元素属性 -->
      <CardItem :title="$t('L10103')" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="X">
              <InputNumber class="input-number" v-model="formData.x" size="small" @on-change="handleChange"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Y">
              <InputNumber class="input-number" v-model="formData.y" size="small" @on-change="handleChange"></InputNumber>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Width">
              <InputNumber class="input-number" v-model="formData.width" size="small" @on-change="handleChange"></InputNumber>
            </FormItem>
            <FormItem class="col" label="Height">
              <InputNumber class="input-number" v-model="formData.height" size="small" @on-change="handleChange"></InputNumber>
            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素样式 -->
      <CardItem :title="$t('L10104')" :enableFold="true">
        <div class="form-item-block">
          <template v-if="firstItem && firstItem.type === 'node'">
            <div class="row">
              <FormItem class="col" label="Fill">
                <XColorPicker v-model="fillColor" @on-change="handleChange"></XColorPicker>
              </FormItem>
              <FormItem class="col" label="Fill Opacity">
                <Slider
                  v-model="formData.style.fillOpacity"
                  :min="0"
                  :max="1"
                  :step="0.1"
                  @on-change="handleChange"
                >
                </Slider>
              </FormItem>
            </div>
          </template>
          <div class="row">
            <!-- 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff' -->
            <FormItem class="col col-large col-start" label="Gradient">
              <div class="row row-start">
                <Select class="col" v-model="gradientDirection" size="small" @on-change="handleChange">
                  <Option
                    v-for="(item, index) in gradientDirectionList"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  >
                  </Option>
                </Select>
                <XColorPicker class="col" v-model="gradientColor" @on-change="handleChange"></XColorPicker>
              </div>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Stroke">
              <XColorPicker v-model="formData.style.stroke" @on-change="handleChange"></XColorPicker>
            </FormItem>
            <FormItem class="col" label="stroke Opacity">
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
              <Select v-model="lineDashName" size="small" @on-change="handleChange">
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
                @on-change="handleChange"
              >
              </Slider>
            </FormItem>
          </div>
        </div>
      </CardItem>
      <!-- 元素文本样式 -->
      <CardItem :title="$t('L10105')" :enableFold="true">
        <div class="form-item-block">
          <div class="row">
            <FormItem class="col" label="Label">
              <Input v-model="formData.label" size="small" style="width: 270px;" @on-change="handleChange"></Input>
            </FormItem>
          </div>
          <div class="row">
            <FormItem class="col" label="Position" v-if="formData.labelCfg">
              <Select v-model="formData.labelCfg.position" size="small" @on-change="handleChange">
                <Option value="center">center</Option>
                <Option value="top">top</Option>
                <Option value="left">left</Option>
                <Option value="right">right</Option>
                <Option value="bottom">bottom</Option>
              </Select>
            </FormItem>
            <FormItem class="col" label="Offset" v-if="formData.labelCfg">
              <InputNumber v-model="formData.labelCfg.offset" size="small" @on-change="handleChange"></InputNumber>
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
        formData: {
          // x: 0,
          // y: 0,
          // width: 0,
          // height: 0,
          // style: {
          //   fill: '',
          //   fillOpacity: 1,
          //   stroke: '',
          //   strokeOpacity: 1,
          //   cursor: 'default',
          //   lineDash: '',
          //   lineWidth: ''
          // },
          // label: '',
          // labelCfg: {
          //   position: '',
          //   offset: 0
          // }
        },
        fieldMap: {
          // 启用字段
          enabled: [],
          // 禁用字段
          disabled: ['anchorPoints', 'shapeControl', 'size'],
          common: [
            {
              name: 'x',
              label: 'x坐标',
              lang: '',
              type: 'number',
              component: 'InputNumber',
              enable: true,
              children: []
            },
            {
              name: 'y',
              label: 'y坐标',
              lang: '',
              type: 'number',
              component: 'InputNumber',
              enable: true,
              children: []
            },
            {
              name: 'width',
              label: '宽度',
              lang: '',
              type: 'number',
              component: 'InputNumber',
              enable: true,
              children: []
            },
            {
              name: 'height',
              label: '高度',
              lang: '',
              type: 'number',
              component: 'InputNumber',
              enable: true,
              children: []
            },
            {
              name: 'label',
              label: '文本',
              lang: '',
              type: 'string',
              component: 'Input',
              enable: true,
              children: []
            },
            {
              name: 'labelCfg',
              label: '文本样式',
              lang: '',
              type: 'object',
              component: 'OptionGroup',
              enable: true,
              children: [
                {
                  name: 'position',
                  label: '位置',
                  lang: '',
                  type: 'string',
                  component: 'Select',
                  enable: true,
                  option: ['center', 'top', 'left', 'right', 'bottom'],
                  children: []
                },
                {
                  name: 'offset',
                  label: '偏移',
                  lang: '',
                  type: 'string',
                  component: 'InputNumber',
                  enable: true,
                  children: []
                },
                {
                  name: 'style',
                  label: '文本样式',
                  lang: '',
                  type: 'object',
                  component: 'OptionGroup',
                  enable: false,
                  children: []
                }
              ]
            },
            {
              name: 'type',
              label: '形状',
              lang: '',
              type: 'string',
              component: 'Select',
              enable: true,
              children: []
            },
            {
              name: 'style',
              label: '样式',
              lang: '',
              type: 'object',
              component: 'OptionGroup',
              enable: false,
              children: []
            }
          ],
          node: [],
          edge: []
        },
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
            _t.formData = JSON.parse(JSON.stringify(_t.firstItem.model))
            // 处理线条样式
            const target = _t.lineDashList.find(item => JSON.stringify(item.lineDash) === JSON.stringify(_t.formData.style.lineDash))
            _t.lineDashName = target ? target.name : ''
            // 处理填充色
            if (/^l\(\d{1,3}\)/gi.test(_t.formData.style.fill)) {
              let gradientDirection = _t.formData.style.fill.match(/^l\((\d{1,3})\)/gi)[0].match(/\d{1,3}/gi)[0]
              let [fillColor, gradientColor] = _t.formData.style.fill.match(/[0,1]{1}:#([\da-f]{3}){1,2}/gi)
              console.log('fileColor', gradientDirection, fillColor, gradientColor)
              _t.gradientDirection = gradientDirection || 0
              _t.fillColor = fillColor.replace('0:', '')
              _t.gradientColor = gradientColor.replace('1:', '')
            }
          } else {
            _t.formData = {}
          }
        },
        deep: true
      }
    },
    methods: {
      handleChange () {
        const _t = this
        console.log('change')
        // 处理数据
        const model = {
          ..._t.formData
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
        if (_t.firstItem && _t.firstItem.type === 'node') {
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
