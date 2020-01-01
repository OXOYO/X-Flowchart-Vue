# X-Flowchart-Vue

> A visual graph editor based on G6 and Vue.

## Version

| XFC |
| :-------- |
| [v3.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/master) |
| [v2.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/v2.0.0) |
| [v1.0.0](https://github.com/OXOYO/X-Flowchart-Vue/tree/v1.0.0) |

## Preview

[online](http://oxoyo.co/X-Flowchart-Vue/)

![](./document/2020-01-01 10 12 20.png)

## Example

``` bash
# git clone https://github.com/OXOYO/X-Flowchart-Vue.git

# install dependencies
yarn install

### Compiles and hot-reloads for development
yarn run serve
```

## Features

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

## Reference
[@antvis/g6](https://github.com/antvis/g6)

[@alibaba/GGEditor](https://github.com/alibaba/GGEditor)

[grapheditor](http://jgraph.github.io/mxgraph/javascript/examples/grapheditor/www/index.html)

## Thank
特别感谢[@guozhaolong](https://github.com/guozhaolong)大佬的开源项目[@guozhaolong/wfd](https://github.com/guozhaolong/wfd)

本项目参考、引用了[@guozhaolong/wfd](https://github.com/guozhaolong/wfd)项目的部分实现，在此特别说明，以示感谢！

## TODO
  v3.0.0
- [ ] `***` **重构**：基于 `@antv/g6 v3.x` 重构。
- [x]  **工具栏**：撤销
- [x]  **工具栏**：重做
- [x]  **工具栏**：复制
- [x]  **工具栏**：粘贴
- [x]  **工具栏**：清除
- [x]  **工具栏**：缩放
- [x]  **工具栏**：放大
- [x]  **工具栏**：缩小
- [x]  **工具栏**：适应全屏
- [x]  **工具栏**：实际大小
- [x]  **工具栏**：填充颜色
- [x]  **工具栏**：线条颜色
- [x]  **工具栏**：线条宽度
- [x]  **工具栏**：线条样式
- [x]  **工具栏**：线条类型
- [x]  **工具栏**：起点
- [x]  **工具栏**：终点
- [x]  **工具栏**：置于顶层
- [x]  **工具栏**：置于底层
- [x]  **工具栏**：框选
- [ ]  **工具栏**：添加组
- [ ]  **工具栏**：解除组
- [x]  **工具栏**：上传
- [x]  **工具栏**：下载
- [x]  **工具栏**：预览
- [x]  **工具栏**：全屏
- [x]  **工具栏**：语言
- [x]  **热键**
- [x]  **右键菜单**
- [x]  **基础图形**：Rectangle
- [x]  **基础图形**：Rounded Rectangle
- [ ]  **基础图形**：Text
- [ ]  **基础图形**：Textbox
- [x]  **基础图形**：Ellipse
- [x]  **基础图形**：Square
- [x]  **基础图形**：Circle
- [x]  **基础图形**：Process
- [x]  **基础图形**：Diamond
- [x]  **基础图形**：Parallelogram
- [x]  **基础图形**：Hexagon
- [x]  **基础图形**：Triangle
- [x]  **基础图形**：Cylinder
- [x]  **基础图形**：Cloud
- [x]  **基础图形**：Document
- [x]  **基础图形**：Internal Sotrage
- [x]  **基础图形**：Cube
- [x]  **基础图形**：Step
- [x]  **基础图形**：Trapezoid
- [x]  **基础图形**：Tape
- [x]  **基础图形**：Note
- [x]  **基础图形**：Card
- [x]  **基础图形**：Callout
- [x]  **基础图形**：Actor
- [x]  **基础图形**：Or
- [x]  **基础图形**：And
- [x]  **基础图形**：Data Storage
- [ ]  **高级图形**

## Contribution

我们目前接受 GitHub Pull Request ，并且所有开发提交的合并均通过 Pull Request 进行，故你可以直接点击该项目的 Fork 按钮得到你自己的 Fork ，在其上进行提交，并在修改完毕后直接通过 GitHub 网页发起 Pull Request 即可。对于 Pull Request 的介绍和使用方式，可以参阅 [GitHub 帮助文档中的 “关于 Pull Request” 部分](https://help.github.com/en/articles/about-pull-requests)。

**感谢所有为此项目做出贡献的人们！**

[curiosity-hyf](https://github.com/curiosity-hyf) [lzygit18](https://github.com/lzygit18)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present, OXOYO

## Contact

点击链接加入群【Web全栈QQ群】：https://jq.qq.com/?_wv=1027&k=53iWbrr
