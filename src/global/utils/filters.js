/**
 * Created by OXOYO on 2019/5/18.
 *
 * 过滤器
 */

export default {
  // 日期格式化
  formatDate: (date, fmt = 'YYYY-MM-DD hh:mm') => {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    const padLeftZero = (str) => {
      return ('00' + str).substr(str.length)
    }
    const doFormatDate = (date, fmt) => {
      if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const obj = {
        'M+': date.getMonth() + 1,
        'D+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in obj) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = obj[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
      }
      return fmt
    }

    return doFormatDate(date, fmt)
  }
}
