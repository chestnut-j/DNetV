import * as d3 from 'd3'

export function getDividedOptions(props) {
    const firstOption = {
        ...props,
        ...props.comparisonOptions[props.status[0]],
        comparisonOptions: ''
    }
    const secondOption = {
        ...props,
        ...props.comparisonOptions[props.status[1]],
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
    if (!startColor||!endColor) {
        colorScale = d3.scaleOrdinal()
            .domain(d3.range(len))
            .range(d3.schemeCategory10)
    }else{
        // console.log("d3.range(len)", d3.range(len))
        colorScale = d3.scaleLinear()
        .domain([0, len-1])
        .range([startColor, endColor])
    }
    return colorScale
}

export function getLineData(len, data){
    const lineData = []
    let lastStart = {
      x: data.source.x,
      y: data.source.y
    }
    let xStep = (data.target.x - data.source.x)/len
    let yStep = (data.target.y - data.source.y)/len

    let i = 0
    while(i<len){
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