import React from 'react'
import PieNodeItem from '../../pieNodeItem/pieNodeItem.js'
import DividedLinkItem from '../../dividedLinkItem/dividedLinkItem.js'
import { getPiePathColor } from '../../../util/dnetChart.js'

export default function TimeColorDnet(props) {
    if (props.len === 0) return null
    let colorScale = getPiePathColor(props.len,'red', 'green')
    // let colorScale = getPiePathColor(props.len)
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimePositionDnet graph"
        >
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
