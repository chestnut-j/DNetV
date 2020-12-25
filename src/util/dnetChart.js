import * as d3 from 'd3'
import { configs } from 'eslint-plugin-prettier'
import { SwatchesPicker } from 'react-color'

const TIME_CONFIG = ['position', 'animation', 'color', 'markLine']

const LAYOUT_CONFIG = ['offLine', 'vertical']

export const defaultConfigs = {
    layout: {
        chooseTypes: 'offLine',
        vertical: {
            yDistance: 40
        }
    },
    time: {
        animation: {
            speed: 800
        },
        markingLine: {
            strokeColor: '#FD8F8F',
            strokeWidth: 1,
            strokeDasharray: '5,5'
        },
        position: {
            positionFlag: 1,
            eachMargin: 5,
            eachWidth: 200,
            eachHeight: 200
        }
    },
    comparison: {
        chooseTypes: 'stable-Node',
        appearNode: {
            shape: 'circle',
            fillColor: '#FD8F8F',
            strokeColor: '#000000',
            strokeWidth: 1,
            strokeType: 'solid',
            textColor: 'white',
            radius: 6
        },
        stableNode: {
            shape: 'circle',
            fillColor: '#DAD5D5',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 6,
            strokeType: 'solid',
            textColor: 'white'
        },
        disappearNode: {
            shape: 'circle',
            fillColor: '#90B5FB',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 6,
            strokeType: 'solid',
            textColor: 'white'
        },
        appearLink: {
            strokeColor: '#FD8F8F',
            strokeType: 'solid',
            strokeWidth: 2
        },
        stableLink: {
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2
        },
        disappearLink: {
            strokeColor: '#90B5FB',
            strokeType: 'solid',
            strokeWidth: 2
        }
    },
    basic: {
        width: 200,
        height: 300,
        margin: 10,
        nodeStyle: {
            shape: 'circle',
            fillColor: '#DAD5D5',
            strokeColor: '#000000',
            strokeWidth: 1,
            radius: 6,
            strokeType: 'solid',
            textColor: 'white'
        },
        linkStyle: {
            shape: 'curve',
            strokeColor: '#908F8F',
            strokeType: 'solid',
            strokeWidth: 2
        }
    }
}

export const timeEncodingOrder = {
    position: 0,
    animation: 1,
    color: 2,
    link: 3
}

export function getRenderType(arr) {
    arr.sort((a, b) => timeEncodingOrder[b] - timeEncodingOrder[a])
    if(arr.length==0){
        return ''
    }else if(arr.indexOf('animation')>-1){
        return 'animation'
    }else if(arr.indexOf('color')>-1){
        return 'color'
    }else{
        return 'other'
    }
}

// 根据输入的参数，和默认的配置，合成最终的配置
// 检验输入的参数，确保基础config没有问题
export function composeConfig(configItem) {
    const config = deepClone(defaultConfigs)
    if (!configItem.time || Object.prototype.toString.call(configItem.time) != '[object Array]') {
        config.time.chooseTypes = ['position']
    } else {
        config.time.chooseTypes = configItem.time.filter((item) => TIME_CONFIG.indexOf(item) > -1)
    }
    config.comparison.isOn = configItem.comparison ? true : false
    config.layout.chooseTypes =
        LAYOUT_CONFIG.indexOf(configItem.layout) > -1 ? configItem.layout : 'offLine'
    if (Object.prototype.toString.call(configItem.coverConfig) === '[object Object]') {
        coverConfig(config, configItem.coverConfig)
    }
    return config
}

export function deepClone(Obj) {
    var buf
    if (Obj instanceof Array) {
        buf = [] //创建一个空的数组
        var i = Obj.length
        while (i--) {
            buf[i] = deepClone(Obj[i])
        }
        return buf
    } else if (Obj instanceof Object) {
        buf = {} //创建一个空对象
        for (var k in Obj) {
            //为这个对象添加新的属性
            buf[k] = deepClone(Obj[k])
        }
        return buf
    } else {
        return Obj
    }
}

