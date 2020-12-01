/**
 * Created by OXOYO on 2020/12/1
 *
 * 工具项基类
 */

export default class tool {
  constructor (options) {
    const defOptions = {
      name: '',
      label: '',
      lang: '',
      type: 'normal',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    }
    this.options = {
      ...defOptions,
      ...options
    }
  }
}
