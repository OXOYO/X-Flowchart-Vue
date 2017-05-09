/**
 * Created by OXOYO on 2017/4/19.
 */

// 服务配置
export const servConfig = {
  url: 'http://localhost:8080/api',
  development: 'http://localhost:8080/api',
  production: 'http://localhost:8080/api',
  getUrl: function (key) {
    let hostname = window && window.location && window.location.hostname || null
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      if (key && servConfig[key] && typeof servConfig[key] === 'string') {
        return servConfig[key]
      }
      return servConfig.development
    }
    return servConfig.production
  }
}
