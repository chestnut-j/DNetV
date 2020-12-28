import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import LinkContainer from '../../linkContainer/linkContainer.js'

export default function TimePositionDnet(props) {
    const { data, config, markLine } = props
    const { height, width, margin, nodeStyle, linkStyle } = config
    const comparisonOptions = config.comparison
    const len = data.length
    if (len === 0) return null
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto'
            }}
            className="TimePositionDnet"
        >
            <svg
                className="nlg-container-svg"
                width={`${width * len + margin * (len - 1)}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width * len + margin * (len - 1)} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {markLine
                        ? markLine.map((links, index) => {
                              return (
                                  <g key={`curve-g-${index}`}>
                                      {links.data.map((v, index) => {
                                          return (
                                              <path
                                                  d={v}
                                                  //   fill={'black'}
                                                  stroke={props.config.time.markLine.strokeColor}
                                                  strokeWidth={`${props.config.time.markLine.strokeWidth}px`}
                                                  strokeDasharray={
                                                      props.config.time.markLine.strokeDasharray
                                                  }
                                                  key={`curve-link-${index}`}
                                              />
                                          )
                                      })}
                                  </g>
                              )
                          })
                        : 1}
                </g>
                {data.map((dataItem, index) => {
                    return (
                        <g
                            key={`subGraph-${index}`}
                            // transform={`translate(${index * width + index * margin},0)`}
                        >
                            <g>
                                {dataItem.links.map((v) => {
                                    return (
                                        <LinkContainer
                                            {...props}
                                            // comparisonOptions={comparisonOptions}
                                            // linkStyle={linkStyle}
                                            {...v}
                                            key={`link-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v) => {
                                    return (
                                        <NodeItemContainer
                                            {...props}
                                            // comparisonOptions={comparisonOptions}
                                            // nodeStyle={nodeStyle}
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
