// 定义左侧导航

const list = {
  components: [
    {
      type: 'Basic',
      title: '基础',
      children: [
        {
          title: '矩形',
          name: 'XMRectangle',
          icon: 'ios-grid-view-outline',
          nest: {
            enable: true,
            parent: {
              allow: [],
              deny: []
            },
            children: {
              allow: [],
              deny: []
            }
          }
        }
      ]
    }
  ]
}

export default list
