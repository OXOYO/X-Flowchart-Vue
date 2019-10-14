/**
* Created by OXOYO on 2019/7/1.
*
* Options 配置信息面板
*/

<style scoped lang="less" rel="stylesheet/less">
  .options {
    display: inline-block;
    width: 100%;
    height: 100%;

    .form-item-block {
      padding: 10px 20px;
    }
  }
</style>

<template>
  <div class="options">
    <Form v-if="Object.keys(formData).length" :model="formData" label-position="top">
      <!-- 属性 -->
      <CardItem :title="$t('L10103')" :enableFold="true">
        <div class="form-item-block">
          <FormItem label="x">
            <InputNumber v-model="formData.x" size="small" @on-change="handleChange"></InputNumber>
          </FormItem>
          <FormItem label="y">
            <InputNumber v-model="formData.y" size="small" @on-change="handleChange"></InputNumber>
          </FormItem>
          <FormItem label="width">
            <InputNumber v-model="formData.width" size="small" @on-change="handleChange"></InputNumber>
          </FormItem>
          <FormItem label="height">
            <InputNumber v-model="formData.height" size="small" @on-change="handleChange"></InputNumber>
          </FormItem>
        </div>
      </CardItem>
      <!-- 节点样式 -->
      <CardItem :title="$t('L10104')" :enableFold="true">
        <div class="form-item-block">
          <template v-if="firstItem && firstItem.type === 'node'">
            <FormItem label="fill">
              <ColorPicker placement="top-start" v-model="formData.style.fill" hue recommend @on-change="handleChange"></ColorPicker>
            </FormItem>
            <FormItem label="fillOpacity">
              <Slider
                v-model="formData.style.fillOpacity"
                :min="0"
                :max="1"
                :step="0.1"
                :show-input="true"
                input-size="small"
                @on-change="handleChange"
              >
              </Slider>
            </FormItem>
          </template>
          <FormItem label="stroke">
            <ColorPicker placement="top-start" v-model="formData.style.stroke" hue recommend @on-change="handleChange"></ColorPicker>
          </FormItem>
          <FormItem label="strokeOpacity">
            <Slider
              v-model="formData.style.strokeOpacity"
              :min="0"
              :max="1"
              :step="0.1"
              :show-input="true"
              input-size="small"
            >
            </Slider>
          </FormItem>
          <FormItem label="lineWidth">
            <Slider
              v-model="formData.style.lineWidth"
              :min="1"
              :max="10"
              :step="1"
              :show-input="true"
              input-size="small"
              @on-change="handleChange"
            >
            </Slider>
          </FormItem>
        </div>
      </CardItem>
      <!-- 文本样式 -->
      <CardItem :title="$t('L10105')" :enableFold="true">
        <div class="form-item-block">
          <FormItem label="label">
            <Input v-model="formData.label" size="small" @on-change="handleChange"></Input>
          </FormItem>
          <FormItem label="position" v-if="formData.labelCfg">
            <Select v-model="formData.labelCfg.position" size="small" @on-change="handleChange">
              <Option value="center">center</Option>
              <Option value="top">top</Option>
              <Option value="left">left</Option>
              <Option value="right">right</Option>
              <Option value="bottom">bottom</Option>
            </Select>
          </FormItem>
          <FormItem label="offset" v-if="formData.labelCfg">
            <InputNumber v-model="formData.labelCfg.offset" size="small" @on-change="handleChange"></InputNumber>
          </FormItem>
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
              name: 'shape',
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
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentItem'
      ])
    },
    watch: {
      currentItem: {
        handler (val) {
          let _t = this
          // 取第一个节点
          _t.firstItem = val[0]
          if (_t.firstItem) {
            _t.formData = JSON.parse(JSON.stringify(_t.firstItem.model))
          } else {
            _t.formData = {}
          }
        },
        deep: true
      }
    },
    methods: {
      handleChange () {
        let _t = this
        let model = {
          ..._t.formData,
          size: [ _t.formData.width, _t.formData.height ]
        }
        // 当前节点数组
        let currentItemArr = _t.currentItem
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
