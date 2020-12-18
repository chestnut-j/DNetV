import React from 'react'
import NodeItemContainer from '../../nodeItemContainer/nodeItemContainer.js'
import ArcLinkContainer from '../../arcLinkContainer/arcLinkContainer.js'
import { getLinkPathData } from '../../../util/dnetChart.js'

export default function TimeLinkDnet(props) {
    const { data, nodeNum, height, width, margin, comparisonOptions, xDistance, yDistance} = props
    const len = data.length
    if (len === 0) return null
    const linkPathData = getLinkPathData(data, xDistance, yDistance, margin, nodeNum)
    // console.log("--linkPathData--", linkPathData)
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
                width={`${xDistance * len + margin * 2}px`}
                height={`${yDistance * nodeNum + margin * 2}px`}
                viewBox={`0 0 ${xDistance * len + margin * 2} ${yDistance * nodeNum + margin * 2}`}
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
                                stroke={links.color}
                                strokeWidth={'1px'}
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
                    const id2Index = {}
                    dataItem.nodes.forEach((v, index) => {
                        id2Index[v.id] = index
                    })
                    return (
                        <g
                            key={`subGraph-${index}`}
                            transform={`translate(${index * xDistance + margin}, ${margin})`}
                        >
                            <g>
                                {dataItem.links.map(v => {
                                    const linkIds = v.id.split('-')
                                    const startY = id2Index[linkIds[1]] * yDistance
                                    const endY = id2Index[linkIds[0]] * yDistance
                                    return (
                                        <ArcLinkContainer 
                                            comparisonOptions = {comparisonOptions}
                                            linkInfo = {v}
                                            startY = {startY}
                                            endY = {endY}
                                            key={`link-${v.timeId}`}
                                        />
                                    )
                                })}
                            </g>
                            <g>
                                {dataItem.nodes.map((v, index) => {
                                    return (
                                        <NodeItemContainer
                                            comparisonOptions = {comparisonOptions}
                                            {...{...v, x:0, y:index*yDistance}}
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
