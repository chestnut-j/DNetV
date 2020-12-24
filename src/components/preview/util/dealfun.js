import * as d3 from 'd3'
import { sum } from 'd3'
import { defaultConfigs } from './defaultConfig'
import * as assign from 'assign-deep'
import { configs } from 'eslint-plugin-prettier'
import { configConsumerProps } from 'antd/lib/config-provider'
import * as _ from 'lodash'
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
            const type = node.type ? node.type : 'ele'
            timeGraphs[time].nodes[id] = {
                type,
                id,
                timeId,
                time,
                status: [],
                timeIndex,
                style: {}
            }
            timeGraphSet[time].nodes.add(id)
            nodeSet.add(id)
            if (!sumGraphs.nodes[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.nodes[id] = {
                    id,
                    type,
                    existTimeIndex,
                    existTimes,
                    existStatus,
                    style: {}
                }
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
            const type = link.type ? link.type : 'ele'
            const sourceTimeId = timeGraphs[time].nodes[source].timeId
            const targetTimeId = timeGraphs[time].nodes[target].timeId
            timeGraphs[time].links[id] = {
                id,
                type,
                timeId,
                source,
                target,
                sourceTimeId,
                targetTimeId,
                time,
                timeIndex,
                status: [],
                style: {}
            }
            linkSet.add(id)
            timeGraphSet[time].links.add(id)
            if (!sumGraphs.links[id]) {
                let existTimeIndex = new Array(l).fill(0)
                let existTimes = new Array(l).fill('')
                let existStatus = new Array(l).fill(0).map(() => [])
                sumGraphs.links[id] = {
                    id,
                    type,
                    source,
                    target,
                    existTimeIndex,
                    existTimes,
                    existStatus,
                    style: {}
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

export const verticalLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const { eachWidth, eachHeight } = configs
    const l = nodes.length
    let nodesObj = {}
    nodes.forEach((node, index) => {
        node.y = (eachHeight / l) * index
        node.x = 0
        nodesObj[node.id] = { ...node }
    })
    links.forEach((link) => {
        link.source = nodesObj[link.source]
        link.target = nodesObj[link.target]
    })
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)

    return sumGraphs

    // adjustLayout2Svg(nodes, links, width, height)
}
export const timeASnode = (graphs) => {
    graphs.forEach((graph) => {
        // const timeNode = { id: 'time', type: 'time' }
        graph.nodes.forEach((node) => {
            const source = 'time'
            const target = node.id
            graph.links.push({ source, target, type: 'time' })
        })
        graph.nodes.push({ id: 'time', type: 'time' })
    })
}
export const offLineLayout = (sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const { eachWidth, eachHeight } = configs
    d3.forceSimulation(nodes)
        .force(
            'link',
            d3.forceLink(links).id((d) => d.id)
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(eachWidth / 2, eachHeight / 2))
        .stop()
        .tick(10)
        .stop()
    adjustLayout2Svg(nodes, links, eachWidth, eachHeight)
    // console.log("nodes---links----width---height", nodes, links, width, height)
    return sumGraphs
}
export const assignConfigs = (setConfigs) => {
    let configs = _.cloneDeep(setConfigs)
    let sumConfigs = {}
    assign(sumConfigs, defaultConfigs.basic)
    Object.keys(defaultConfigs).forEach((key) => {
        sumConfigs[key] = {}
    })
    Object.keys(configs).forEach((key) => {
        let encoding = configs[key]
        if (typeof encoding === 'string') {
            //timeLine
            if (key in defaultConfigs) {
                sumConfigs[key][encoding] = _.cloneDeep(defaultConfigs[key][encoding])
            } else {
                sumConfigs[key] = encoding
            }
        } else {
            if (_.isArray(encoding)) {
                // time: ['timeLine', 'insert', 'markingLine'],
                encoding.forEach((e) => {
                    if (typeof e === 'string') {
                        sumConfigs[key][e] = _.cloneDeep(defaultConfigs[key][e])
                    } else {
                        const e1 = Object.keys(e)[0]
                        sumConfigs[key][e1] = _.cloneDeep(defaultConfigs[key][e1])
                        assign(sumConfigs[key], e)
                    }
                })
            } else {
                const e = Object.keys(encoding)[0]
                sumConfigs[key][e] = _.cloneDeep(defaultConfigs[key][e])
                assign(sumConfigs[key], encoding)
            }
        }
    })
    if ('layout' in sumConfigs) {
        sumConfigs.layoutName = Object.keys(sumConfigs.layout)[0]
    }
    console.log(defaultConfigs.time.timeLine.element)
    return sumConfigs
}
export const getMarkingLine = (sumGraphs, timeGraphs, configs) => {
    let markingLine = {}
    Object.values(sumGraphs.nodes).forEach((node) => {
        const { id, existTimes } = node
        markingLine[id] = []
        existTimes.forEach((time) => {
            if (time !== '') {
                const { x, y } = timeGraphs[time].nodes[id]
                const l = markingLine[id].length
                if (l) {
                    markingLine[id][l - 1].target = { x, y }
                }
                markingLine[id].push({ source: { x, y } })
            }
        })
        markingLine[id].pop()
    })
    return markingLine
}
export const getPiePathColor = (len, startColor, endColor) => {
    //设置颜色比例尺
    // let colorScale
    // if (!startColor || !endColor) {
    //     colorScale = d3.scaleOrdinal().domain(d3.range(len)).range(d3.schemeCategory10)
    // } else {
    // console.log("d3.range(len)", d3.range(len))
    const colorScale = d3
        .scaleLinear()
        .domain([0, len - 1])
        .range([startColor, endColor])
    // }
    return colorScale
}

export const setStyle = (timeGraphs, sumGraphs, configs) => {
    let timeColorObj = {}
    if (configs.time.color) {
        const times = Object.keys(timeGraphs)
        const l = times.length
        const colorScale = getPiePathColor(
            l,
            configs.time.color.startColor,
            configs.time.color.endColor
        )
        times.forEach((time, i) => {
            timeColorObj[time] = colorScale(i)
        })
    }
    Object.values(timeGraphs).forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            if (node.type === 'time') {
                if (_.hasIn(configs.time.insert, 'nodeStyle')) {
                    node.style.nodeStyle = _.cloneDeep(configs.time.insert.nodeStyle)
                } else {
                    node.style.nodeStyle = _.cloneDeep(configs.nodeStyle)
                }
                if (configs.time.color) {
                    node.style.nodeStyle.fillColor = timeColorObj[node.time]
                }
                return
            }
            node.status.forEach((d) => {
                if (_.hasIn(configs.comparison.color, d)) {
                    node.style[d] = _.cloneDeep(configs.comparison.color[d])
                }
            })
            if (!Object.values(node.style).length) {
                node.style.nodeStyle = _.cloneDeep(configs.nodeStyle)
            }
        })
        Object.values(graph.links).forEach((link) => {
            if (link.type === 'time') {
                if (_.hasIn(configs.time.insert, 'linkStyle')) {
                    link.style.linkStyle = _.cloneDeep(configs.time.insert.linkStyle)
                } else {
                    link.style.linkStyle = _.cloneDeep(configs.linkStyle)
                }
                return
            }
            link.status.forEach((d) => {
                if (_.hasIn(configs.comparison.color, d)) {
                    link.style[d] = _.cloneDeep(configs.comparison.color[d])
                }
            })
            if (!Object.values(link.style).length) {
                link.style.linkStyle = _.cloneDeep(configs.linkStyle)
            }
        })
    })
}
export const getGraphLayout = (timeGraphs, sumGraphs, configs) => {
    let { nodes, links } = sumGraphs
    const { eachWidth, eachMargin, leftMargin, eachHeight } = configs.time.timeLine
        ? configs.time.timeLine
        : configs
    const layoutNodes = Object.fromEntries(nodes.map((d) => [d.id, d]))
    const layoutLinks = Object.fromEntries(links.map((d) => [d.id, d]))
    // let t = _.cloneDeep(timeGraphs)
    let timeGraphsValues = Object.values(timeGraphs)
    const l = timeGraphsValues.length
    let newNodes = {}
    timeGraphsValues.forEach((graph) => {
        Object.values(graph.nodes).forEach((node) => {
            assign(node, layoutNodes[node.id])
            if (configs.time.timeLine && configs.time.timeLine.element != 'link') {
                //不是针对link
                const old = node.x
                node.x += node.timeIndex * (eachWidth + eachMargin)
                if (node.type === 'time' && _.hasIn(configs.time.insert, 'position')) {
                    node.x = node.timeIndex * (eachWidth + eachMargin) + eachWidth / 2
                    node.y = eachHeight + configs.time.insert.bottomMargin
                }
                if (configs.time.timeLine.element === 'node') {
                    node.x += leftMargin
                }
            } else {
                if (configs.time.timeLine && configs.time.timeLine.element == 'link') {
                    const x = node.x + node.timeIndex * (eachWidth + eachMargin) + leftMargin
                    const y = node.y
                    const timeId = node.timeId
                    const id = node.id
                    newNodes[node.timeId] = { timeId, x, y, id }
                }
            }
        })
    })
    timeGraphsValues.forEach((graph) => {
        Object.values(graph.links).forEach((link) => {
            assign(link, layoutLinks[link.id])
            if (configs.time.timeLine && configs.time.timeLine.element == 'link') {
                let source = newNodes[link.sourceTimeId]
                link.source = { ...source }
                let target = newNodes[link.targetTimeId]
                link.target = { ...target }
            } else if (configs.time.timeLine && configs.time.timeLine.element == 'all') {
                link.source = graph.nodes[link.source.id]
                link.target = graph.nodes[link.target.id]
            }
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
}
