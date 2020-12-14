import React from 'react'

export default function LinkItem(props) {
    // console.log("------source---target----f--", props.source, props.target)
    return (
        <line
            id={props.timeId}
            x1={props.source.x}
            y1={props.source.y}
            x2={props.target.x}
            y2={props.target.y}
            stroke={props.strokeColor}
            strokeWidth={`${props.strokeWidth}px`}
            strokeDasharray={
                props.strokeType === 'solid'
                    ? ''
                    : `${props.strokeWidth * 2},${props.strokeWidth * 2} `
            }
        ></line>
    )
}
