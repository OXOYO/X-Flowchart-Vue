/**
 * Created by OXOYO on 2018/4/17.
 */

function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, exfcctedTypes) {
  if (!Array.isArray(exfcctedTypes)) {
    return isSameType(exfcctedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = exfcctedTypes.length; i < len; i++) {
    if (isSameType(exfcctedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function mergeObject (source, target) {
  // 合并对象，遇到对象则合并，其他覆盖
  let handler = function (source, target) {
    let keys = Object.keys(source)
    // 1.判断源对象是否需要处理
    if (keys.length) {
      keys.map(key => {
        // 源属性
        let item = source[key]
        // 1.1.target是否存在该属性，有则做处理，无则跳过
        let flag = target.hasOwnProperty(key)
        if (flag) {
          // 1.1.1.判断类型是否相等，同类型才可以执行覆盖
          if (typeof item === typeof target[key]) {
            // 1.2.不是对象则覆盖、是数组则覆盖
            if (typeof item !== 'object' || (typeof item === 'object' && item instanceof Array)) {
              source[key] = target[key]
              // 1.3.是对象则递归处理
            } else if (typeof item === 'object' && typeof target === 'object') {
              source[key] = handler(item, target[key])
            }
          }
        }
      })
    }
    return source
  }
  return handler(source, target)
}

export default {
  getType,
  isSameType,
  getTypeIndex,
  mergeObject
}