export function coverConfig(originConfig, newConfig) {
    if (Object.prototype.toString.call(newConfig) === '[object Array]') {
        for (let i = 0; i < newConfig.length; i++) {
            if (typeof newConfig[i] !== 'object') {
                originConfig[i] = newConfig[i]
            } else if (
                Object.prototype.toString.call(newConfig[i]) === '[object Array]' &&
                Object.prototype.toString.call(originConfig[i]) === '[object Array]'
            ) {
                coverConfig(originConfig[i], newConfig[i])
            } else if (
                Object.prototype.toString.call(newConfig[i]) === '[object Object]' &&
                Object.prototype.toString.call(originConfig[i]) === '[object Object]'
            ) {
                coverConfig(originConfig[i], newConfig[i])
            }
        }
    } else if (Object.prototype.toString.call(newConfig) === '[object Object]') {
        for (let key in newConfig) {
            if (typeof newConfig[key] !== 'object') {
                // 直接覆盖
                originConfig[key] = newConfig[key]
            } else if (
                Object.prototype.toString.call(newConfig[key]) === '[object Array]' &&
                Object.prototype.toString.call(originConfig[key]) === '[object Array]'
            ) {
                // 递归覆盖
                coverConfig(originConfig[key], newConfig[key])
            } else if (
                Object.prototype.toString.call(newConfig[key]) === '[object Object]' &&
                Object.prototype.toString.call(originConfig[key]) === '[object Object]'
            ) {
                // 递归覆盖
                coverConfig(originConfig[key], newConfig[key])
            }
        }
    }
}

export function getDividedOptions(props, status) {
    const firstOption = {
        ...props,
        ...props.comparisonOptions[status[0]],
        comparisonOptions: ''
    }
    const secondOption = {
        ...props,
        ...props.comparisonOptions[status[1]],
        comparisonOptions: ''
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

export function getDividedArcPathData(source, target) {
    let newSource, newTarget
    // source在上，target在下
    if (source.y > target.y) {
        newSource = target
        newTarget = source
    } else {
        newSource = source
        newTarget = target
    }
    const x1 = newSource.x
    const y1 = newSource.y
    const x2 = newTarget.x
    const y2 = newTarget.y
    const flag = x1 < x2 ? 1 : -1
    const flag2 = x1 < x2 ? 1 : 0
    const r = (Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2)) * Math.sqrt(2)) / 2
    let mx = (x1 + x2) / 2 + flag * (1 - Math.sqrt(2) / 2) * r * (y2 - y1)/ (Math.sqrt(2) * r)
    let my = (y1 + y2) / 2 + flag * (1 - Math.sqrt(2) / 2) * r * (x1 - x2) / (Math.sqrt(2) * r)
    const firstData = `M ${x1},${y1}A${r},${r} 0,0,${flag2} ${mx},${my}`
    const secondData = `M ${mx},${my}A${r},${r} 0,0,${flag2} ${x2},${y2}`
    return { firstData, secondData }
}

export function getLinkPathData(markLine, nodeNum) {
    const colorScale = d3.scaleOrdinal().domain(d3.range(nodeNum)).range(d3.schemeCategory10)
    // console.log('node2PathData', node2PathData)
    var link = d3
        .linkHorizontal()
        .x(function (d) {
            return d.x
        })
        .y(function (d) {
            return d.y
        })
    const linkPathData = Object.keys(markLine).map((markId, index) => {
        const curveData = []
        markLine[markId].forEach((markLineItem) => {
            curveData.push(link(markLineItem))
        })
        return {
            id: markId,
            data: curveData,
            color: colorScale[index]
        }
    })
    return linkPathData
}

/*
export function getLinkPathData2(data, xDistance, yDistance, margin, nodeNum) {
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

*/
