/**
* Created by OXOYO on 2018/4/18.
*
* 嵌套提示弹窗
*/

<style scoped lang="less" rel="stylesheet/less">
  .xfc_nest-notice-modal {

  }
</style>

<template>
  <XUIModal
    class="xfc_nest-notice-modal"
    :value="isShow"
    title="提示"
    :transfer="false"
    @on-cancel="handleCancel"
  >
    <div class="content">该节点不支持嵌套！</div>
    <div slot="footer">
      <XUIButton type="text" size="large" @click="handleCancel">关闭</XUIButton>
    </div>
  </XUIModal>
</template>

<script>
import utils from '@/global/utils'

export default {
  name: 'NestNoticeModal',
  data () {
    return {
      // 是否显示弹窗
      isShow: false
    }
  },
  methods: {
    handleCancel: function () {
      let _t = this
      // 关闭弹窗
      _t.isShow = false
    }
  },
  created: function () {
    let _t = this
    // 监听事件
    utils.bus.$on('XFC/canvas/nest/notice', function () {
      _t.isShow = true
    })
  }
}
</script>
