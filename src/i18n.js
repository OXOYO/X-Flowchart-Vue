/**
 * Created by OXOYO on 2019/5/29.
 *
 * 多语言
 */
import VueI18n from 'vue-i18n'
import langs from './langs'
import locale from 'iview/src/locale/index'

export default function (Vue, config) {
  const $X = Vue.prototype.$X
  let { defLocale, locales } = config
  // 合并语言包
  const langData = langs.data
  Object.keys(locales).forEach(key => {
    if (langData.hasOwnProperty(key)) {
      langData[key] = {
        ...langData[key],
        ...locales[key]
      }
    } else {
      langData[key] = locales[key]
    }
  })
  // 默认语言
  defLocale = $X.utils.storage.get('locale', $X.config.storage.prefix) || defLocale || Object.keys(langData)[0]
  // 注册插件
  Vue.use(VueI18n)
  Vue.locale = () => {}
  // 全局挂载语言包key
  Vue.prototype.$X.langs = {
    locale: defLocale
  }
  // i18n实例
  const i18nInstance = new VueI18n({
    locale: defLocale,
    messages: langData
  })
  // FIXME 覆写iview i18n方法，修复$Modal弹窗报错BUG，【Issues】https://github.com/iview/iview/issues/4769#issuecomment-449851416
  locale.i18n((path, options) => i18nInstance.t(path, options))
  Vue.prototype._i18n = i18nInstance
  return i18nInstance
}
