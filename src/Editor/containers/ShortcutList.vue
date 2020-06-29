/**
 * Created by OXOYO on 2020/5/15
 *
 * 快捷键列表
 */

<style scoped lang="less">
  .shortcut-list-model {}
</style>

<template>
  <Modal
    class-name="shortcut-list-model"
    v-model="isShow"
    :title="$t('L10450')"
    :footer-hide="true"
  >
    <Table :columns="tableColumns" :data="tableData"></Table>
  </Modal>
</template>

<script>
  export default {
    name: 'ShortcutList',
    props: {
      toolList: Array,
      shortcutMap: Object
    },
    data () {
      return {
        isShow: false
      }
    },
    computed: {
      tableColumns () {
        return [
          {
            title: this.$t('L10451'),
            key: 'tool'
          },
          {
            title: this.$t('L10452'),
            key: 'label'
          }
        ]
      },
      tableData () {
        const _t = this
        const tableData = []
        _t.toolList.forEach(item => {
          if (item.enableTool && item.shortcuts) {
            const shortcutInfo = _t.shortcutMap[item.name]
            if (shortcutInfo) {
              tableData.push({
                tool: shortcutInfo.tool,
                label: shortcutInfo.label
              })
            }
          }
        })
        return tableData
      }
    },
    methods: {
      show () {
        this.isShow = true
      }
    }
  }
</script>
