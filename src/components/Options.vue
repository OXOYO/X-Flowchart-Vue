/**
* Created by OXOYO on 2018/3/21.
*
* 配置组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_options {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    /*width: 400px;*/
    /*margin-right: -400px;*/
    padding-top: 50px;
    border-left: 1px solid #dddddd;
    display: inline-block;
    z-index: 2000;
    background: #ffffff;
    box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.1);
    transition: all .5s ease-in .1s;

    &.block_expand {
      margin-right: 0;
    }

    &:hover {
      .handler {
        margin-left: -10px;
      }
    }

    .block_header {
      width: 100%;
      height: 39px;
      line-height: 39px;
      border-bottom: 1px solid #dddddd;
      text-align: right;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-right: 20px;
        display: inline-block;
      }
    }
    .block_body {
      position: absolute;
      top: 90px;
      right: 0;
      left: 0;
      bottom: 0;
      padding: 0;
      z-index: 2000;
      background: #ffffff;
      text-align: left;
      overflow-y: auto;

      .options-collapse {
        border: none;
        border-radius: 0;
        /*border-left-color: transparent;*/
        /*border-right-color: transparent;*/
      }

      .loading {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
      }
    }
  }
</style>

<template>
  <div :class="{'xfc_options': true, 'block_expand': isExpand}" :style="computedStyle">
    <div class="block_header">
      <div class="title">
        Options
      </div>
    </div>
    <div class="block_body">
      <!-- loading 动画 -->
      <div class="loading" v-show="loading">
        <XUISpin size="large" fix></XUISpin>
      </div>
      <XUICollapse v-model="activePanel" class="options-collapse">
        <XUIPanel name="propsMap" v-show="Object.keys(nodeInfo).length && Object.keys(propsMap).length">
          props
          <XUIForm
            class="options-body"
            slot="content"
            v-if="Object.keys(nodeInfo).length"
            ref="propsMapForm"
            :model="propsMap"
            :rules="propsMapRules"
            :label-width="80"
            @keydown.native.enter.prevent
            @click.stop.prevent
          >
            <XUIFormItem
              class="options-item"
              v-for="(val, key) in propsMap"
              :key="key"
              :label="key"
              :prop="key"
            >
              <XUISwitch
                v-if="utils.getTypeIndex(Boolean, vm.$options.props[key].type) > -1"
                v-model="propsMap[key]"
              >
              </XUISwitch>
              <XUIInputNumber
                v-else-if="utils.getTypeIndex(Number, vm.$options.props[key].type) > -1"
                v-model="propsMap[key]"
              >
              </XUIInputNumber>
              <XUIInput
                v-else-if="utils.getTypeIndex(String, vm.$options.props[key].type) > -1"
                v-model="propsMap[key]"
                type="text"
              >
              </XUIInput>
              <XUIInput
                v-else
                v-model="propsMap[key]"
                type="text"
              >
              </XUIInput>
            </XUIFormItem>
          </XUIForm>
        </XUIPanel>
        <XUIPanel name="slotsMap" v-show="Object.keys(nodeInfo).length && Object.keys(slotsMap).length">
          slots
          <XUIForm
            class="options-body"
            slot="content"
            v-if="Object.keys(nodeInfo).length"
            @keydown.native.enter.prevent
            @click.stop.prevent
          >
            <XUIFormItem
              class="options-item"
              v-for="(val, key) in slotsMap"
              :key="key"
            >
              <XUIInput type="text" v-model="slotsMap[key]"></XUIInput>
            </XUIFormItem>
          </XUIForm>
        </XUIPanel>
        <XUIPanel name="innerHTML">
          innerHTML
          <XUIForm
            class="options-body"
            slot="content"
            v-if="Object.keys(nodeInfo).length"
            @keydown.native.enter.prevent
            @click.stop.prevent
          >
            <XUIFormItem class="options-item">
              <XUIInput type="text" v-model="innerHTML"></XUIInput>
            </XUIFormItem>
          </XUIForm>
        </XUIPanel>
        <XUIPanel name="style">
          style
          <div class="options-body" slot="content" v-if="Object.keys(nodeInfo).length">
            <XUIForm
              class="options-body"
              @click.stop.prevent
            >
              <XUIFormItem class="options-item">
                <XUIInput
                  v-model="style"
                  type="textarea"
                  :rows="4"
                  :autosize="true"
                  placeholder="请输入样式！"
                >
                </XUIInput>
              </XUIFormItem>
            </XUIForm>
          </div>
        </XUIPanel>
      </XUICollapse>
    </div>
    <XFCHandler class="handler" mode="vertical" position="left" :expand="isExpand" :callback="toggleHandler"></XFCHandler>
  </div>
</template>

<script>
import Vue from 'vue'

import XFCHandler from '@/global/components/Handler.vue'

import defConfig from '@/config'
import utils from '@/global/utils'

