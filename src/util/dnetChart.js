import * as d3 from 'd3'

export function getDividedOptions(props, status) {
    const firstOption = {
        ...props,
        ...props.style[status[0]]
        // comparisonOptions: ''
    }
    const secondOption = {
        ...props,
        ...props.style[status[1]]
        // comparisonOptions: ''
    }
    const middleX = (props.source.x + props.target.x) / 2
    const middleY = (props.source.y + props.target.y) / 2
    firstOption.target = {
        ...firstOption.target,
        x: middleX,
        y: middleY
    }
    secondOption.source = {
        ...secondOption.source,
        x: middleX,
        y: middleY
    }
    return { firstOption, secondOption }
}

export function getPiePathData(radius, len) {
    const dataset = new Array(len).fill(1)

    //新建一个饼状图
    var pie = d3.pie()

    //新建一个弧形生成器
    var arc_generator = d3.arc().innerRadius(0).outerRadius(radius)

    //利用饼状图生成器转换数据
    var pieData = pie(dataset)
    //控制台，打印pieData
    const pathData = pieData.map((v) => arc_generator(v))
    return pathData
}

export function getPiePathColor(len, startColor, endColor) {
    //设置颜色比例尺
    let colorScale
    if (!startColor || !endColor) {
        colorScale = d3.scaleOrdinal().domain(d3.range(len)).range(d3.schemeCategory10)
    } else {
        // console.log("d3.range(len)", d3.range(len))
        colorScale = d3
            .scaleLinear()
            .domain([0, len - 1])
            .range([startColor, endColor])
    }
    return colorScale
}

export function getLineData(len, data) {
    const lineData = []
    let lastStart = {
        x: data.source.x,
        y: data.source.y
    }
    let xStep = (data.target.x - data.source.x) / len
    let yStep = (data.target.y - data.source.y) / len

    let i = 0
    while (i < len) {
        const newStart = {
            x: lastStart.x + xStep,
            y: lastStart.y + yStep
        }
        lineData.push({
            source: lastStart,
            target: newStart
        })
        lastStart = newStart
        i++
    }
    return lineData
}

export function getArcPathData(y1, y2) {
    const r = Math.abs(y2 - y1) / 2
    return `M 0,${y1}A${r},${r} 0,0,1 0,${y2}`
}

export function getDividedArcPathData(y1, y2) {
    const r = (y2 - y1) / 2
    const firstData = `M 0,${y1}A${1.41 * r},${1.41 * r} 0,0,1 ${0.41 * r},${y1 + r}`
    const secondData = `M ${0.41 * r},${y1 + r}A${1.41 * r},${1.41 * r} 0,0,1 0,${y2}`
    return { firstData, secondData }
}

export function getLinkPathData(data, xDistance, yDistance, margin, nodeNum) {
    const colorScale = d3.scaleOrdinal().domain(d3.range(nodeNum)).range(d3.schemeCategory10)
    let node2PathData = {}
    let nodeIndex = 0
    data.forEach((dataItem, frameIndex) => {
        dataItem.nodes.forEach((v, j) => {
            let coord = {
                x: margin + frameIndex * xDistance,
                y: margin + j * yDistance
            }
            if (!node2PathData[v.id]) {
                node2PathData[v.id] = {
                    id: v.id,
                    lastFrame: frameIndex,
                    lastData: [coord],
                    data: [],
                    color: colorScale(nodeIndex++)
                }
            } else {
                if (frameIndex === node2PathData[v.id].lastFrame + 1) {
                    // 表示是连续存在
                    node2PathData[v.id].lastData.push(coord)
                } else {
                    // 表示已经断开，重启一组数组
                    node2PathData[v.id].data.push(node2PathData[v.id].lastData)
                    node2PathData[v.id].lastData = [coord]
                }
                node2PathData[v.id].lastFrame = frameIndex
            }
        })
    })
    console.log('node2PathData', node2PathData)
    var link = d3
        .linkHorizontal()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return d.y
        })
    const linkPathData = Object.keys(node2PathData).map((v) => {
        node2PathData[v].data.push(node2PathData[v].lastData)
        const curveData = []
        node2PathData[v].data.forEach((dataItem) => {
            if (dataItem.length > 1) {
                for (let i = 1; i < dataItem.length; i++) {
                    curveData.push(
                        link({
                            source: dataItem[i - 1],
                            target: dataItem[i]
                        })
                    )
                }
            }
        })
        return {
            id: v,
            data: curveData,
            color: node2PathData[v].color
        }
    })
    return linkPathData
}
