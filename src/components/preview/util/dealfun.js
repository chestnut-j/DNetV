import * as d3 from 'd3'
import { link } from '../NetV'
export const intersection = (setA, setB) => {
    let _intersection = new Set(setA)
    for (let elem of setA) {
        if (!setB.has(elem)) {
            _intersection.delete(elem)
        }
    }
    return _intersection
}
// setA 减去 setB
export const difference = (setA, setB) => {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}
export const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}
export const getTimeId = (graphs) => {
    window.d3 = d3
    let timeGraphs = {}
    let nodesSet = new Set()
    let linksSet = new Set()
    graphs.forEach((graph) => {
        const time = graph.time
        timeGraphs[time] = { nodes: {}, links: {} }
        graph.nodes.forEach((node) => {
            const id = node.id
            const timeId = `${time}-${id}`
            timeGraphs[time].nodes[id] = { id, timeId, time }
            nodesSet.add(id)
        })
        graph.links.forEach((link) => {
            let { source, target } = link
            if (link.source < link.target) {
                source = link.target
                target = link.source
            }
            const id = `${source}-${target}`
            const timeId = `${time}-${id}`
            const sourceTimeId = timeGraphs[time].nodes[source].timeId
            const targetTimeId = timeGraphs[time].nodes[target].timeId
            timeGraphs[time].links[id] = {
                id,
                timeId,
                source,
                target,
                sourceTimeId,
                targetTimeId,
                time
            }
            linksSet.add(id)
        })
    })
    return { timeGraphs, nodesSet, linksSet }
}
export const getGraphLayout = (timeGraphs, nodesSet, linksSet, width, height) => {
    let nodes = []
    let links = []
    nodesSet.forEach((id) => {
        nodes.push({ id })
    })
    linksSet.forEach((id) => {
        const s = id.split('-')
        const source = s[0]
        const target = s[1]
        links.push({ source, target, id })
    })

    d3.forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .tick(10)
    const layoutNodes = Object.fromEntries(nodes.map((d) => [d.id, d]))
    const layoutLinks = Object.fromEntries(links.map((d) => [d.id, d]))
    Object.values(timeGraphs).forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            Object.assign(node, layoutNodes[node.id])
        })
        Object.values(graph.links).forEach((link) => {
            Object.assign(link, layoutLinks[link.id])
        })
    })
    return timeGraphs
}

export const getComparison = () => {}
