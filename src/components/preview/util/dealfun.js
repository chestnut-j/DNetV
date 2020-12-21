import * as d3 from 'd3'
import { sum } from 'd3'
// import { link } from '../NetV'
export const _intersection = (setA, setB) => {
    let intersection = new Set(setA)
    for (let elem of setA) {
        if (!setB.has(elem)) {
            intersection.delete(elem)
        }
    }
    return intersection
}
// setA 减去 setB
export const _difference = (setA, setB) => {
    let difference = new Set(setA)
    for (let elem of setB) {
        difference.delete(elem)
    }
    return difference
}
export const _union = (setA, setB) => {
    let union = new Set(setA)
    for (let elem of setB) {
        union.add(elem)
    }
    return union
}
export const getTimeId = (graphs, times) => {
    window.d3 = d3
    let timeGraphs = {}
    let nodeSet = new Set()
    let linkSet = new Set()
    let timeGraphSet = {}
    let sumGraphs = { nodes: {}, links: {} }
    const l = Object.keys(times).length

    graphs.forEach((graph) => {
        const time = graph.time
        const timeIndex = times[time]
        timeGraphSet[time] = { nodes: new Set(), links: new Set() }
        timeGraphs[time] = { nodes: {}, links: {} }
        graph.nodes.forEach((node) => {
            const id = node.id
            const timeId = `${time}-${id}`
            timeGraphs[time].nodes[id] = { id, timeId, time, status: [], timeIndex }
            timeGraphSet[time].nodes.add(id)
            nodeSet.add(id)
            if (!sumGraphs.nodes[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.nodes[id] = { id, existTimeIndex, existTimes, existStatus }
            }
            sumGraphs.nodes[id].existTimeIndex[times[time]] = 1
            sumGraphs.nodes[id].existTimes[times[time]] = time
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
                time,
                timeIndex,
                status: []
            }
            linkSet.add(id)
            timeGraphSet[time].links.add(id)
            if (!sumGraphs.links[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.links[id] = {
                    id,
                    source,
                    target,
                    existTimeIndex,
                    existTimes,
                    existStatus
                }
            }
            sumGraphs.links[id].existTimeIndex[times[time]] = 1
            sumGraphs.links[id].existTimes[times[time]] = time
        })
    })
    return { timeGraphs, nodeSet, linkSet, timeGraphSet, sumGraphs }
}

export function adjustLayout2Svg(nodes, links, width, height) {
    let minX = width,
        maxX = -1,
        minY = height,
        maxY = -1,
        ratio
    const margin = 10
    // ratio取x轴和y轴比较小的
    // 找到比例后，先调整节点的坐标，并记录映射值，再调整链接坐标
    nodes.forEach((node) => {
        if (node.x < minX) {
            minX = node.x
        }
        if (node.x > maxX) {
            maxX = node.x
        }
        if (node.y < minY) {
            minY = node.y
        }
        if (node.y > maxY) {
            maxY = node.y
        }
    })
    const ratioX = (maxX - minX) / (width - margin * 2)
    const ratioY = (maxY - minY) / (height - margin * 2)
    ratio = ratioX > ratioY ? ratioX : ratioY
    const translateX = minX - margin
    const translateY = minY - margin
    const nodeId2Coord = {}
    nodes.forEach((node) => {
        // 平移
        node.x -= translateX
        node.y -= translateY
        // 放缩
        node.x = (node.x - margin) / ratio + margin
        node.y = (node.y - margin) / ratio + margin
        nodeId2Coord[node.id] = {
            x: node.x,
            y: node.y
        }
    })
    links.forEach((link) => {
        link.source.x = nodeId2Coord[link.source.id].x
        link.source.y = nodeId2Coord[link.source.id].y
        link.target.x = nodeId2Coord[link.target.id].x
        link.target.y = nodeId2Coord[link.target.id].y
    })
}
export const horizontalLayout = (sumGraphs, window, height) => {}
export const offLineLayout = (sumGraphs, width, height) => {
    let { nodes, links } = sumGraphs
    d3.forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .stop()
        .tick(10)
        .stop()
    adjustLayout2Svg(nodes, links, width, height)
    // console.log("nodes---links----width---height", nodes, links, width, height)
    return sumGraphs
}

export const getGraphLayout = (timeGraphs, sumGraphs) => {
    let { nodes, links } = sumGraphs
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
export const _dealCompare = (graph, compareGraph, nodeSet, linkSet) => {
    const appearNodes = _intersection(_difference(graph.nodes, compareGraph.nodes), nodeSet)
    const disappearNodes = _intersection(_difference(compareGraph.nodes, graph.nodes), nodeSet)
    const stableNodes = _intersection(_intersection(graph.nodes, compareGraph.nodes), nodeSet)
    const appearLinks = _intersection(_difference(graph.links, compareGraph.links), linkSet)
    const disappearLinks = _intersection(_difference(compareGraph.links, graph.links), linkSet)
    const stableLinks = _intersection(_intersection(graph.links, compareGraph.links), linkSet)
    return {
        appear: { nodes: appearNodes, links: appearLinks },
        disappear: { nodes: disappearNodes, links: disappearLinks },
        stable: { nodes: stableNodes, links: stableLinks }
    }
}
export const getCompareData = (
    timeGraphSet,
    nodeSet,
    linkSet,
    keyTime,
    timeGraphs,
    sumGraphs,
    times
) => {
    const timeArr = Object.keys(timeGraphSet)
    let result = Object.fromEntries(timeArr.map((time) => [time, {}]))
    if (keyTime === 'last') {
        timeArr.forEach((time, index) => {
            if (index === 0) return
            const graphSet = timeGraphSet[time]
            const lastTime = timeArr[index - 1]
            const lastGraphSet = timeGraphSet[lastTime]
            const { appear, disappear, stable } = _dealCompare(
                graphSet,
                lastGraphSet,
                nodeSet,
                linkSet
            )
            result[time].appear = appear
            result[lastTime].disappear = disappear
            result[lastTime].stable = stable
        })
    } else {
        if (keyTime === 'next') {
            timeArr.forEach((time, index) => {
                if (index === timeArr.length - 1) return
                const graphSet = timeGraphSet[time]
                const nextTime = timeArr[index + 1]
                const nextGraphSet = timeGraphSet[nextTime]
                const { appear, disappear, stable } = _dealCompare(
                    nextGraphSet,
                    graphSet,
                    nodeSet,
                    linkSet
                )
                result[nextTime].appear = appear
                result[time].disappear = disappear
                result[time].stable = stable
            })
        } else {
            timeArr.forEach((time) => {
                const graphSet = timeGraphSet[time]
                result[time] = _dealCompare(graphSet, timeGraphSet[keyTime], nodeSet, linkSet)
            })
        }
    }
    timeArr.forEach((time) => {
        Object.keys(result[time]).forEach((status) => {
            const { nodes, links } = result[time][status]
            nodes.forEach((id) => {
                const s = status + 'Node'
                timeGraphs[time].nodes[id].status.push(s)
                sumGraphs.nodes[id].existStatus[times[time]].push(s)
            })
            links.forEach((id) => {
                const s = status + 'Link'
                timeGraphs[time].links[id].status.push(s)
                sumGraphs.links[id].existStatus[times[time]].push(s)
            })
        })
        Object.values(timeGraphs[time].nodes).forEach((node) => {
            if (!node.status.length) {
                node.status.push('stableNode')
                sumGraphs.nodes[node.id].existStatus[times[time]].push('stableNode')
            }
        })
        Object.values(timeGraphs[time].links).forEach((link) => {
            if (!link.status.length) {
                link.status.push('stableLink')
                sumGraphs.links[link.id].existStatus[times[time]].push('stableLink')
            }
        })
    })
    sumGraphs.nodes = Object.values(sumGraphs.nodes)
    sumGraphs.links = Object.values(sumGraphs.links)
    return timeGraphs
    /*
    this.graphPos.nodes.forEach((node) => {
        const { time, originId } = node
        if (graphCompare[time] === null || graphCompare[time] === undefined) {
            return
        }
        if (
            graphCompare[time].hasOwnProperty('appear') &&
            graphCompare[time].appear.nodes.has(originId)
        ) {
            node.fill = {
                r: encode.appear.color[0] / 255,
                g: encode.appear.color[1] / 255,
                b: encode.appear.color[2] / 255,
                a: 1
            }
        } else {
            if (
                graphCompare[time].hasOwnProperty('disappear') &&
                graphCompare[time].disappear.nodes.has(originId)
            ) {
                node.fill = {
                    r: encode.disappear.color[0] / 255,
                    g: encode.disappear.color[1] / 255,
                    b: encode.disappear.color[2] / 255,
                    a: 1
                }
            }
        }
    })
    this.graphPos.links.forEach((link) => {
        const { time, originId } = link
        if (graphCompare[time] === null || graphCompare[time] === undefined) {
            return
        }
        if (
            graphCompare[time].hasOwnProperty('appear') &&
            graphCompare[time].appear.links.has(originId)
        ) {
            link.strokeColor = {
                r: encode.appear.color[0] / 255,
                g: encode.appear.color[1] / 255,
                b: encode.appear.color[2] / 255,
                a: 1
            }
        } else {
            if (
                graphCompare[time].hasOwnProperty('disappear') &&
                graphCompare[time].disappear.links.has(originId)
            ) {
                link.strokeColor = {
                    r: encode.disappear.color[0] / 255,
                    g: encode.disappear.color[1] / 255,
                    b: encode.disappear.color[2] / 255,
                    a: 1
                }
            }
        }
    })
    */
}
