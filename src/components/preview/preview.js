import React, { useEffect, useState, useRef } from 'react'
import Graph from './graph'
import { dealData } from '../../util/preview.js'
import TimePositionDnet from '../dnetCharts/timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../dnetCharts/timeAnimationDnet/timeAnimationDnet.js'
import TimeChartDnet from '../dnetCharts/timeChartDnet/timeChartDnet.js'
import ComparisonPositionDnet from '../dnetCharts/comparisonPositionDnet/comparisonPositionDnet.js'
import ComparisonAnimationDnet from '../dnetCharts/comparisonAnimationDnet/comparisonAnimationDnet.js'
import dnetv from './dnetv'

export default function Preview(props) {
    // 要计算
    const [width, setWidth] = useState(props.config.width)
    const [height, setHeight] = useState(props.config.height)
    const [subGraphs, setSubGraphs] = useState([])
    const [sumGraphs, setSumGraphs] = useState({})
    const [renderType, setRenderType] = useState(
        `${props.relationOptions.taskType}-${props.encodingOptions.encodingType[0]}`
    )

    // 数据更新时重新计算
    useEffect(() => {
        if (props.encodingOptions.encodingType.indexOf('position') != -1) {
            setWidth(props.config.eachWidth)
            setHeight(props.config.eachHeight)
        } else {
            setWidth(props.config.width)
            setHeight(props.config.height)
        }
    }, [props.config, props.encodingOptions.encodingType])

    useEffect(() => {
        if (props.jsonfile.graphs) {
            let data = dnetv()
            console.log("props.jsonfile.graphs", props.jsonfile.graphs)
            data.initData(props.jsonfile.graphs, { width, height })
            console.log(data.timeGraphs)
            // const d = dealData(props.jsonfile.graphs, width, height)
            setSubGraphs(Object.values(data.timeGraphs))
            // setSubGraphs(data.subGraphs)
            // setSumGraphs(data.sumGraphs)
            console.log("-----setSubGraphs----", subGraphs)
        }
    }, [width, height, props.jsonfile.graphs])

    useEffect(() => {
        if (props.jsonfile.graphs) {
            setRenderType(
                `${props.relationOptions.taskType}-${props.encodingOptions.encodingType[0]}`
            )
        } else {
            setRenderType('')
        }
    }, [
        props.relationOptions.taskType,
        props.encodingOptions.encodingType[0],
        props.jsonfile.graphs
    ])
    return (
        <div className="preview-box">
            <div className="sub-title">
                &nbsp;Preview
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-play"></use>
                </svg>
            </div>
            {(() => {
                switch (renderType) {
                    case 'Time-position':
                        return (
                            <TimePositionDnet
                                data={subGraphs}
                                comparisonOptions={props.relationOptions}
                                width={width}
                                height={height}
                                margin={props.config.eachMargin}
                            />
                        )
                    case 'Time-animation':
                        return (
                            <TimeAnimationDnet
                                data={subGraphs}
                                comparisonOptions={props.relationOptions}
                                width={width}
                                speed={props.encodingOptions.animation.speed}
                                height={height}
                                margin={props.config.eachMargin}
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
            <Graph
                jsonfile={props.jsonfile}
                encodingOptions={props.encodingOptions}
                relationOptions={props.relationOptions}
            />
        </div>
    )
}
