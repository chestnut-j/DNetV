import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeItemContainer(props) {
    const { comparisonOptions, status, nodeStyle } = props
    const options = {
        ...props,
        comparisonOptions: ''
    }
    if (comparisonOptions.isOn) {
        if (status.length < 2) {
            return <NodeItem {...comparisonOptions[status[0]]} {...options} />
        } else {
            return (
                <>
                    <HalfNodeItem
                        direction={'left'}
                        {...comparisonOptions[status[0]]}
                        {...options}
                    />
                    <HalfNodeItem
                        direction={'right'}
                        {...comparisonOptions[status[1]]}
                        {...options}
                    />
                </>
            )
        }
    } else {
        return <NodeItem {...nodeStyle} {...options} />
    }
}