export default {
  name: 'XFCOptions',
  components: {
    XFCHandler
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return defConfig.UI.options
      }
    }
  },
  data () {
    return {
      // 是否展开
      isExpand: true,
      nodeInfo: {},
      propsMap: {},
      propsMapRules: {},
      slotsMap: {},
      optionsMap: {},
      innerHTML: '',
      style: '',
      // 当前展开的面板
      activePanel: ['propsMap', 'slotsMap', 'innerHTML', 'style'],
      loading: false,
      utils,
      vm: null,
      propsType: {
        String: String,
        Number: Number,
        Boolean: Boolean,
        Function: Function,
        Object: Object,
        Array: Array,
        Symbol: Symbol
      }
    }
  },
  computed: {
    computedStyle: function () {
      let _t = this
      return {
        ..._t.config.style,
        'margin-right': _t.isExpand ? 0 : _t.config.style['margin-right']
      }
    }
  },
  watch: {
    propsMap: {
      handler: function (val, oldVal) {
        let _t = this
        try {
          // 只在值变化时进行处理
          if (Object.keys(oldVal).length && Object.keys(val).length) {
            // 校验结果
            let validResult = false
            _t.$refs['propsMapForm'].validate((valid) => {
              console.log('valid', valid)
              validResult = valid
              if (!valid) {
                console.error('表单验证失败！')
              }
            })
            console.log('propsMapForm validResult', validResult)
            if (!validResult) {
              return false
            }
            // 广播事件，更新组件props
            utils.bus.$emit('XFC/project/component/options/set', {
              ..._t.nodeInfo,
              props: val
            })
          }
        } catch (err) {
          console.log('err', err.message)
        }
      },
      deep: true
    },
    slotsMap: {
      handler: function (val, oldVal) {
        let _t = this
        try {
          // 只在值变化时进行处理
          if (Object.keys(oldVal).length && Object.keys(val).length) {
            // 广播事件，更新组件props
            utils.bus.$emit('XFC/project/component/options/set', {
              ..._t.nodeInfo,
              slots: val
            })
          }
        } catch (err) {
          console.log('err', err.message)
        }
      },
      deep: true
    },
    innerHTML: {
      handler: function (val) {
        let _t = this
        try {
          // 广播事件，更新组件props
          utils.bus.$emit('XFC/project/component/options/set', {
            ..._t.nodeInfo,
            innerHTML: val
          })
        } catch (err) {
          console.log('err', err.message)
        }
      },
      deep: true
    },
    style: {
      handler: function (val) {
        let _t = this
        try {
          let tmpArr = val.split('\n')
          let style = {}
          tmpArr.map(str => {
            if (str && str.includes(':')) {
              let arr = str.split(':')
              let key = arr[0].trim()
              let val = arr[1].replace(';', '').trim()
              style[key] = val
            }
          })
          // 广播事件，更新组件props
          utils.bus.$emit('XFC/project/component/options/set', {
            ..._t.nodeInfo,
            style: style
          })
        } catch (err) {
          console.log('err', err.message)
        }
      },
      deep: true
    }
  },
  methods: {
    // 切换handler显示/隐藏
    toggleHandler: function (val) {
      let _t = this
      _t.isExpand = val !== undefined ? val : !_t.isExpand
      _t.$nextTick(function () {
        let elWidth = _t.isExpand ? _t.$el.offsetWidth : 0
        // 广播事件
        utils.bus.$emit('XFC/expand/toggle/single', {
          position: 'right',
          val: {
            right: elWidth
          }
        })
      })
    },
    // 动态解析组件
    compileComponent: function (nodeInfo) {
      let _t = this
      // 更新loading状态
      _t.loading = true
      _t.nodeInfo = nodeInfo
      // TODO 动态解析组件 props、slot 等
      console.log('compileComponent', nodeInfo)
      // 读取组件
      let constructor = Vue.component(nodeInfo.component.name)
      // 实例化
      let vm = new constructor()
      _t.vm = vm
      console.log('vm', vm, nodeInfo)
      console.log('vm $props', vm.$props)
      console.log('vm $slots', vm.$slots)
      // 获取props、slots
      _t.propsMap = {
        ...vm.$props,
        ...nodeInfo.props
      }
      _t.optionsMap = {
        ...vm.$options,
        ...nodeInfo.options
      }
      _t.slotsMap = {
        ...vm.$slots,
        ...nodeInfo.slots
      }
      _t.innerHTML = nodeInfo.innerHTML || vm.innerHTML
      let style = {
        ...vm.style,
        ...nodeInfo.style
      }
      let tmpArr = []
      Object.keys(style).map(key => {
        let val = style[key]
        let str = key + ':' + val + ';'
        tmpArr.push(str)
      })
      _t.style = tmpArr.join('\n')
      // 处理 propsMapRules FIXME 【BUG】校验处理还存在问题
      /*
      let rules = {}
      Object.keys(vm.$options.props).map(key => {
        let item = vm.$options.props[key]
        /!*
        rules[key] = {
          trigger: 'change',
          // type: String,
          // validator: (rule, value, callback) => {
          //   if (value === '') {
          //     callback(new Error('Please enter ' + key))
          // }
          // },
          ...item
        }
        *!/
        if (item.type && utils.getType(item.type) && item.validator) {
          rules[key] = {}
          rules[key]['trigger'] = 'change'
          rules[key]['type'] = item.type
          rules[key]['validator'] = item.validator
        } else if (!item.type && item.validator) {
          rules[key] = {}
          rules[key]['trigger'] = 'change'
          rules[key]['type'] = String
          rules[key]['validator'] = item.validator
        }
      })
      _t.propsMapRules = rules
      */
      // 更新loading状态
      _t.loading = false
    },
    // 清空opstions
    clearOptions: function () {
      let _t = this
      _t.nodeInfo = {}
      _t.propsMap = {}
      _t.slotsMap = {}
      _t.innerHTML = ''
      _t.style = ''
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFC/expand/toggle/all', function (val) {
      _t.toggleHandler(val)
    })
    utils.bus.$on('XFC/project/component/trigger', function (nodeInfo) {
      // 动态解析组件 props、slot 等
      _t.compileComponent(nodeInfo)
    })
    utils.bus.$on('XFC/canvas/clear', function (projectID) {
      _t.clearOptions(projectID)
    })
    utils.bus.$on('XFC/project/component/remove', function (nodeInfo) {
      _t.clearOptions(nodeInfo)
    })
  }
}
</script>
