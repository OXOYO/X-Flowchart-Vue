/**
 * Created by OXOYO on 2020/5/15
 *
 * 关于XFC
 */

<style scoped lang="less">
  .about-model {
    .body {
      text-align: center;
      .title {
        display: inline-block;
        margin: 60px 0 10px;
        .img {
          width: 80px;
        }
      }
      .description {
        margin: 0 0 20px;
        font-size: 14px;
        color: #515a6e;
      }
      .info-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        .label {
          font-size: 14px;
          corlor: #515a6e;
          min-width: 100px;
          text-align: right;
          line-height: 1;
          margin-right: 10px;
        }
        .content {
          font-size: 14px;
          color: #515a6e;
          text-align: left;
          line-height: 1;
        }
      }
      .copyright {
        display: inline-block;
        margin: 50px 0 10px;
        color: #cccccc;
      }
    }
  }
</style>

<template>
  <Modal class-name="about-model" v-model="isShow" :footer-hide="true">
    <div class="body">
      <a class="title" :href="$X.config.system.site" target="_blank">
        <img class="img" :src="$X.config.system.logo" alt="">
      </a>
      <div class="description">{{ $X.config.system.description }}</div>
      <div class="info-item" v-for="(item, index) in getInfoList()" :key="index">
        <div class="label">{{ item.label }}:</div>
        <div class="content">
          <span v-if="item.content.type === 'text'">{{ item.content.label }}</span>
          <a v-else-if="item.content.type === 'link'" target="_blank" :href="item.content.link">
            <XIcon
              :iconfont="item.content.icon"
              :label="item.content.label"
            ></XIcon>
          </a>
        </div>
      </div>
      <div class="copyright">{{ $X.config.system.copyright }}</div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'AboutXFC',
    data () {
      return {
        isShow: false
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      getInfoList () {
        const _t = this
        const system = _t.$X.config.system
        return [
          {
            name: 'version',
            label: _t.$t('L10220'),
            icon: '',
            content: {
              type: 'text',
              icon: '',
              label: system.version
            }
          },
          {
            name: 'author',
            label: _t.$t('L10221'),
            icon: '',
            content: {
              type: 'text',
              icon: '',
              label: system.author
            }
          },
          {
            name: 'github',
            label: _t.$t('L10222'),
            icon: '',
            content: {
              type: 'link',
              link: system.github,
              icon: 'github',
              label: 'Github'
            }
          }
        ]
      }
    }
  }
</script>
