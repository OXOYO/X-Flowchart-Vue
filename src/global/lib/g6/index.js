/**
 * Created by OXOYO on 2019/7/3.
 *
 * 封装G6
 */

// import G6 from '@antv/g6'
// FIXME 调用G6源码，便于调试
import G6 from './G6'
import registerBehavior from './behavior/index'
import registerEdge from './edge/index'
import registerNode from './node/index'

import config from './config/index'

// 挂载config
G6.$C = config

// 注册交互
registerBehavior(G6)
// 注册边
registerEdge(G6)
// 注册节点
registerNode(G6)

export default G6
