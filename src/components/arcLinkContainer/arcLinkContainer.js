import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import { getDividedArcPathData } from '../../util/dnetChart.js'

export default function ArcLinkContainer(props) {
    const status = Object.keys(props.style)
    const { source, target, opacity = 1} = props
    const { firstData, secondData} = getDividedArcPathData(source, target)
    if (status.length < 2) {
        return (
            <ArcLinkItem
                data = {firstData+secondData}
                {...props.style[status[0]]}
                opacity={opacity}
            />
        )
    } else {
        return (
            <>
                <ArcLinkItem
                    data = {firstData}
                    {...props.style[status[0]]}
                    opacity={opacity}
                />
                <ArcLinkItem
                    data = {secondData}
                    {...props.style[status[1]]}
                    opacity={opacity}
                />
            </>
        )
    }
}
