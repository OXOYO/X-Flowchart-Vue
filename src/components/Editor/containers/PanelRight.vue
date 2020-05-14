/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <CardBox placement="right" position="left" :width="300" :title="$t('L10100')" @expand="toggleHandler">
    <CardItem :title="$t('L10101')" :enableFold="true" :bold="true">
      <Options></Options>
    </CardItem>
    <CardItem :title="$t('L10102')" :enableFold="true" :bold="true">
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
    methods: {
      toggleHandler (data) {
        const _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
