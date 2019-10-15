/**
* Created by OXOYO on 2019/10/15.
*
* 预览窗口
*/

<style scoped lang="less" rel="stylesheet/less">
  .preview-model {
    .body {
      .preview-image {
        width: 100%;
        padding: 0;
        margin: 0;
      }
      .preview-json {

      }
    }
  }
</style>

<template>
  <Modal
    class="preview-model"
    v-model="isShow"
    :title="$t('L10202')"
    :width="960"
    :closable="false"
    :mask-closable="false"
  >
    <div class="body">
      <template v-if="previewData">
        <img
          v-if="previewData.type === 'image'"
          class="preview-image"
          :src="previewData.content"
          alt=""
        >
        <XHighlight
          v-else-if="previewData.type === 'json'"
          class="preview-json"
          :locale="$X.langs.locale === 'zh-CN' ? 'zh' : 'en'"
          :tool="['select-all', 'copy']"
          :maxHeight="1200"
          :data="previewData.content"
        >
        </XHighlight>
      </template>
    </div>
    <div slot="footer">
      <Button type="default" @click="doHide">{{ $t('L10203') }}</Button>
      <Button type="primary" :loading="flagMap.loading" @click="doDownload">{{ $t('L10204') }}</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'PreviewModel',
    data () {
      return {
        isShow: false,
        flagMap: {
          loading: false
        },
        previewData: null
      }
    },
    methods: {
      doHide () {
        let _t = this
        _t.isShow = false
        // 清空数据
        _t.previewData = null
      },
      doShow (previewData) {
        let _t = this
        if (previewData) {
          _t.previewData = previewData
          _t.isShow = true
        }
      },
      doDownload (event) {
        let _t = this
        _t.flagMap.loading = true
        // 触发下载
        _t.$X.utils.bus.$emit('editor/tool/trigger', {
          context: 'ToolBar',
          event: event,
          name: 'download',
          data: _t.previewData.type
        })
        _t.flagMap.loading = false
        // 关闭弹窗
        _t.doHide()
      }
    },
    created () {
      let _t = this
      _t.$X.utils.bus.$on('editor/previewModel/open', _t.doShow)
      _t.$X.utils.bus.$on('editor/previewModel/close', _t.doHide)
    }
  }
</script>
