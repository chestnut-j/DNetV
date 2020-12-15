import React from 'react'
import PieNodeItem from '../../pieNodeItem/pieNodeItem.js'
import DividedLinkItem from '../../dividedLinkItem/dividedLinkItem.js'
import { getPiePathColor } from '../../../util/dnetChart.js'

export default function TimeColorDnet(props) {
    if (props.len === 0) return null
    const legendData = new Array(props.len).fill(0)
    const singleLegendWidth = 15
    let colorScale = getPiePathColor(props.len,'red', 'green')
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimePositionDnet graph"
        >   
            <div
                style={{
                    width: '100%',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: '5px'
                }}
            >
                <div
                    className="legend-text"
                    style={{
                        margin: '0 10px'
                    }}
                >0</div>
                <svg
                    className="legend-svg"
                    width={`${singleLegendWidth*props.len}px`}
                    height={'20px'}
                    viewBox={`0 0 ${singleLegendWidth*props.len} 20`}
                    preserveAspectRatio="xMinYMin"
                >   
                    {legendData.map((dataItem, index) => {
                        return (
                            <rect
                                key={`tc-legend-${index}`}
                                x={index*singleLegendWidth}
                                y={0}
                                fill={colorScale(index)}
                                width={singleLegendWidth}
                                height={singleLegendWidth}
                            ></rect>
                        )
                    })}
                </svg>
                <div
                   style={{
                        margin: '0 10px'
                    }}
                >{props.len-1}</div>
            </div>
            <svg
                className="nlg-container-svg"
                width={`${props.width}px`}
                height={`${props.height}px`}
                viewBox={`0 0 ${props.width} ${props.height}`}
                preserveAspectRatio="xMinYMin"
            >
                {props.data.links.map((dataItem, index) => {
                    return (
                        <DividedLinkItem
                            len={props.len}
                            data={dataItem}
                            existTimeIndex={dataItem.existTimeIndex}
                            colorScale={colorScale}
                            key={`time-color-link-${index}`}
                            {...props.comparisonOptions['stableLink']}
                        />
                    )
                })}
                {props.data.nodes.map((dataItem, index) => {
                    return (
                        <PieNodeItem
                            len={props.len}
                            data={dataItem}
                            existTimeIndex={dataItem.existTimeIndex}
                            colorScale={colorScale}
                            key={`time-color-node-${index}`}
                            {...props.comparisonOptions['stableNode']}
                        />
                    )
                })}
                
            </svg>
        </div>
    )
}
