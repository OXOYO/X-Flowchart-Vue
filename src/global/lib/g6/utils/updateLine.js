/**
 * Created by OXOYO on 2019/7/19.
 *
 * 更新线条
 */

export default function (node, graph) {
  let edges = graph.getEdges()
  if (!edges || !edges.length) {
    return
  }
  let nodeModel = node.getModel()
  edges.forEach(edge => {
    let edgeModel = edge.getModel()
    if (nodeModel.id === edgeModel.attrs.start) {
      let anchorPoint = edgeModel.source
      let nodeAnchor = node.getLinkPointByAnchor(anchorPoint.index)
      graph.updateItem(edge, {
        source: nodeAnchor
      })
    } else if (nodeModel.id === edgeModel.attrs.end) {
      let anchorPoint = edgeModel.target
      let nodeAnchor = node.getLinkPointByAnchor(anchorPoint.index)
      graph.updateItem(edge, {
        target: nodeAnchor
      })
    }
  })
}
