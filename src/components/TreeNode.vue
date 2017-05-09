/**
* Created by OXOYO on 2017/4/7.
* 树节点
*/

<style>

</style>

<template>
  <!-- 循环生成组件树 -->
  <ul class="tree-node " :class="[treeNodeStatus]">
    <li>
      <span>
        <Icon
          v-if="data.children && data.children.length"
          type="arrow-right-b"
        ></Icon>
      </span>
      <span
        class="tree-node-title"
        :draggable="data.draggable"
        @dragstart="dragHandle"
        :id="data.id"
        :title="data.title"
        @click.stop.prevent="toggleTreeNode"
      >
        {{ data.title }}
      </span>
      <tree-node
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
      >
      </tree-node>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'TreeNode',
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        treeNodeStatus: 'close'
      }
    },
    methods: {
      toggleTreeNode: function () {
        let _t = this

        _t.treeNodeStatus = _t.treeNodeStatus === 'open' ? 'close' : 'open'
      },
      dragHandle: function (event) {
        // 拖拽的节点数据
        let nodeInfo = {
          id: event.target.id,
          title: event.target.title,
          // 唯一标识，防止在画布上拖拽时重复生成
          nodeKey: 'node-' + ((new Date()).getTime())
        }
        event.dataTransfer.setData('Text', JSON.stringify(nodeInfo))
      }
    }
  }
</script>

