import React from 'react'
import NodeItemContainer from '../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../linkContainer/linkContainer.js'
import Motion from '../motion/Motion'

// import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeLinkGraph(props) {
    const { data, width, height, margin } = props
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
                    {data.links.map((v, i) => {
                        return (
                            <Motion
                                duration={1500}
                                key={`${i}_${v.timeId}_motion`}
                                style={{
                                    opacity: 1
                                }}
                            >
                                {({ opacity }) => (
                                    <LinkContainer
                                        {...props}
                                        {...v}
                                        opacity={opacity}
                                        key={`link-${v.timeId}`}
                                    />
                                )}
                            </Motion>
                        )
                    })}
                </g>
                <g>
                    {data.nodes.map((v,i) => {
                        return (
                            <Motion
                                duration={1500}
                                key={`${i}_${v.timeId}_motion`}
                                style={{
                                    opacity: 1
                                }}
                            >
                                {({ opacity }) => (
                                    <NodeItemContainer 
                                        {...props} 
                                        {...v} 
                                        opacity={opacity}
                                        key={`node-${v.timeId}`} />
                                )}
                            </Motion>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
