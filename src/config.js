/**
 * Created by OXOYO on 2018/3/21.
 *
 * 插件默认配置信息
 */

export default {
  // 命名空间
  namespace: 'XFC',
  // 自定义编辑器内相关UI
  UI: {
    // 编辑器功能：头部组件
    header: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 标题配置
      title: {
        enable: true,
        text: 'XFC',
        fullText: 'X-Page-Editor',
        subText: 'x-page-editor'
      },
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    },
    // 编辑器功能：表单元素列表
    list: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: [],
      // 样式
      style: {
        // width 和 margin-left 需同时设置
        width: '400px',
        'margin-left': '-400px'
      }
    },
    // 编辑器功能：编辑器画板
    board: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: [],
      // 工具栏配置
      toolBar: {
        // 是否启用该功能，true: 启用 false: 不启用
        enable: true,
        // 位置，可选值 top-left || top-right || bottom-right || bottom-left
        position: 'top-right',
        style: {
          right: '450px'
        }
      },
      // 刻度尺配置
      scale: {
        // 是否启用该功能，true: 启用 false: 不启用
        enable: true
      }
    },
    // 编辑器功能：表单元素配置组件
    options: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: [],
      // 样式
      style: {
        // width 和 margin-right 需同时设置
        width: '400px',
        'margin-right': '-400px'
      }
    },
    // 编辑器功能：脚部组件
    footer: {
      // 是否启用该功能，true: 启用 false: 不启用
      enable: true,
      // 该功能数据源
      data: [],
      // 初始化数据
      initData: []
    }
  },
  // 导出
  output: {
    // 钩子函数
    before: () => {},
    after: () => {}
  }
}
