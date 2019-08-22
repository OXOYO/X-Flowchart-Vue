/**
 * Created by OXOYO on 2019/3/21.
 *
 * 常用排序方法
 */

export default {
  // 按数字大小排序
  sortByNumber: (a, b, type) => {
    if (type === 'desc') {
      return parseInt(a) < parseInt(b) ? 1 : -1
    } else {
      return parseInt(a) > parseInt(b) ? 1 : -1
    }
  }
}
