/**
 * Created by OXOYO on 2019/5/29.
 *
 * 多语言
 */
import VueI18n from 'vue-i18n'
import langs from './langs'
import locale from 'iview/src/locale/index'

export default function (Vue, defLang) {
  let { config, Cookies } = Vue.prototype.$X
  let key = config.cookie.getItem('locale')
  let val = Cookies.get(key)
  if (!defLang) {
    let keys = Object.keys(langs.label)
    defLang = val || keys[0]
  }
  // 注册插件
  Vue.use(VueI18n)
  Vue.locale = () => {}
  // 全局挂载语言包key
  Vue.prototype.$X.langs = {
    ...langs,
    locale: defLang
  }
  // i18n实例
  let i18nInstance = new VueI18n({
    locale: defLang,
    messages: langs.data
  })
  // FIXME 覆写iview i18n方法，修复$Modal弹窗报错BUG，【Issues】https://github.com/iview/iview/issues/4769#issuecomment-449851416
  locale.i18n((path, options) => i18nInstance.t(path, options))
  Vue.prototype._i18n = i18nInstance
  return i18nInstance
}
