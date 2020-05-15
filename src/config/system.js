/**
 * Created by OXOYO on 2019/5/18.
 *
 * 系统相关配置
 */
const packageInfo = require('../../package')
export default {
  version: packageInfo.version,
  name: packageInfo.name,
  author: packageInfo.author,
  description: packageInfo.description,
  title: 'XFC',
  subtitle: 'XFC',
  minTitle: 'XFC',
  logo: require('@/assets/images/logo.png'),
  github: 'https://github.com/OXOYO/X-Flowchart-Vue',
  githubPages: 'http://oxoyo.co/X-Flowchart-Vue/',
  feedback: 'https://github.com/OXOYO/X-Flowchart-Vue/issues/new',
  copyright: '© 2019 OXOYO All Rights Reserved.'
}
