/**
 * Created by OXOYO on 2019/5/29.
 *
 * 语言包
 */
// 导入iview语言包
import _en from 'iview/dist/locale/en-US'
import _zh from 'iview/dist/locale/zh-CN'

// 导入系统语言包
import zh from './zh-CN'
import en from './en-US'

export default {
  label: {
    'zh-CN': '简体中文',
    'en-US': 'English'
  },
  icon: {
    'zh-CN': require('@/assets/images/langs/zh-CN.png'),
    'en-US': require('@/assets/images/langs/en-US.png')
  },
  data: {
    'zh-CN': { ..._zh, ...zh },
    'en-US': { ..._en, ...en }
  }
}
