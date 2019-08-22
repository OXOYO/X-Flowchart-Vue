/**
* Created by OXOYO on 2019/7/2.
*
* PanelRight 右侧面板
*/

<style scoped lang="less" rel="stylesheet/less"></style>

<template>
  <CardBox placement="right" :width="300">
    <!-- FIXME 暂时注掉Options配置面板，该功能与ToolBar存在高度耦合 -->
    <!--
    <CardItem title="配置" :enableFold="true">
      <Options></Options>
    </CardItem>
    -->
    <CardItem title="导航栏" :enableFold="true">
      <Navigator></Navigator>
    </CardItem>
  </CardBox>
</template>

<script>
  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  // import Options from '../components/Options'
  import Navigator from '../components/Navigator'

  export default {
    name: 'PanelRight',
    components: {
      CardBox,
      CardItem,
      // Options,
      Navigator
    }
  }
</script>
