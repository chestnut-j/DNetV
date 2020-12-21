import React, { useEffect, useState, useRef } from 'react'
import { converObject2Array } from '../../util/preview.js'
import TimePositionDnet from '../dnetCharts/timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../dnetCharts/timeAnimationDnet/timeAnimationDnet.js'
import TimeColorDnet from '../dnetCharts/timeColorDnet/timeColorDnet.js'
import TimeChartDnet from '../dnetCharts/timeChartDnet/timeChartDnet.js'
import TimeLinkDnet from '../dnetCharts/timeLinkDnet/timeLinkDnet.js'
import ComparisonPositionDnet from '../dnetCharts/comparisonPositionDnet/comparisonPositionDnet.js'
import ComparisonAnimationDnet from '../dnetCharts/comparisonAnimationDnet/comparisonAnimationDnet.js'
import dnetv from './dnetv'

export default function Preview(props) {
    // 要计算
    const [width, setWidth] = useState(props.config.eachWidth)
    const [height, setHeight] = useState(props.config.eachHeight)
    const [subGraphs, setSubGraphs] = useState([])
    const [sumGraphs, setSumGraphs] = useState({ nodes: [], links: [] })
    const [renderType, setRenderType] = useState(props.config.renderType)

    // 数据更新时重新计算
    useEffect(() => {
        // if (props.config.timeArr.indexOf('position') !== -1) {
        setWidth(props.config.eachWidth)
        setHeight(props.config.eachHeight)
        // } else {
        //     setWidth(props.config.width)
        //     setHeight(props.config.height)
        // }
    }, [props.config, props.config.time])

    useEffect(() => {
        if (props.jsonfile.graphs) {
            let data = dnetv()
            data.initData(props.jsonfile.graphs, props.config)
            setSubGraphs(converObject2Array(data.timeGraphs))
            setSumGraphs(data.sumGraphs)
        }
    }, [width, height, props.jsonfile.graphs])

    useEffect(() => {
        if (props.jsonfile.graphs) {
            setRenderType(props.config.renderType)
        } else {
            setRenderType('')
        }
    }, [props.time, props.config.timeArr, props.jsonfile.graphs])
    // console.log("data.sumGraphs",sumGraphs)
    // console.log("subgraphs", subGraphs)
    console.log('renderType---------', renderType)
    return (
        <div
            style={{
                width: `${props.width ? props.width : 1010}px`,
                height: `${props.height ? props.height : 760}px`
            }}
            className="preview-box"
        >
            <div className="sub-title">
                &nbsp;Preview
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play"></use>
                </svg>
            </div>
            {(() => {
                switch (renderType) {
                    case 'position':
                        return (
                            <TimePositionDnet
                                data={subGraphs}
                                comparisonOptions={props.config}
                                width={width}
                                height={height}
                                margin={props.config.eachMargin}
                            />
                        )
                    case 'animation':
                        return (
                            <TimeAnimationDnet
                                data={subGraphs}
                                comparisonOptions={props.config}
                                width={width}
                                speed={props.config.animation.speed}
                                height={height}
                                margin={props.config.eachMargin}
                            />
                        )
                    case 'color':
                        return (
                            <TimeColorDnet
                                len={subGraphs.length}
                                data={sumGraphs}
                                comparisonOptions={props.config}
                                width={width}
                                height={height}
                                margin={props.config.eachMargin}
                            />
                        )
                    case 'link':
                        return (
                            <TimeLinkDnet
                                data={subGraphs}
                                nodeNum={sumGraphs.nodes.length}
                                comparisonOptions={props.config}
                                width={width}
                                height={height}
                                margin={props.config.eachMargin}
                                xDistance={props.config.link.xDistance}
                                yDistance={props.config.link.yDistance}
                            />
                        )
                    case 'Time-chart':
                        return <TimeChartDnet />
                    case 'Comparison-position':
                        return <ComparisonPositionDnet />
                    case 'Comparison-animation':
                        return <ComparisonAnimationDnet />
                    default:
                        return null
                }
            })()}
        </div>
    )
}
