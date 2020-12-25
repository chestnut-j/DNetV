import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import ArcLinkContainer from '../../arcLinkContainer/arcLinkContainer.js'
import { getLinkPathData } from '../../../util/dnetChart.js'

export default function TimeLinkDnet(props) {

    const { data, nodeNum, config, markLine} = props
    const { height, width, margin,nodeStyle, linkStyle} = config.basic
    const {strokeColor, strokeWidth, strokeDasharray} = config.time.markingLine
    const len = data.length
    if (len === 0) return null
    const linkPathData = getLinkPathData(markLine, nodeNum)
    console.log("******--linkPathData--*****", linkPathData)
    console.log("******-----TimeLinkDnet---data--*****", data)
    // return null
    return (
        <div
            style={{
                width: '100%',
                height: '730px',
                overflowX: 'auto',
            }}
            className="TimeLinkDnet"
        >
            <svg
                className="tld-container-svg"
                width={`${width}px`}
                height={`${height}px`}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                {
                  linkPathData.map((links,index)=>{
                    return (
                      <g key ={`curve-g-${index}`}>
                        {
                          links.data.map((v,index)=>{
                            return (
                              <path
                                d={v}
                                fill={'none'}
                                stroke={strokeColor}
                                strokeWidth={`${strokeWidth}px`}
                                strokeDasharray={strokeDasharray}
                                key = {`curve-link-${index}`}
                            />
                            )
                          })
                        }
                      </g>
                    )
                  })
                }
                
                </g>
                {data.map((dataItem, index) => {
                    return (
                        <g
                            key={`subGraph-${index}`}
                        >
                            <g>
                                {dataItem.links.map(v => {
                                    return (
                                        <ArcLinkContainer 
                                            comparisonOptions = {config.comparison}
                                            linkStyle={linkStyle}
                                            {...v}
                                            key={`link-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v, index) => {
                                    return (
                                        <NodeItemContainer
                                            comparisonOptions = {config.comparison}
                                            nodeStyle={nodeStyle}
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
