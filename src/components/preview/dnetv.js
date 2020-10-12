import * as d3 from "d3"
import { NetV } from "./NetV"
const defaultConfig = {
    width: 1000,
    height: 750,
    padding: 50,
    eachWidth: 400,
    eachHeight: 400,
}
const dealLayout = (data, config) => {
    let nodes = []
    let links = []
    const { eachWidth, eachHeight } = config
    let nodesSet = new Set()
    let linksSet = new Set()
    data.forEach((graph) => {
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
    const simulation = d3
        .forceSimulation(nodes)
        .force(
            "link",
            d3.forceLink(links).id((d) => d.id)
        )
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(eachWidth / 2, eachWidth / 2))
        .tick(10)
    return { graphPos: { nodes, links }, simulation }
}
const assignPos = (data, graphPos, config) => {
    let idPos = {}
    graphPos.nodes.forEach((node) => {
        idPos[node.id] = node
    })

    // 每一个time下每个点的位置,同时新建图，每个node在不同时间下id不一样
    let sumGraph = { nodes: [], links: [] }
    data.forEach((graph, index) => {
        graph.nodes = graph.nodes.map((node) => {
            const id = `${node.id}+${index}`
            const x =
                idPos[node.id].x +
                index * config.eachWidth +
                (index + 1) * config.padding
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
const draw = (graph, container, config) => {
    const g = new NetV({
        container: document.getElementById("graph"),
        width: config.width,
        height: config.height,
    })
    // graph.links = graph.links.map((link) => {
    //     return { source: link.source.id, target: link.target.id }
    // })
    let newGraph = JSON.parse(JSON.stringify(graph))
    console.log(newGraph)
    g.data(newGraph)
    g.draw()
}
const dealTimeEncode = (groups, data, config) => {}
const DNetV = (config, container) => {
    Object.assign(config, defaultConfig)
    const { data } = config
    let { graphPos, simulation } = dealLayout(data, config)
    dealTimeEncode(config.timeEncode, data, config)
    simulation.on("end", () => {
        let sumGraph = assignPos(data, graphPos, config)
        draw(sumGraph, container, config)
    })
}

export default DNetV
