import React from 'react'

export default function ArcLinkItem(props) {
    return (
        <path
            d={props.data}
            // fill={props.fillColor}
            fill={'none'}
            stroke={props.strokeColor}
            strokeWidth={`${props.strokeWidth}px`}
            strokeDasharray={
                props.strokeType === 'solid' ? '' : `${props.radius / 2},${props.radius / 2} `
            }
        />
    )
}
