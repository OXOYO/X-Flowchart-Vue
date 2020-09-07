/**
 * Created by OXOYO on 2020/9/7
 *
 * 通用工具
 */

export default {
  findComponentUpward (context, componentName, componentNames) {
    if (typeof componentName === 'string') {
      componentNames = [componentName]
    } else {
      componentNames = componentName
    }

    let parent = context.$parent
    let name = parent.$options.name
    debugger
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
      parent = parent.$parent
      if (parent) name = parent.$options.name
    }
    return parent
  }
}
