/**
 * Created by OXOYO on 2020/5/18
 *
 * 操作记录
 */

<style scoped lang="less">
  .history-model {
    .body {
      display: flex;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, .1);
      .history-list {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        height: 600px;
        overflow: auto;
        .list-item {
          padding: 10px;
          cursor: pointer;
          &:hover,
          &.active {
            color: #000000;
            background: rgba(0, 0, 0, .1);
          }
        }
      }
      .history-preview {
        width: 480px;
        height: 600px;
        position: relative;
        z-index: 100;
      }
      .no-data {
        flex: 1 1 auto;
      }
    }
  }
</style>

<template>
  <Modal class-name="history-model" v-model="isShow" width="660" @on-cancel="doHide">
    <div class="body">
      <template v-if="log.list.length">
        <div class="history-list">
          <div
            v-for="(item, index) in log.list"
            :key="index"
            class="list-item"
            :class="{ 'active': index === currentIndex }"
            @click="toggleLog(index)"
          >
            {{ $X.utils.filters.formatDate(item.time, 'YYYY-MM-DD hh:mm:ss') }}
          </div>
        </div>
        <div id="history-preview" class="history-preview"></div>
      </template>
      <XNoData v-else></XNoData>
    </div>
    <div slot="footer">
      <Button type="default" @click="doHide">{{ $t('L10203') }}</Button>
      <Button type="primary" @click="doRevert">{{ $t('L10209') }}</Button>
    </div>
  </Modal>
</template>

<script>
  import { mapGetters } from 'vuex'
  import G6 from '@antv/g6'
  export default {
    name: 'History',
    data () {
      return {
        isShow: false,
        editor: null,
        currentIndex: null
      }
    },
    computed: {
      ...mapGetters(['log'])
    },
    methods: {
      show () {
        const _t = this
        _t.isShow = true
        _t.$nextTick(function () {
          _t.toggleLog(0)
        })
      },
      doHide () {
        const _t = this
        if (_t.editor) {
          _t.editor.destroy()
          _t.editor = null
          _t.currentIndex = null
        }
        _t.isShow = false
      },
      doRevert () {
        const _t = this
        const item = _t.log.list[_t.currentIndex]
        if (!item) {
          return
        }
        _t.$emit('on-revert', item.content)
        _t.doHide()
      },
      toggleLog (index) {
        const _t = this
        const el = _t.$el
        _t.currentIndex = index
        const item = _t.log.list[_t.currentIndex]
        if (!item) {
          return
        }
        if (!_t.editor) {
          // 画板
          const sketchpad = el.querySelector('#history-preview')
          const grid = new G6.Grid()
          _t.editor = new G6.Graph({
            plugins: [
              grid
            ],
            container: sketchpad,
            width: sketchpad.clientWidth,
            height: sketchpad.clientHeight,
            fitView: true,
            fitViewPadding: 20,
            autoPaint: true
          })
        }
        _t.editor.data(item.content)
        _t.editor.render()
      }
    }
  }
</script>
