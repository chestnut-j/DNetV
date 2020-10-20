import * as d3 from "d3"
import { NetV } from "./NetV"

class DNetV {
    constructor(config, container) {
        const defaultConfig = {
            width: 1000,
            height: 750,
            padding: 50,
            eachWidth: 200,
            eachHeight: 200,
        }
        Object.assign(config, defaultConfig)
        this.config = config
        this.oldGraphs = config.graphs
        this.container = container
        this.times = Array.from(this.config.graphs.keys())
        this.initGraph()
        this.initGraphSets()
        this.layout()
        this.draw()
        this.compareEncode()

        // this.dealTimeEncode(config.timeEncode, data, config)
    }
    compareEncode() {
        const { time, keyTime, encode } = this.config.compareEncode
        this.graphCompare = this.compareData(this.graphs, time, keyTime, encode)
    }
    initGraphSets() {
        this.nodeSets = new Set()
        this.linkSets = new Set()
        this.graphSets = this.graphs.map((graph) => {
            const nodes = new Set(graph.nodes.map((node) => node.id))
            const links = new Set(graph.links.map((link) => link.id))
            this.nodeSet = this.union(this.nodeSet, nodes)
            this.linkSet = this.union(this.linkSet, links)
            return { nodes, links }
        })
    }
    initGraph() {
        this.graphs = this.oldGraphs.map((graph, time) => {
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
    compareData(graph, Times, keyTime) {
        const dealCompare = (compareGraph, graph) => {
            const appearNodes = this.difference(graph.nodes, compareGraph.nodes)
            const disAppearNodes = this.difference(
                compareGraph.nodes,
                graph.nodes
            )
            const appearLinks = this.difference(graph.links, compareGraph.links)
            const disAppearLinks = this.difference(
                compareGraph.links,
                graph.links
            )
            const appearGraph = { appearNodes, appearLinks }
            const disAppearGraph = { disAppearNodes, disAppearLinks }
            return { appearGraph, disAppearGraph }
        }
        // const graphSet = new Set(graph)
        let graphCompare = []
        const newGraphSets = Times.map((time) => {
            return this.graphSets[time]
        })
        if (keyTime === "last") {
            graphCompare = newGraphSets.map((graph, index) => {
                if (index === 0) return null
                const compareGraph = newGraphSets[index - 1]
                return dealCompare(graph, compareGraph)
            })
        } else {
            if ((keyTime = "next")) {
                graphCompare = newGraphSets.map((graph, index) => {
                    if (index === newGraphSets.length - 1) return null
                    const compareGraph = newGraphSets[index + 1]
                    return dealCompare(graph, compareGraph)
                })
            } else {
                const graph = this.graphSets[keyTime]
                graphCompare = newGraphSets.map((compareGraph, index) => {
                    return dealCompare(compareGraph, graph)
                })
            }
        }
        // console.log(keyTime)
        // graphCompare.forEach((graph) => {
        //     if (graph)
        //         console.log(
        //             graph.appearGraph.appearNodes,
        //             graph.appearGraph.appearLinks,
        //             graph.disAppearGraph.disAppearNodes,
        //             graph.disAppearGraph.disAppearLinks
        //         )
        // })
        return graphCompare
    }
    layout() {
        let graphPos = this.dealLayout()
        // await this.end(simulation)
        this.graphPos = this.assignPos(graphPos)
        return this.graphPos
    }
    dealLayout() {
        let nodes = []
        let links = []
        const { eachWidth, eachHeight } = this.config
        let nodesSet = new Set()
        let linksSet = new Set()
        this.graphs.forEach((graph, i) => {
            graph.nodes.forEach((node) => {
                nodesSet.add(node.id)
            })
            graph.links.forEach((link, j) => {
                let { source, target } = link
                if (links.source < links.target) {
                    source = link.target
                    target = links.source
                }
                const id = `${source}-${target}`
                linksSet.add(id)
                this.graphs[i].links[j].id = id
            })
        })
        nodesSet.forEach((id) => {
            nodes.push({ id })
        })
        linksSet.forEach((link) => {
            const s = link.split("-")
            const source = s[0]
            const target = s[1]
            links.push({ source, target })
        })
        // console.log("nodes: ", nodes.length)
        // console.log("links: ", links.length)
        d3.forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.id)
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(eachWidth / 2, eachWidth / 2))
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
                return { id, x, y }
            })
            const links = graph.links.map((link) => {
                const source = `${link.source}+${index}`
                const target = `${link.target}+${index}`
                return { source, target }
            })
            sumGraph.nodes = sumGraph.nodes.concat(nodes)
            sumGraph.links = sumGraph.links.concat(links)
        })
        return sumGraph
    }
    draw() {
        const g = new NetV({
            container: this.container,
            width: this.config.width,
            height: this.config.height,
        })
        g.data(this.graphPos)
        g.draw()
    }
    dealTimeEncode(groups, data, config) {}
    end(simulation) {
        return new Promise((resolve) => {
            simulation.on("end", resolve)
        })
    }
    difference(setA, setB) {
        let _difference = new Set(setA)
        for (let elem of setB) {
            _difference.delete(elem)
        }
        return _difference
    }
    union(setA, setB) {
        let _union = new Set(setA)
        for (let elem of setB) {
            _union.add(elem)
        }
        return _union
    }
}

export default (config, container) => {
    if (!config.hasOwnProperty("graphs")) {
        return
    }
    const dnetv = new DNetV(config, container)
    // dnetv.layout()
    // dnetv.draw()
}
