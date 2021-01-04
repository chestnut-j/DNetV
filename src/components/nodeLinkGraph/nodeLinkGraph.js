import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../linkContainer/linkContainer.js'

// import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeLinkGraph(props) {
    const { data, width, height, margin} = props
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
                            <LinkContainer
                                {...props}
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
                                {...props}
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
