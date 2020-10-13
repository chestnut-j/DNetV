import * as d3 from "d3"
import { NetV } from "./NetV"

class DNetV {
    constructor(config, container) {
        const defaultConfig = {
            width: 1000,
            height: 750,
            padding: 50,
            eachWidth: 400,
            eachHeight: 400,
        }
        Object.assign(config, defaultConfig)
        this.config = config
        this.data = config.data
        this.container = container
        // this.dealTimeEncode(config.timeEncode, data, config)
    }
    layout = () => {
        let graphPos = this.dealLayout()
        // await this.end(simulation)
        this.graphPos = this.assignPos(graphPos)
        return this.graphPos
    }
    dealLayout = () => {
        let nodes = []
        let links = []
        const { eachWidth, eachHeight } = this.config
        let nodesSet = new Set()
        let linksSet = new Set()
        this.data.forEach((graph) => {
            graph.nodes.forEach((node) => {
                nodesSet.add(node.id)
            })
            graph.links.forEach((link) => {
                let { source, target } = link
                if (links.source < links.target) {
                    source = link.target
                    target = links.source
                }
                linksSet.add(`${source}-${target}`)
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
        console.log("nodes: ", nodes.length)
        console.log("links: ", links.length)
        let i = 0
        const simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.id)
            )
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(eachWidth / 2, eachWidth / 2))
            .tick(10)
        return { nodes, links }
    }
    assignPos = (graphPos) => {
        let idPos = {}
        graphPos.nodes.forEach((node) => {
            idPos[node.id] = node
        })

        // 每一个time下每个点的位置,同时新建图，每个node在不同时间下id不一样
        let sumGraph = { nodes: [], links: [] }
        this.data.forEach((graph, index) => {
            graph.nodes = graph.nodes.map((node) => {
                const id = `${node.id}+${index}`
                const x =
                    idPos[node.id].x +
                    index * this.config.eachWidth +
                    (index + 1) * this.config.padding
                const y = idPos[node.id].y
                return { id, x, y }
            })
            graph.links = graph.links.map((link) => {
                const source = `${link.source}+${index}`
                const target = `${link.target}+${index}`
                return { source, target }
            })
            sumGraph.nodes = sumGraph.nodes.concat(graph.nodes)
            sumGraph.links = sumGraph.links.concat(graph.links)
        })
        return sumGraph
    }
    draw = () => {
        const g = new NetV({
            container: this.container,
            width: this.config.width,
            height: this.config.height,
        })
        g.data(this.graphPos)
        g.draw()
    }
    dealTimeEncode = (groups, data, config) => {}
    end = (simulation) => {
        return new Promise((resolve) => {
            simulation.on("end", resolve)
        })
    }
}

export default (config, container) => {
    const dnetv = new DNetV(config, container)
    dnetv.layout()
    dnetv.draw()
}
