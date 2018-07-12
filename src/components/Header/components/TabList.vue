/**
* Created by OXOYO on 2018/4/8.
*
* Tab 页签组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_tab_list {
    display: inline-block;
    position: relative;
    transition: all .5s ease-in .1s;

    .tab_item {
      position: relative;
      padding: 5px 10px;
      margin: 0 5px;
      border-bottom: 1px solid transparent;
      float: left;

      &.active,
      &:hover {
        color: #57a3f3;
        border-bottom-color: #57a3f3;
      }
      &:hover {
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);

        .close {
          display: inline-block;
        }
      }
      .title {
        max-width: 60px;
        overflow: hidden;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
      }
      .close {
        position: absolute;
        top: -5px;
        right: -5px;
        height: 15px;
        line-height: 15px;
        width: 15px;
        color: #ffffff;
        background: #dddddd;
        border-radius: 50%;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
        display: none;

        &:hover {
          color: #ffffff;
          background: red;
        }
      }
    }
  }
</style>

<template>
  <div class="xfc_tab_list">
    <div
      v-for="item in tabMap"
      :class="[ 'tab_item', currentActive === item.id ? 'active' : '' ]"
      :key="item.id"
      :project-id="item.id"
      :name="item.name"
      :title="item.name"
      @click.stop.prevent="handleTrigger(item)"
    >
      <div class="title"> {{ item.name }}</div>
      <div class="close" @click.stop.prevent="handleClose(item)">
        <XUIIcon type="close"></XUIIcon>
      </div>
    </div>
    <XUIModal
      class="xfc_add-project-modal"
      :value="isShow"
      title="提示"
      :transfer="false"
      @on-ok="handleOK"
      @on-cancel="handleCancel"
    >
      <div class="content">
        删除项目会清空该项目的所有数据，确认删除项目吗？
      </div>
      <div slot="footer">
        <XUIButton type="text" size="large" @click="handleCancel">取消</XUIButton>
        <XUIButton type="primary" size="large" @click="handleOK">确定</XUIButton>
      </div>
    </XUIModal>
  </div>
</template>

<script>
import utils from '@/global/utils'

export default {
  name: 'XFCTabList',
  data () {
    return {
      tabMap: {},
      // 当前激活对象
      currentActive: '',
      // 当前操作对象
      currentTarget: '',
      // 是否显示弹窗
      isShow: false
    }
  },
  methods: {
    handleClose: function (item) {
      let _t = this
      // 显示弹窗
      _t.isShow = true
      // 更新当前操作对象
      _t.currentTarget = item
    },
    handleCloseCurrentTarget: function () {
      let _t = this
      // 更新当前操作对象
      let item = _t.currentTarget
      // 更新激活tab
      if (_t.currentActive === item.id) {
        let keys = Object.keys(_t.tabMap)
        if (keys && keys.length > 1) {
          let index = keys.indexOf(item.id)
          _t.currentActive = keys[index - 1]
        } else {
          _t.currentActive = ''
        }
        // 广播事件，更新当前激活项目
        utils.bus.$emit('XFC/project/trigger', _t.currentActive)
      }
      // 删除当前操作对象数据
      delete _t.tabMap[item.id]
      // 广播事件，同步删除画布
      utils.bus.$emit('XFC/project/remove', item.id)
      // 更新当前操作对象
      _t.currentTarget = ''
    },
    handleTrigger: function (item) {
      let _t = this
      _t.currentActive = item.id
      // 广播事件，更新当前激活项目
      utils.bus.$emit('XFC/project/trigger', _t.currentActive)
    },
    handleOK: function () {
      let _t = this
      // 关闭当前操作对象
      _t.handleCloseCurrentTarget()
      // 关闭弹窗
      _t.isShow = false
    },
    handleCancel: function () {
      let _t = this
      // 更新当前操作对象
      _t.currentTarget = ''
      // 关闭弹窗
      _t.isShow = false
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFC/project/add/ok', function (projectInfo) {
      _t.tabMap = {
        ..._t.tabMap,
        [projectInfo.id]: projectInfo
      }
      // 更新激活tab
      _t.currentActive = projectInfo.id
    })
  }
}
</script>
