/**
* Created by OXOYO on 2019/7/2.
*
* PanelLeft 左侧面板
*/

<style scoped lang="less" rel="stylesheet/less">
  .panel-left {
    .card-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }
</style>

<template>
  <CardBox class="panel-left" placement="left" position="right" :width="250" @expand="toggleHandler">
    <CardItem :title="$t('L10100')" :enableFold="true" :bold="true">
      <NodeElement
        v-for="(item, index) in materials.filter(target => target.enable)"
        :key="index"
        :title="item.label"
        :info="item"
      >
      </NodeElement>
    </CardItem>
  </CardBox>
</template>

<script>
  import config from '../config/index'

  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  import NodeElement from '../components/NodeElement'

  export default {
    name: 'PanelLeft',
    components: {
      CardBox,
      CardItem,
      NodeElement
    },
    data () {
      return {
        materials: config.materials || []
      }
    },
    methods: {
      toggleHandler (data) {
        let _t = this
        _t.$X.utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
