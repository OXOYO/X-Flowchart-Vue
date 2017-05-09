/**
 * Created by OXOYO on 2017/4/19.
 */

import Vue from 'vue'
import { servConfig } from './config.js'

/*
 * Serv
 *
 * */
export const Serv = {
  // 处理Url
  handleUrl: function (path) {
    let base = servConfig.url ? servConfig.url : ''

    if (path) {
      // 处理路径是否包含 '/'
      if (path.indexOf('/') === 0) {
        return base + path
      } else {
        return base + '/' + path
      }
    } else {
      return ''
    }
  },
  // 处理返回数据
  handleRes: function (res, showModal) {
    // 返回数据
    let resBody = res && res.body ? res.body : ''
    let ret = {}

    if (res) {
      if (res.status === 200) {
        ret = resBody
      } else {
        // 弹窗提示
        if (showModal) {
          Vue.prototype.$Message.error(res.Msg || '请求异常，请检查上送、返回。')
        }
      }
    } else {
      Vue.prototype.$Message.error('请求失败！')
    }

    return ret
  }
}

export const Api = {}
