import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeItemContainer(props) {
    const status = Object.keys(props.style)
    if (status.length < 2) {
        return <NodeItem {...props.style[status[0]]} {...props} />
    } else {
        return (
            <>
                <HalfNodeItem direction={'left'} {...props.style[status[0]]} {...props} />
                <HalfNodeItem direction={'right'} {...props.style[status[1]]} {...props} />
            </>
        )
    }
}
