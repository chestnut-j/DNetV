import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import LinkItemContainer from '../linkItemContainer/linkItemContainer.js'

// import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeLinkGraph(props) {
    const { comparisonOptions, data, width, height, margin,linkStyle, nodeStyle} = props
    return (
        <div
            className="nlg-container"
            style={{
                width: width,
                height: height,
                margin: margin
            }}
        >
            <svg
                className="nlg-container-svg"
                width={`${width}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {data.links.map((v) => {
                        return (
                            <LinkItemContainer
                                comparisonOptions = {comparisonOptions}
                                linkStyle={linkStyle}
                                {...v}
                                key={`link-${v.timeId}`}
                            />
                        )
                    })}
                </g>
                <g>
                    {data.nodes.map((v) => {
                        return (
                            <NodeItemContainer
                                comparisonOptions = {comparisonOptions}
                                nodeStyle={nodeStyle}
                                {...v}
                                key={`node-${v.timeId}`}
                            />
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
