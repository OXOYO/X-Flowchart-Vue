/**
 * Created by OXOYO on 2020/5/13
 *
 * 通用工具
 */

// 节流
const throttle = function (func, timeFrame) {
  let lastTime = 0
  return function () {
    const now = new Date()
    if (now - lastTime >= timeFrame) {
      func()
      lastTime = now
    }
  }
}

// 首字母转大写
const firstUpperCase = ([first, ...rest]) => first.toUpperCase() + rest.join('')

// 是否左键触发
const isLeftKey = (event) => event.originalEvent.button === 0

export default {
  throttle,
  firstUpperCase,
  isLeftKey
}
