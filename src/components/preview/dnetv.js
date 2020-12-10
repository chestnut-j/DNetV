import { link, NetV } from './NetV'
import * as u from './util/dealfun'
class DNetV {
    constructor() {
        this.elements = {}
        this.nodeSets = new Set()
        this.linkSets = new Set()
        // this.nodes = []
        // this.links = []
        // this.layout()
        // this.compareEncode()
        // this.draw()
        // this.dealTimeEncode(config.timeEncode, data, config)
    }
    initData(data, config) {
        this.elementsName = ['nodes', 'links'] //元素：点、边
        // this.times = Object.fromEntries(data.map((d) => [d.time, {}])) //时间：key值
        // const defaultConfig = {
        //     width: 1000,
        //     height: 750,
        //     padding: 50,
        //     eachWidth: 200,
        //     eachHeight: 200
        // }
        // Object.assign(config, defaultConfig)
        this.config = config
        this.oldData = data
        let { timeGraphs, nodesSet, linksSet } = u.getTimeId(data)
        this.timeGraphs = timeGraphs
        this.nodesSet = nodesSet
        this.linksSet = linksSet
        this.timeGraphs = u.getGraphLayout(
            this.timeGraphs,
            nodesSet,
            linksSet,
            this.config.width,
            this.config.height
        ) //函数里面直接改了timeGraphs

        // this.graphCompare = this.times.map((time) => {
        //     return null
        // })
        // this.initGraph()
        // this.initGraphSets()
        // this.initComparison()
    }
    initComparison() {
        this.dealCompareData([{ times: 'all', nodes: 'all', links: 'all', keyTime: 'next' }])
    }
    dealCompareData(configs) {
        configs.forEach((d) => {
            const { times, nodes, keyTime } = d
            let timeArr = this.times
            if (times !== 'all') {
                timeArr = times
            }
            let nodeSets = this.nodeSets
            if (nodes !== 'all') {
                nodeSets = new Set(nodes)
            }
            this.compareData(nodeSets, timeArr, keyTime)
        })
    }
    initGraphSets() {
        this.graphSets = this.graphs.map((graph) => {
            const nodes = new Set(graph.nodes.map((node) => node.id))
            const links = new Set(graph.links.map((link) => link.id))
            this.nodeSets = u.union(this.nodeSets, nodes)
            this.linkSets = u.union(this.linkSets, links)
            return { nodes, links }
        })
        this.nodes = [...this.nodeSets]
        this.links = [...this.linkSets]
    }
    initGraph() {
        this.graphs = this.oldData.map((graph, time) => {
            const nodes = graph.nodes.map((node) => {
                return { ...node, time }
            })
            const links = graph.links.map((link) => {
                let id = `${link.source}-${link.target}`
                if (link.source > link.target) {
                    id = `${link.target}-${link.source}`
                }
                return { ...link, time, id }
            })
            return { nodes, links }
        })
    }
    compareData(nodeSets, timesArr, keyTime, encode) {
        const dealCompare = (graph, compareGraph) => {
            const appearNodes = u.intersection(
                u.difference(graph.nodes, compareGraph.nodes),
                nodeSets
            )
            const disappearNodes = u.intersection(
                u.difference(compareGraph.nodes, graph.nodes),
                nodeSets
            )
            const appearLinks = u.difference(graph.links, compareGraph.links)
            const disappearLinks = u.difference(compareGraph.links, graph.links)
            appearLinks.forEach((link) => {
                const arr = link.split('-')
                const source = arr[0]
                const target = arr[1]
                if (!nodeSets.has(source) || !nodeSets.has(target)) {
                    appearLinks.delete(link)
                }
            })
            disappearLinks.forEach((link) => {
                const arr = link.split('-')
                const source = arr[0]
                const target = arr[1]
                if (!nodeSets.has(source) || !nodeSets.has(target)) {
                    disappearLinks.delete(link)
                }
            })
            const appear = { nodes: appearNodes, links: appearLinks }
            const disappear = {
                nodes: disappearNodes,
                links: disappearLinks
            }
            return { appear, disappear }
        }
        let graphCompare = []
        const newGraphSets = timesArr.map((time) => {
            graphCompare.push({})
            return this.graphSets[time]
        })
        if (keyTime === 'last') {
            newGraphSets.forEach((graph, index) => {
                if (index === 0) return null
                // 前一个图
                const compareGraph = newGraphSets[index - 1]
                const { appear, disappear } = dealCompare(graph, compareGraph)
                graphCompare[index].appear = appear
                graphCompare[index - 1].disappear = disappear
            })
        } else {
            if ((keyTime = 'next')) {
                newGraphSets.forEach((graph, index) => {
                    if (index === newGraphSets.length - 1) return null
                    const compareGraph = newGraphSets[index + 1]
                    const { appear, disappear } = dealCompare(graph, compareGraph)
                    graphCompare[index].appear = appear
                    graphCompare[index + 1].disappear = disappear
                })
            } else {
                const graph = this.graphSets[keyTime]
                newGraphSets.forEach((compareGraph, index) => {
                    const { appear, disappear } = dealCompare(graph, compareGraph)
                    graphCompare[index].appear = appear
                    graphCompare[index].disappear = disappear
                })
            }
        }
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
    layout() {
        let graphPos = this.dealLayout()
        // await this.end(simulation)
        console.log('graphPos', graphPos)
        this.graphPos = this.assignPos(graphPos)
        return this.graphPos
    }
    dealLayout() {
        // 将所有图的点和边合并到一起，求出每个点和边的相对布局位置
        let nodes = []
        let links = []
        const { eachWidth, eachHeight } = this.config
        let nodeSets = new Set()
        let linkSets = new Set()
        this.graphs.forEach((graph, i) => {
            graph.nodes.forEach((node) => {
                nodeSets.add(node.id)
            })
            graph.links.forEach((link, j) => {
                let { source, target } = link
                if (links.source < links.target) {
                    source = link.target
                    target = links.source
                }
                const id = `${source}-${target}`
                linkSets.add(id)
                this.graphs[i].links[j].id = id
            })
        })
        nodeSets.forEach((id) => {
            nodes.push({ id })
        })
        linkSets.forEach((link) => {
            const s = link.split('-')
            const source = s[0]
            const target = s[1]
            links.push({ source, target })
        })
        d3.forceSimulation(nodes)
            .force(
                'link',
                d3.forceLink(links).id((d) => d.id)
            )
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(eachWidth / 2, eachWidth / 2))
            .tick(10)
        return { nodes, links }
    }
    assignPos(graphPos) {
        let idPos = {}
        graphPos.nodes.forEach((node) => {
            idPos[node.id] = node
        })

        // 每一个time下每个点的位置,同时新建图，每个node在不同时间下id不一样
        let sumGraph = { nodes: [], links: [] }
        this.graphs.forEach((graph, index) => {
            const nodes = graph.nodes.map((node) => {
                const id = `${node.id}+${index}`
                const x =
                    idPos[node.id].x +
                    index * this.config.eachWidth +
                    (index + 1) * this.config.padding
                const y = idPos[node.id].y
                const time = index
                const originId = node.id
                return { id, x, y, time, originId }
            })
            const links = graph.links.map((link) => {
                const source = `${link.source}+${index}`
                const target = `${link.target}+${index}`
                const time = index
                const originSource = link.source
                const originTarget = link.target
                const originId = `${link.source}-${link.target}`
                return {
                    source,
                    target,
                    time,
                    originId,
                    originSource,
                    originTarget
                }
            })
            sumGraph.nodes = sumGraph.nodes.concat(nodes)
            sumGraph.links = sumGraph.links.concat(links)
        })
        return sumGraph
    }
    draw() {
        const configs = {
            node: {
                r: 5,
                fill: { r: 199 / 255, g: 198 / 255, b: 198 / 255, a: 1 },
                strokeWidth: 1,
                strokeColor: { r: 44 / 255, g: 44 / 255, b: 44 / 255, a: 0.5 }
            },
            link: {
                strokeWidth: 1,
                strokeColor: { r: 44 / 255, g: 44 / 255, b: 44 / 255, a: 0.5 }
            },
            nodeLimit: 1e6,
            linkLimit: 1e6
        }
        const g = new NetV({
            container: this.container,
            width: this.config.width,
            height: this.config.height,
            ...configs
        })
        console.log('this.graphPos', this.graphPos)
        g.data(this.graphPos)
        g.draw()
    }
    dealTimeEncode(groups, data, config) {}
    end(simulation) {
        return new Promise((resolve) => {
            simulation.on('end', resolve)
        })
    }
}

export default () => {
    const dnetv = new DNetV()
    return dnetv
}
