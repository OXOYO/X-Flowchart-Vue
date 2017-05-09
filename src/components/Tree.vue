/**
* Created by OXOYO on 2017/4/7.
* 节点树
*/

<style lang="less">
  .flowchart-tree {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 2000;
    display: inline-block;
    border-right: 1px solid rgba(0, 0, 0, .1);
    padding: 15px 0;
    background: #ffffff;
    transition: left .5s ease-in-out;

    &.close {
      .tree-tab {

        &:hover {
          .ivu-icon {
            transform: rotate(360deg);
          }
        }
        .ivu-icon-chevron-right {
          transform: rotate(0deg);
        }
      }
     }

      .flowchart-tree-head {
        position: absolute;
        top: 0;
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, .1);

      .tree-title {
        display: inline-block;
        float: left;
        padding: 0 15px;
      }
      .tree-close {
        display: inline-block;
        float: right;
        padding: 0 15px;
        cursor: default;

        &:hover {
           color: red;
         }
        }
      }
      .flowchart-tree-body {
        /*position: absolute;
        top: 60px;
        bottom: 60px;
        left: 0;
        right: 0;
        overflow: auto;*/
        margin-top: 60px;
      }

    .tree-node {
      padding: 5px 15px;
      box-sizing: border-box;
      transition: all .2s ease-in-out;

      &.open {
        .ivu-icon {
          transform: rotate(90deg);
         }
        .tree-node {
         display: block;
        }
      }
      &.close {
        .tree-node {
          display: none;
        }
      }

      .tree-node-title {
        cursor: default;
        padding: 5px 15px 5px 5px;

        &:hover {
          background: #ebf5ff;
        }
      }

      .ivu-icon {
        transition: all .2s ease-in-out;
      }
    }
    .tree-tab {
      position: absolute;
      right: -20px;
      top: 50%;
      width: 20px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: -20px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, .1);
      border-left-color: transparent;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      font-size: 16px;
      cursor: default;

      &:hover {
        .ivu-icon {
          transform: rotate(-180deg);
        }
      }

      .ivu-icon {
        transition: transform .5s ease-in-out .1s;
      }
      .ivu-icon-chevron-right {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
  }
</style>

<template>
  <div class="flowchart-tree" :style="treeStyle" :class="treeClass" @click="handleTree">
    <div class="flowchart-tree-head">
      <div class="tree-title">组件树</div>
      <div class="tree-close" @click="handleClose">
        <Icon type="close"></Icon>
      </div>
    </div>
    <div class="flowchart-tree-body">
      <x-tree-node
        v-for="(item, index) in data"
        :key="index"
        :data="item"
      >
      </x-tree-node>
    </div>
    <!-- 折叠 -->
    <div class="tree-tab" @click="handleTab">
      <Icon type="chevron-right"></Icon>
    </div>
  </div>
</template>

<script>
  import TreeNode from './TreeNode.vue'

  export default {
    components: {
      'x-tree-node': TreeNode
    },
    data () {
      return {
        treeClose: false,
        treeStyle: {},
        treeClass: {}
      }
    },
    props: {
      data: {
        type: Array,
        default: [],
        required: true
      }
    },
    methods: {
      handleClose: function (event) {
        let _t = this
        let treeLeft = 0
        let parentNode = event.target.parentNode
        let tree
        if (parentNode.classList.contains('tree-close')) {
          tree = parentNode.parentNode.parentNode
        } else if (parentNode.classList.contains('flowchart-tree-head')) {
          tree = parentNode.parentNode
        }

        _t.treeClose = true
        treeLeft = _t.treeClose && tree && tree.offsetWidth ? -tree.offsetWidth + 'px' : 0
        _t.treeStyle = {
          ..._t.treeStyle,
          left: treeLeft
        }
        _t.treeClass = {
          ..._t.treeClass,
          close: _t.treeClose
        }
      },
      handleTab: function (event) {
        let _t = this
        let treeLeft = 0
        let parentNode = event.target.parentNode
        let tree
        if (parentNode.classList.contains('tree-tab')) {
          tree = parentNode.parentNode
        } else if (parentNode.classList.contains('flowchart-tree')) {
          tree = parentNode
        }
        _t.treeClose = !_t.treeClose
        treeLeft = _t.treeClose && tree && tree.offsetWidth ? -tree.offsetWidth + 'px' : 0
        _t.treeStyle = {
          ..._t.treeStyle,
          left: treeLeft
        }
        _t.treeClass = {
          ..._t.treeClass,
          close: _t.treeClose
        }
      },
      handleTree: function () {
        let _t = this
        // 分发action 更新contextmenu数据
        _t.$store.dispatch('updateFlowchartContextmenu', {
          isShow: false,
          nodeInfo: {
            nodeKey: null
          }
        })
      }
    }
  }
</script>

