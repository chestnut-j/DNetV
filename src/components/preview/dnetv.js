// import { link, NetV } from './NetV'
import * as u from './util/dealfun'
class DNetV {
    constructor() {
        this.elementsName = []
        this.nodeSet = new Set()
        this.linkSets = new Set()
        this.timeGraphs = {}
        this.timeGraphSet = {}
        // this.layout()
        // this.compareEncode()
        // this.draw()
        // this.dealTimeEncode(config.timeEncode, data, config)
    }
    initData(data, config) {
        this.elementsName = ['nodes', 'links'] //元素：点、边
        this.times = new Set(data.map((d) => d.time)) //时间：key值
        // Object.assign(config, defaultConfig)
        this.config = config
        this.oldData = data
        let { timeGraphs, nodeSet, linkSet, timeGraphSet } = u.getTimeId(data)
        this.timeGraphs = timeGraphs
        this.timeGraphSet = timeGraphSet
        this.nodeSet = nodeSet
        this.linkSet = linkSet
        this.timeGraphs = u.getGraphLayout(
            this.timeGraphs,
            nodeSet,
            linkSet,
            this.config.width,
            this.config.height
        ) //函数里面直接改了timeGraphs

        // this.graphCompare = this.times.map((time) => {
        //     return null
        // })
        // this.initGraph()
        // this.initGraphSets()
        this.dealCompareData([{ times: 'all', nodes: 'all', links: 'all', keyTime: 'next' }]) //函数里面直接改了timeGraphs
    }
    dealCompareData(configs) {
        configs.forEach((d) => {
            const { times, nodes, links, keyTime } = d
            const timeSet = times === 'all' ? this.times : new Set(times)
            const nodeSet = nodes === 'all' ? this.nodeSet : new Set(nodes)
            const linkSet = links === 'all' ? this.linkSet : new Set(links)
            let timeGraphSet = {}
            Object.keys(this.timeGraphSet).forEach((time) => {
                if (timeSet.has(time)) {
                    timeGraphSet[time] = this.timeGraphSet[time]
                }
            })
            u.getCompareData(timeGraphSet, nodeSet, linkSet, keyTime, this.timeGraphs) //函数里面直接改了timeGraphs
        })
    }
    // dealTimeEncode(groups, data, config) {}
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
