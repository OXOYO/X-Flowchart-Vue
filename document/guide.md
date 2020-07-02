# 使用指南

## 起步

### 安装
```
npm i @oxoyo/xfc --save
```

### 引用
```
import xfc from '@OXOYO/xfc'

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
| enableTools |【与tools互斥，配置后以此为主】设置要启用自带的工具项 | Array | - | - |
| shortcutMap |【与tools互斥，配置后以此为主】设置自带的工具项的快捷键 | Object | - | - |
| system | 配置系统信息 | Object | - | - |
| storage | 配置本地存储信息 | Object | - | - |
| i18n | 配置多语言 | Object | - | - |

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
    edges: [],
    groups: []
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