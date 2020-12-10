import * as d3 from 'd3'
import { link } from '../NetV'
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
export const getTimeId = (graphs) => {
    window.d3 = d3
    let timeGraphs = {}
    let nodeSet = new Set()
    let linkSet = new Set()
    let timeGraphSet = {}
    graphs.forEach((graph) => {
        const time = graph.time
        timeGraphSet[time] = { nodes: new Set(), links: new Set() }
        timeGraphs[time] = { nodes: {}, links: {} }
        graph.nodes.forEach((node) => {
            const id = node.id
            const timeId = `${time}-${id}`
            timeGraphs[time].nodes[id] = { id, timeId, time }
            timeGraphSet[time].nodes.add(id)
            nodeSet.add(id)
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
            linkSet.add(id)
            timeGraphSet[time].links.add(id)
        })
    })
    return { timeGraphs, nodeSet, linkSet, timeGraphSet }
}
export const getGraphLayout = (timeGraphs, nodeSet, linkSet, width, height) => {
    let nodes = []
    let links = []
    nodeSet.forEach((id) => {
        nodes.push({ id })
    })
    linkSet.forEach((id) => {
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
export const getCompareData = (timeGraphSet, nodeSet, linkSet, keyTime, timeGraphs) => {
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
        if ((keyTime = 'next')) {
            timeArr.forEach((time, index) => {
                if (index == timeArr.length - 1) return
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
            timeArr.forEach((time, index) => {
                const graphSet = timeGraphSet[time]
                result[time] = _dealCompare(graphSet, timeGraphSet[keyTime], nodeSet, linkSet)
            })
        }
    }
    timeArr.forEach((time) => {
        Object.keys(result[time]).forEach((statue) => {
            const { nodes, links } = result[time][statue]
            nodes.forEach((id) => (timeGraphs[time].nodes[id].statue = statue))
            links.forEach((id) => (timeGraphs[time].links[id].statue = statue))
        })
    })
    return timeGraphs
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
}
