import React from 'react'

import NodeItem from '../nodeItem/nodeItem.js'
import LinkItem from '../linkItem/linkItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'


const defaultConfig = {
    width: 300,
    height: 300,
    margin: 10,
    appearNode: {
        shape: 'circle',
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeType: 'solid',
        textColor: 'white',
        radius: 5
    },
    appearLink: {
        strokeColor: '#000000',
        strokeType: 'solid',
        strokeWidth: 1
    },
    stableNode: {
        shape: 'circle',
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeType: 'solid',
        textColor: 'white',
        radius: 5
    },
    stableLink: {
        strokeColor: '#000000',
        strokeType: 'solid',
        strokeWidth: 1
    },
    disappearNode: {
        shape: 'circle',
        fillColor: '#FFFFFF',
        strokeColor: '#000000',
        strokeWidth: 1,
        strokeType: 'solid',
        textColor: 'white',
        radius: 5
    },
    disappearLink: {
        strokeColor: '#000000',
        strokeType: 'solid',
        strokeWidth: 1
    }
}
const tempData = {
    links: [
        {
            id: '1234-0',
            originId: '1234-1235',
            time: 0,
            source: {
                id: '1234',
                x: 120,
                y: 120
            },
            target: {
                id: '1235',
                x: 10,
                y: 110
            },
            comparisonType: 'appearLink'
        },
        {
            id: '12-0',
            originId: '1234-1236',
            time: 0,
            source: {
                id: '1234',
                x: 120,
                y: 120
            },
            target: {
                id: '1236',
                x: 50,
                y: 160
            },
            comparisonType: 'disappearLink'
        }
    ],
    nodes: [
        {
            id: '1234-0',
            originId: '1234',
            time: 0,
            x: 120,
            y: 120,
            comparisonType: 'stableNode'
        },
        {
            id: '1235-0',
            originId: '1235',
            time: 0,
            x: 10,
            y: 110,
            comparisonType: 'appearNode'
        },
        {
            id: '1236-0',
            originId: '1236',
            time: 0,
            x: 50,
            y: 160,
            comparisonType: 'disappearNode'
        }
    ]
}

export default function NodeLinkGraph(props) {
    // console.log("props",props)
    const { config, data, width, height, margin } = props
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
                width="100%"
                height="100%"
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="xMinYMin"
            >
                <g>
                    {Object.values(data.links).map((v) => {
                        return (
                            <LinkItem
                                {...config[v.status ? `${v.status}Link` : 'stableLink']}
                                {...v}
                                key={v.timeId}
                            />
                        )
                    })}
                </g>
                <g>
                    {Object.values(data.nodes).map((v) => {
                        return (
                            <NodeItem
                                {...config[v.status ? `${v.status}Node` : 'stableNode']}
                                {...v}
                                key={v.timeId}
                            />
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}
