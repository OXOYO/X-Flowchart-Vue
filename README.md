# X-Flowchart-Vue

> A visual graph editor based on G6 and Vue.

[![Version](https://img.shields.io/npm/v/@oxoyo/xfc.svg)](https://www.npmjs.com/package/@oxoyo/xfc)
[![License](https://img.shields.io/npm/l/@oxoyo/xfc.svg)](https://www.npmjs.com/package/@oxoyo/xfc)
[![NPM downloads](http://img.shields.io/npm/dm/@oxoyo/xfc.svg)](https://npmjs.org/package/@oxoyo/xfc)
[![Downloads](https://img.shields.io/npm/dt/@oxoyo/xfc.svg)](https://www.npmjs.com/package/@oxoyo/xfc)
![GitHub issues](https://img.shields.io/github/issues/OXOYO/X-Flowchart-Vue)
![GitHub closed issues](https://img.shields.io/github/issues-closed/OXOYO/X-Flowchart-Vue)
![GitHub repo size](https://img.shields.io/github/repo-size/oxoyo/X-Flowchart-Vue)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/OXOYO/X-Flowchart-Vue)
![Lines of code](https://img.shields.io/tokei/lines/github/OXOYO/X-Flowchart-Vue)
![GitHub Sponsors](https://img.shields.io/github/sponsors/OXOYO)


## 预览

[online](http://oxoyo.co/X-Flowchart-Vue/)

## 示例

``` bash
# git clone https://github.com/OXOYO/X-Flowchart-Vue.git

# install dependencies
yarn install

### run dev
yarn run serve
```

## 功能

| 功能       | 默认启用 | 快捷键            | 工具栏 | 右键菜单 | 备注   |
| :--------- | :--- | :--------------- | :----- | :----- | :---- |
| logo       | ✔   |                   | ✔     | ✖      | Logo | 
| undo       | ✔   | ctrl + z          | ✔     | ✔      | 撤销 | 
| clearLog   | ✔   | ctrl + shift + l  | ✔     | ✔      | 清空操作日志 | 
| history    | ✔   | ctrl + shift + h  | ✔     | ✔      | 操作日志 | 
| redo       | ✔   | ctrl + shift + z  | ✔     | ✔      | 重做 | 
| copy       | ✔   | ctrl + c          | ✔     | ✔      | 复制 | 
| paste      | ✔   | ctrl + v          | ✔     | ✔      | 粘贴 | 
| delete     | ✔   | Delete            | ✖     | ✔      | 删除 | 
| clear      | ✔   | ctrl + shift + c  | ✔     | ✔      | 清空画布 |
| zoom       | ✔   |                   | ✔     | ✔      | 缩放 |
| zoomIn     | ✔   | ctrl + +          | ✔     | ✔      | 放大 |
| zoomOut    | ✔   | ctrl + -          | ✔     | ✔      | 缩小 |
| fit        | ✔   | ctrl + 0          | ✔     | ✔      | 适应屏幕 |
| actualSize | ✔   | ctrl + 1          | ✔     | ✔      | 实际大小 |
| canvasBackground | ✔   |                   | ✔     | ✔      | 画布背景 |
| fill       | ✔   |                   | ✔     | ✔      | 填充颜色 |
| lineColor  | ✔   |                   | ✔     | ✔      | 线条颜色 |
| lineWidth  | ✔   |                   | ✔     | ✔      | 线条宽度 |
| lineDash   | ✔   |                   | ✔     | ✔      | 线条样式 |
| lineType   | ✔   |                   | ✔     | ✔      | 线条类型 |
| startArrow | ✔   |                   | ✔     | ✔      | 起点 |
| endArrow   | ✔   |                   | ✔     | ✔      | 终点 |
| toFront    | ✔   |                   | ✔     | ✔      | 置于顶层 |
| toBack     | ✔   |                   | ✔     | ✔      | 置于底层 |
| selectAll  | ✔   | ctrl + a          | ✔     | ✔      | 全选 |
| edit       | ✔   |                   | ✔     | ✔      | 编辑模式 |
| preview    | ✔   |                   | ✔     | ✔      | 预览模式 |
| upload     | ✔   |                   | ✔     | ✔      | 上传 |
| download   | ✔   |                   | ✔     | ✔      | 下载 |
| fullscreen | ✔   |                   | ✔     | ✔      | 全屏 |
| language   | ✔   |                   | ✔     | ✔      | 语言 |
| github     | ✖   |                   | ✔     | ✔      | Github |
| feedback   | ✖   |                   | ✔     | ✔      | 反馈 |
| help       | ✔   |                   | ✔     | ✔      | 帮助 |
| up         | ✔   | up                | ✖     | ✖      | 上 |
| down       | ✔   | down              | ✖     | ✖      | 下 |
| left       | ✔   | left              | ✖     | ✖      | 左 |
| right      | ✔   | right             | ✖     | ✖      | 右 |


# 使用指南

## 起步

### 安装
```
npm i @oxoyo/xfc --save
```

### 引用
```
import xfc from '@oxoyo/xfc'
import '@oxoyo/xfc/dist/xfc.css'

// 初始化
const xfcEditor = xfc({
    el: '#xfc'
})
```

## 配置

在初始化 `xfc` 实例时，可以配置参数。

### props
| 参数       | 说明                      | 类型            | 可选值 | 默认值 |
| :--------- | :----------------------- | :--------------- | :----- | :----- |
| tools       | 全量配置工具项，覆写系统默认工具项信息，详见[全量配置tools](#tools)   | Object | - | - |
| enableTools |【与tools互斥，配置后以此为主】设置要启用的系统工具项 | Array | - | - |
| disableTools |【与tools、enableTools互斥，配置后以此为主】设置要禁用的系统工具项 | Array | - | - |
| shortcutMap |【与tools互斥，配置后以此为主】设置自带的工具项的快捷键 | Object | - | - |
| materials   | 全量配置物料列表，覆写系统默认物料，详见[全量配置materials](#materials)   | Array | - | - |
| enableMaterials |【与materials互斥，配置后以此为主】设置要启用的系统物料 | Object | - | - |
| system | 配置系统信息 | Object | - | - |
| storage | 配置本地存储信息 | Object | - | - |
| i18n | 配置多语言 | Object | - | - |
| infoPanel | 信息面板配置 | Object | - | - |

#### tools
全量配置工具项，覆写系统默认工具项信息，自定义程度高，<span style="color: red; font-weight: 800;">无非必要不建议配置此项</span>。

***tools数据结构***
`tools` 下可以设置 `toolList` 与 `shortcutMap`

```
xfc({
  el: '#xfc',
  props: {
    tools: {
      toolList: [...],
      shortcutMap: {...}
    }
  }
})
```

***tools.toolList下单个工具配置字段说明：***
```
{
      // 工具项名称，保持唯一性，便于区分工具项
      name: 'logo',
      // 文本，无lang时可取label值显示
      label: 'logo',
      // 多语言code码
      lang: 'L10000',
      // 工具项类型，不同的工具类型在ToolBar、ContextMenu里的表现不一样
      type: 'link',
      // 工具项图标
      icon: '',
      img: system.logo,
      // 跳转连接
      link: system.site,
      // 是否启用该工具项，用户控制是否启用该工具项
      enableTool: true,
      // 是否启用，用于动态控制是否在界面上创建该工具项
      enable: true,
      // 启用模式，用于控制在什么模式下启用该工具项
      enableMode: ['edit', 'preview'],
      // 是否禁用，用于控制界面上已创建的工具项是否处于禁用状态
      disabled: false,
      // 禁用模式，用于控制在什么模式下该工具项处于禁用状态，详见Editor/Index.vue 中的doSetMode方法
      disabledMode: ['edit', 'preview'],
      // 热键
      shortcuts: '',
      // 工具栏
      toolbar: {
        // 是否启用
        enable: true,
        // 位置
        position: 'left',
        // 样式
        style: {
          opacity: 1
        },
        // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
        divider: false
      },
      // 右键菜单
      contextmenu: {
        // 是否启用
        enable: false,
        // 目标元素类型，用于控制在什么元素上可以显示该工具项
        target: [],
        style: {},
        // 分割线，是否在该工具项后显示分割线，ToolBar中为竖线，ContextMenu中为横线
        divider: false
      }
    }
```

***tools.shortcutMap下单个工具配置字段说明：***

```
shortcutMap: {
  // 工具名
  undo: {
    // 工具名 
    tool: 'undo',
    // 快捷键
    key: 'mod+z',
    // 快捷键文本
    label: 'Ctrl + Z',
    // 快捷键描述
    description: '' 
  }
}
```
    
#### enableTools
【与tools互斥，配置后以此为主】设置要启用的工具项。

```
xfc({
  el: '#xfc',
  props: {
    enableTools: [
      // 日志相关
      'undo',
      'clearLog',
      'history',
      'redo',
      // 复制、粘贴
      'copy',
      'paste',
      // 删除
      'delete',
      // 清空画布
      'clear',
      // 缩放
      'zoom',
      'zoomIn',
      'zoomOut',
      'fit',
      'actualSize',
      // 画布背景
      'canvasBackground',
      // 元素基本操作
      'fill',
      'lineColor',
      'lineWidth',
      'lineDash',
      'lineType',
      'startArrow',
      'endArrow',
      'toFront',
      'toBack',
      'selectAll',
      'marquee',
      'group',
      'ungroup',
      'edit',
      'preview',
      'upload',
      'download',
      'layout',
      'fullscreen',
      'language',
      'github',
      'feedback',
      'help',
      // 纯快捷键
      'up',
      'down',
      'left',
      'right'
    ]
  }
})
```

#### disableTools
【与tools、enableTools互斥，配置后以此为主】设置要禁用的系统工具项

```
xfc({
  el: '#xfc',
  props: {
    'logo',
    'language',
    'help'
  }
})
```

#### shortcutMap
【与tools互斥，配置后以此为主】设置自带的工具项的快捷键

```
xfc({
  el: '#xfc',
  props: {
    shortcutMap: {
      // 工具名
      undo: {
        // 工具名 
        tool: 'undo',
        // 快捷键
        key: 'mod+z',
        // 快捷键文本
        label: 'Ctrl + Z',
        // 快捷键描述
        description: '' 
      }
    }
  }
})
```

#### materials
全量配置物料列表，覆写系统默认物料，自定义程度高，<span style="color: red; font-weight: 800;">无非必要不建议配置此项</span>。

```
xfc({
  el: '#xfc',
  props: {
    materials: [
        ...
    ]
  }
})
```

#### enableMaterials
【与materials互斥，配置后以此为主】设置要启用的系统物料

```
xfc({
  el: '#xfc',
  props: {
    enableMaterials: {
        // 启用的物料分类
        general: [
            // 启用的分类下图形
            'rectangle', 
            'rounded-rectangle'
        ]  
    }
  }
})
```

#### system
配置系统信息

```
xfc({
  el: '#xfc',
  props: {
    system: {
        version: '1.0.0',
        name: 'xfc',
        author: 'OXOYO',
        description: 'A visual graph editor based on G6 and Vue.',
        title: 'XFC',
        logo: require('@/assets/images/logo.png'),
        github: 'https://github.com/OXOYO/X-Flowchart-Vue',
        site: 'http://oxoyo.co/X-Flowchart-Vue/',
        feedback: 'https://github.com/OXOYO/X-Flowchart-Vue/issues/new',
        copyright: '©2019 - 2020 OXOYO All Rights Reserved.'
    }
  }
})
```

#### storage
配置本地存储信息

```
xfc({
  el: '#xfc',
  props: {
    storage: {
        // 本地存储前缀
        prefix: 'xfc'
    }
  }
})
```

#### i18n
配置多语言

```
xfc({
  el: '#xfc',
  props: {
    i18n: {
        // 默认语言包
        defLocale: 'zh-CN',
        // 自定义语音包或覆写系统语音包
        locales: {
            ...
        }
    }
  }
})
```
#### infoPanel
配置信息面板
```
xfc({
  el: '#xfc',
  props: {
    infoPanel: {
        // 配置信息
        options: {
            enable: true
        },
        // 导航器
        navigator: {
            enable: true,
            // minimap插件配置
            config: {
                type: 'delegate',
                delegateStyle: {
                    fill: '#ffffff',
                    stroke: '#000000'
                }
            }
        }
    }
  }
})
```

## API

### read (data, isActualSize)
接收数据，并进行渲染。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| data | Object | true | 初始化的图数据，是一个包括 nodes 和 edges 的对象 |

**用法**

```
const data = {
  nodes: [
    {
      id: 'node1',
      label: 'node1',
    },
    {
      id: 'node2',
      label: 'node2',
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
    },
  ],
};

xfcEditor.read(data)
```

### save()

获取图数据。

该方法无参数。

**返回值**

*   返回值类型：Object；
*   返回值包括所有节点和边，数据结构如下下所示：

```
{
    nodes: [],
    edges: []
}
```

**用法**

```
xfcEditor.save()
```

### getNodes()

获取图中所有节点的实例。

**⚠️ 注意:** 这里返回的是节点的实例，而不是节点的数据项。

**返回值**

*   返回值类型：Array；
*   返回值表示图中所有节点的实例。

**用法**

```
const nodes = xfcEditor.getNodes()
```

### getEdges()

获取图中所有边的实例。

**⚠️ 注意:** 这里返回的是边的实例，而不是边的数据项。

**返回值**

*   返回值类型：Array；
*   返回值表示图中所有边的实例。

**用法**

```
const edges = xfcEditor.getEdges()
```

### downloadImage (name, type, backgroundColor)
将画布上的元素导出为图片。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| name | String | false | 图片的名称，不指定则为 'graph' |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**用法**

```
xfcEditor.downloadImage()
```

### toDataURL (type, backgroundColor)
将画布上元素生成为图片的 URL。

**参数**

| 名称 | 类型 | 是否必选 | 描述 |
| --- | --- | --- | --- |
| type | `'image/png'` / `'image/jpeg'` / `'image/webp'` / `'image/bmp'` | false | 图片的类型。图的 `renderer` 为默认的 `'canvas'` 时生效，图的 `renderer` 为 `'svg'` 时将导出 svg 文件 |
| backgroundColor | String | false | 图片的背景色，可选，不传值时将导出透明背景的图片 |

**返回值**

*   返回值类型：String；
*   返回值表示生成的图片的 URL。

**用法**

```
const dataURL = xfcEditor.toDataURL()
```

## Reference
[@antvis/g6](https://github.com/antvis/g6)

[@alibaba/GGEditor](https://github.com/alibaba/GGEditor)

[@guozhaolong/wfd](https://github.com/guozhaolong/wfd)

[grapheditor](http://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html)

## Thank
[guozhaolong](https://github.com/guozhaolong)

## Contribution

我们目前接受 GitHub Pull Request ，并且所有开发提交的合并均通过 Pull Request 进行，故你可以直接点击该项目的 Fork 按钮得到你自己的 Fork ，在其上进行提交，并在修改完毕后直接通过 GitHub 网页发起 Pull Request 即可。对于 Pull Request 的介绍和使用方式，可以参阅 [GitHub 帮助文档中的 “关于 Pull Request” 部分](https://help.github.com/en/articles/about-pull-requests)。

**感谢所有为此项目做出贡献的人们！**

[curiosity-hyf](https://github.com/curiosity-hyf) 

[lzygit18](https://github.com/lzygit18)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, OXOYO

## Contact

点击链接加入群【Web全栈QQ群 333765077】：https://jq.qq.com/?_wv=1027&k=53iWbrr

## Star History
[![Stargazers over time](https://starchart.cc/OXOYO/X-Flowchart-Vue.svg)](https://starchart.cc/OXOYO/X-Flowchart-Vue)
