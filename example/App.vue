<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<template>
  <div id="app">
    <div id="xfc"></div>
  </div>
</template>

<script>
  import xfc from '../dist/xfc.umd.min.js'
  import '../dist/xfc.css'

  export default {
    name: 'app',
    mounted () {
      const system = {
        version: '1.0.0',
        name: 'xfcDemo',
        author: 'OXOYO',
        description: 'xfcDemo',
        title: 'xfcDemo',
        logo: require('@/assets/images/logo.png'),
        github: 'https://github.com/OXOYO/X-Flowchart-Vue',
        githubPages: 'http://oxoyo.co/X-Flowchart-Vue/',
        feedback: 'https://github.com/OXOYO/X-Flowchart-Vue/issues/new',
        copyright: '©2019 - 2020 OXOYO All Rights Reserved.'
      }

      // 初始化
      const xfcEditor = xfc({
        el: '#xfc',
        props: {
          system
        }
      })
      console.log('xfcEditor', xfcEditor)
      xfcEditor.$nextTick(() => {
        // FIXME API调用示例
        // 初始化数据
        xfcEditor.read({"nodes":[{"id":"g2","draggable":true,"type":"hexagon","label":"","labelCfg":{"position":"center","style":{"fontSize":16,"stroke":"#000000"}},"width":80,"height":40,"minWidth":20,"minHeight":20,"anchorPoints":[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]],"shapeControl":{"controllers":[[0,0,"nwse-resize"],[0,0.5,"ew-resize"],[0,1,"nesw-resize"],[0.5,0,"ns-resize"],[0.5,1,"ns-resize"],[1,0,"nesw-resize"],[1,0.5,"ew-resize"],[1,1,"nwse-resize"]],"rotate":true},"name":"XFC_NODE_Hexagon","x":279,"y":99,"size":[80,40],"style":{"fill":"#FFFFFF","fillOpacity":1,"stroke":"#000000","strokeOpacity":1,"lineWidth":1,"lineDash":[]},"groupId":""},{"id":"g4","draggable":true,"type":"circle","label":"","labelCfg":{"position":"center","style":{"fontSize":16,"stroke":"#000000"}},"width":80,"height":80,"minWidth":20,"minHeight":20,"anchorPoints":[[0,0],[0.25,0],[0.5,0],[0.75,0],[1,0],[1,0.25],[1,0.5],[1,0.75],[1,1],[0.75,1],[0.5,1],[0.25,1],[0,1],[0,0.75],[0,0.5],[0,0.25]],"shapeControl":{"controllers":[[0,0,"nwse-resize"],[0,0.5,"ew-resize"],[0,1,"nesw-resize"],[0.5,0,"ns-resize"],[0.5,1,"ns-resize"],[1,0,"nesw-resize"],[1,0.5,"ew-resize"],[1,1,"nwse-resize"]],"rotate":true},"name":"XFC_NODE_Circle","x":462,"y":92,"size":[80,80],"style":{"fill":"#FFFFFF","fillOpacity":1,"stroke":"#000000","strokeOpacity":1,"lineWidth":1,"lineDash":[]},"groupId":""}],"edges":[{"id":"g5","source":"g2","sourceAnchor":7,"target":"g4","label":"","labelCfg":{"position":"center","style":{"autoRotate":true,"fontSize":16,"stroke":"#000000"}},"attrs":{"start":"g2","end":"g4"},"style":{"lineAppendWidth":10,"stroke":"#000000","lineWidth":1,"strokeOpacity":1,"lineDash":[],"endArrow":{"path":"M0,0 L20,-10 L20,10 Z","d":0,"fill":"#000000","stroke":"#000000"}},"type":"x-line","startArrow":false,"endArrow":false,"startPoint":{"x":319.70710678118655,"y":99,"index":7},"endPoint":{"x":421.5,"y":92,"index":15},"targetAnchor":15}],"combos":[],"groups":[]})
        // 保存图片
        // xfcEditor.downloadImage()
      })
    }
  }
</script>
