/**
 * Created by OXOYO on 2019/5/29.
 *
 *
 */
// 导入iview语言包
import _en from 'iview/dist/locale/en-US'
import _zh from 'iview/dist/locale/zh-CN'

// 导入系统语言包
import zh from './zh-CN'
import en from './en-US'

export default {
  label: {
    'zh-cn': '简体中文',
    'en-us': 'English'
  },
  icon: {
    'zh-cn': require('../assets/images/langs/zh-cn.png'),
    'en-us': require('../assets/images/langs/en-us.png')
  },
  data: {
    'zh-cn': { ..._zh, ...zh },
    'en-us': { ..._en, ...en }
  }
}
