# 基于G6和Vue的可视化图形编辑器

**预览地址：[http://oxoyo.co/X-Flowchart-Vue/](http://oxoyo.co/X-Flowchart-Vue/)**

**仓库地址：[https://github.com/OXOYO/X-Flowchart-Vue](https://github.com/OXOYO/X-Flowchart-Vue)**

初衷很简单，开发一个基于Vue的流程编辑器。项目初期研究过jsplumb，不是很理想，后来就着手拿SVG直接堆一个出来，初版开发完基本满足需求。
在经过了3个版本的迭代后，算是有一个比较成型的编辑器了，下面简单介绍一下。

## V1.0
该版本使用原生SVG开发，实现了基础的节点拖拽、连线、属性配置、右键菜单、导出数据功能，基本满足项目需求。

![](https://github.com/OXOYO/X-Flowchart-Vue/raw/v1.0.0/docs/images/img_001.png)

## V2.0
该版本原计划是在V1.0基础上做功能优化、功能扩展的，但开发了一段时间后觉得整体设计不够理想就搁置了。

## V3.0
该版本是基于 [antvis/G6](https://github.com/antvis/g6/) 实现，属于对前两版本的重构。

![](https://github.com/OXOYO/X-Flowchart-Vue/raw/master/document/preview_001.png)

### 功能
目前已实现的功能如下表所示：

| 功能       | 状态 | 快捷键            | 工具栏 | 右键菜单 | 备注   |
| :--------- | :--- | :--------------- | :----- | :----- | :---- |
| logo       | ✔   |                   | ✔     | ✖      | Logo | 
| undo       | ✔   | ctrl + z          | ✔     | ✔      | 撤销 | 
| clearLog   | ✔   | ctrl + shift + l  | ✔     | ✔      | 清空操作日志 | 
| redo       | ✔   | ctrl + shift + z  | ✔     | ✔      | 重做 | 
| copy       | ✔   | ctrl + c          | ✔     | ✔      | 复制 | 
| paste      | ✔   | ctrl + v          | ✔     | ✔      | 粘贴 | 
| delete     | ✔   | Delete            | ✖     | ✔      | 删除 | 
| clear      | ✔   | ctrl + shift + e  | ✔     | ✔      | 清空画布 |
| zoom       | ✔   |                   | ✔     | ✔      | 缩放 |
| zoomIn     | ✔   | ctrl + +          | ✔     | ✔      | 放大 |
| zoomOut    | ✔   | ctrl + -          | ✔     | ✔      | 缩小 |
| fit        | ✔   | ctrl + 0          | ✔     | ✔      | 适应屏幕 |
| actualSize | ✔   | ctrl + 1          | ✔     | ✔      | 实际大小 |
| fill       | ✔   |                   | ✔     | ✔      | 填充颜色 |
| lineColor  | ✔   |                   | ✔     | ✔      | 线条颜色 |
| lineWidth  | ✔   |                   | ✔     | ✔      | 线条宽度 |
| lineStyle  | ✔   |                   | ✔     | ✔      | 线条样式 |
| lineType   | ✔   |                   | ✔     | ✔      | 线条类型 |
| startArrow | ✔   |                   | ✔     | ✔      | 起点 |
| endArrow   | ✔   |                   | ✔     | ✔      | 终点 |
| toFront    | ✔   |                   | ✔     | ✔      | 置于顶层 |
| toBack     | ✔   |                   | ✔     | ✔      | 置于底层 |
| selectAll  | ✔   | ctrl + a          | ✔     | ✔      | 全选 |
| marquee    | ✔   |                   | ✖     | ✖      | 框选 |
| edit       | ✔   |                   | ✔     | ✔      | 编辑 |
| preview    | ✔   |                   | ✔     | ✔      | 预览 |
| upload     | ✔   |                   | ✔     | ✔      | 上传 |
| download   | ✔   |                   | ✔     | ✔      | 下载 |
| language   | ✔   |                   | ✔     | ✔      | 语言 |
| github     | ✔   |                   | ✔     | ✔      | Github |
| feedback   | ✔   |                   | ✔     | ✔      | 反馈 |
| up         | ✔   | up                | ✖     | ✖      | 上 |
| down       | ✔   | down              | ✖     | ✖      | 下 |
| left       | ✔   | left              | ✖     | ✖      | 左 |
| right      | ✔   | right             | ✖     | ✖      | 右 |

### **undo**、**clearLog**、**redo**
***撤销***、***清空日志***、***重做***，在 `state` 中存储 `log` 数据，通过 `mutation` 来更新 `log` 数据。

***state***
`current` 就是当前画布上的数据。
`list` 就是操作日志列表。
```
// /src/store.js
export default new Vuex.Store({
    state: {  
      editor: {  
        ...
        // 操作日志  
        log: {  
          current: null,  
          list: []
        }
        ...
      }
    },
    ...
    mutations: {
      ...
      'editor/log/update': (state, data) => {
        ...
      }
    }
})
```
***更新***
在需要记录操作的地方通过 `commit` `editor/currentItem/update` 来更新 `log` 数据

```
// 更新操作日志  
_t.$store.commit('editor/log/update', {
  // 操作类型：undo、clearLog、redo
  action: ''
})
```

### **copy**、**paste**
***复制***、***粘贴***，通过 `clipboard` 存储复制的节点数据，通过 `addItem` 方法将节点粘贴到画布上。

```
// /src/components/Editor/Index.vue
...
// 数据定义
data () {
  return {
    ...
    clipboard: {  
      data: null,  
      // 粘贴计数器  
      count: 0  
    }
    ...
  }
}
...
handleToolTrigger (info) {
  ...
  switch (info.name) {
    ...
    case 'copy':  
      (() => {  
        // FIXME 目前只支持节点的复制，不支持边的复制，边只能通过拖拽生成  
        let data = _t.currentItem ? _t.currentItem.filter(item => item.type === 'node') : []  
        _t.clipboard = {
          data,
          count: 0  
        }
      })()
    break
    case 'paste':
      (() => {  
        let data = _t.clipboard.data  
        _t.clipboard.count++
        if (data.length) {  
          data.forEach((item, index) => {  
            let model = item.model  
            // 计算坐标，添加一定偏移量，防止重叠  
            let x = model.x + 10 * _t.clipboard.count  
            let y = model.y + 10 * _t.clipboard.count  
            // 如果通过右键菜单触发的，则获取触发菜单时的canvas坐标  
            if (info && info.context === 'ContextMenu' && info.data) {  
              if (info.data.hasOwnProperty('canvasX')) {  
                x = model.x + info.data.canvasX - data[0].model.x  
              }  
              if (info.data.hasOwnProperty('canvasY')) {  
                y = model.y + info.data.canvasY - data[0].model.y  
              }  
            }  
            let node = {  
              ...model,  
              id: G6.Util.uniqueId(),
              groupId: '',  
              x,  
              y  
            }
            // 添加节点到画布上
            _t.editor.addItem('node', node)  
          })
        }  
      })()
    break
    ...
  }
  ...
}
```

### **delete**
删除元素，通过 `removeItem` 方法删除 `node`、`edge`。

### **clear**
清空画布，通过 `clear` 方法清空画布。

### **zoom**、**zoomIn**、**zoomOut**
***缩放***、***放大***、***缩小***，通过 `zoomTo` 方法将画布缩放到某个比例

### **fit**、**actualSize**
***适应屏幕***，通过 `fitView` 方法将画布缩放到适应屏幕；通过。
**实际大小**，通过 `zoomTo` 方法将画布缩放到 `1` 比例。

### **fill**、**lineColor**、**lineWidth**、**lineStyle**、**lineType**、**startArrow**、**endArrow**
***填充颜色***、***线条颜色***、***线条宽度***、***线条样式***、***线条类型***、***起点***、***终点***，通过 `updateItem` 方法更新节点、边的属性。

### **toFront**、**toBack**
***置顶***，通过 `toFront` 方法将节点、边置顶。
***置底***，通过 `toBack` 方法将节点、边置底。

### **selectAll**
***全选***，通过 `updateItem` 方法设置所有节点为同一个 `groupId`，通过 `setItemState` 方法设置所有节点 `active` 状态。

### **edite**、**preview**
***编辑***、***预览***，通过 `setMode` 方法设置画布不同的模式，不同模式下会执行不同的 `behavior`。

```
// /src/components/Editor/index.vue
// 生成编辑器实例  
_t.editor = new G6.Graph({
  ...
  // 模式  
modes: {  
  // 编辑模式
  edit: [
    {  
      // 自定义节点控制交互
      type: 'node-control',
      config: {...}
    }
  ],
  // 预览模式
  preview: [ 
    'zoom-canvas',  
    'drag-canvas',  
    'preview-canvas'  
  ]
  ...
})
```

### **upload**、**download**
***上传***，通过 `input` 文本选择窗口上传 `json` 数据文件，通过 `FileReader` 解析数据，通过 `data` 设置画布数据，通过 `render` 渲染画布。
***下载***，通过 `downloadImage` 下载为图片，通过 `save` 下载为 `json` 数据。

### **language**
***国际化***，通过 `i18n` 处理多语言。

---------

### **热键**
使用 [mousetrap](https://github.com/ccampbell/mousetrap) 处理快捷键绑定。

### 自定义节点
在 `/src/global/g6/node/` 目录下是自定义节点的实现，通过 `G6.registerNode` 方法注册自定义节点。

### 自定义边
在 `/src/global/g6/edge/` 目录下是自定义边的实现，通过 `G6.registerEdge` 方法注册自定义边。

### 自定义交互
在 `/src/global/g6/behavior/` 目录下是自定义交互的实现，通过 `G6.registerBehavior` 方法注册自定义交互。

### 自定义插件
在 `/src/global/g6/plugins/` 目录下是自定义插件的实现，通过继承扩展插件，在创建实例 `new G6.Graph` 时使用插件。


### 参考
[@antvis/g6](https://github.com/antvis/g6)

产品在开发过程中参考了以下项目部分实现：

[@alibaba/GGEditor](https://github.com/alibaba/GGEditor)  
[@guozhaolong/wfd](https://github.com/guozhaolong/wfd)
[grapheditor](http://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html)

最后欢迎各位大佬 star、pr。
