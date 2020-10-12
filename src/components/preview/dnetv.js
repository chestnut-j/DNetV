import * as d3 from d3
const defaultConfig={
    sumWidth : 1000,
    sumHeight : 1000,
    padding:30,
    width : 200,
    height:200
}

class DNetV {
    constructor(config){
        Object.assign(config,defaultConfig)
        const {data} = config
        this.dealLayout(data)
        this.dealTimeEncode(config.timeEncode,data)
    }
    dealLayout = (data)=>{
        let nodes = []
        let links = []
        Object.keys(data).forEach(time=>{
            graph = data[time]
            nodes.concat(graph.nodes)
            links.concat(graph.links)
        })
        const simulation = d3
    .forceSimulation(data.nodes)
    .force(
        'link',
        d3.forceLink(data.links).id((d) => d.id)
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    }
    dealTimeEncode =(groups,data)=>{

    }
}