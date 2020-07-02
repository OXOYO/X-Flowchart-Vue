/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <CardBox
    v-if="isEnablePanel"
    placement="right"
    position="left"
    :width="360"
    :title="$t('L10100')"
    @expand="toggleHandler"
  >
    <CardItem v-if="isEnableOptions" :title="$t('L10101')" :enableFold="true" :bold="true">
      <Options :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"></Options>
    </CardItem>
    <CardItem v-if="isEnableNavigator" :title="$t('L10102')" :enableFold="true" :bold="true">
      <Navigator></Navigator>
    </CardItem>
  </CardBox>
</template>

<script>
  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  import Options from '../components/Options'
  import Navigator from '../components/Navigator'

  export default {
    name: 'PanelRight',
    components: {
      CardBox,
      CardItem,
      Options,
      Navigator
    },
    props: {
      editorConfig: Object,
      toolList: Array,
      currentItem: Array
    },
    computed: {
      infoPanel () {
        return this.$X.config.infoPanel
      },
      isEnableOptions () {
        return this.infoPanel.options.enable
      },
      isEnableNavigator () {
        return this.infoPanel.navigator.enable
      },
      isEnablePanel () {
        return this.isEnableOptions || this.isEnableNavigator
      }
    },
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
