import React from 'react'

export default function ArcLinkItem(props) {
    return (
        <path
            d={props.data}
            fill={'none'}
            stroke={props.strokeColor}
            strokeWidth={`${props.strokeWidth}px`}
            strokeDasharray={
                props.strokeType === 'solid' ? '' : '5,5 '
            }
        />
    )
}
