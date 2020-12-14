import React from 'react'
import NodeItem from '../../nodeItem/nodeItem.js'
import LinkItem from '../../linkItem/linkItem.js'

export default function TimePositionDnet(props) {
    const { data, height, width, margin, comparisonOptions } = props
    const len = data.length
    if (len === 0) return null
    console.log('TimePositionDnet----props', props)
    return (
        <div 
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto',
            }}
            className="TimePositionDnet">
            <svg
                className="nlg-container-svg"
                width={`${width * len + margin * (len - 1)}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width * len + margin * (len - 1)} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                {data.map((dataItem, index) => {
                    return (
                        <g key={`subGraph-${index}`} transform={`translate(${index * width + index * margin},0)`}>
                            <g>
                                {dataItem.links.map((v) => {
                                    return (
                                        <LinkItem
                                            {...comparisonOptions[v.status ? `${v.status}Link` : 'stableLink']}
                                            {...v}
                                            key={`link-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v) => {
                                    return (
                                        <NodeItem
                                            {...comparisonOptions[v.status ? `${v.status}Node` : 'stableNode']}
                                            {...v}
                                            key={`node-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
