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
import { getRenderType } from '../../util/dnetChart'

export default function Preview(props) {
    // 要计算
    const [width, setWidth] = useState(props.config.basic.width)
    const [height, setHeight] = useState(props.config.basic.height)
    const [subGraphs, setSubGraphs] = useState([])
    const [sumGraphs, setSumGraphs] = useState({ nodes: [], links: [] })
    const [markLine, setMarkLine] = useState({})
    const [renderType, setRenderType] = useState('')

    // 数据更新时重新计算
    useEffect(() => {
        setWidth(props.config.basic.width)
    }, [props.config.basic.width])

    useEffect(() => {
        setWidth(props.config.basic.height)
    }, [props.config.basic.height])

    useEffect(() => {
        if (props.data) {
            let dnetvInstance = dnetv()
            dnetvInstance.initData(props.data, props.config)
            console.log("---dnetvInstance---",dnetvInstance)
            setSubGraphs(converObject2Array(dnetvInstance.timeGraphs))
            setMarkLine(dnetvInstance.markingLine)
            setSumGraphs(dnetvInstance.sumGraphs)
        }
    }, [props.config, props.data])

    useEffect(() => {
        if (props.data) {
            setRenderType(getRenderType(props.config.time.chooseTypes))
        } else {
            setRenderType('')
        }
    }, [props.data, props.config.time.chooseTypes])
    // console.log("data.sumGraphs",sumGraphs)
    // console.log("subgraphs", subGraphs)
    console.log('----renderType---------', renderType)
    console.log("--subGraphs--", subGraphs)
    const tempRenderType = 'position'
    // return (
    //     <div
    //         style={{
    //             width: `${props.width ? props.width : 1010}px`,
    //             height: `${props.height ? props.height : 760}px`
    //         }}
    //         className="preview-box"
    //     >

    //     </div>
    // )
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
                switch (tempRenderType) {
                    case 'position':
                        return (
                            <TimePositionDnet
                                data={subGraphs}
                                config={props.config}
                            />
                        )
                    case 'animation':
                        return (
                            <TimeAnimationDnet
                                data={subGraphs}
                                config={props.config}
                            />
                        )
                    case 'color':
                        return (
                            <TimeColorDnet
                                len={subGraphs.length}
                                data={sumGraphs}
                                config={props.config}
                            />
                        )
                    case 'link':
                        return (
                            <TimeLinkDnet
                                data={subGraphs}
                                config={props.config}
                                markLine={markLine}
                                // nodeNum={sumGraphs.nodes.length}
                                // comparisonOptions={props.config}
                                // width={width}
                                // height={height}
                                // margin={props.config.eachMargin}
                                // xDistance={props.config.xDistance}
                                // yDistance={props.config.yDistance}
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
