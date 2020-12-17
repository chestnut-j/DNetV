import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import { getArcPathData, getDividedArcPathData } from '../../util/dnetChart.js'

export default function ArcLinkContainer(props) {
    const { status} = props.linkInfo
    const { firstData, secondData} = getDividedArcPathData(props.startY, props.endY)
    if (status.length < 2) {

        return (
            <ArcLinkItem
                data = {firstData+secondData}
                {...props.comparisonOptions[status[0] ? status[0] : 'stableLink']}
                linkInfo = {props.linkInfo}
            />
        )
    } else {
        return (
            <>
                <ArcLinkItem
                    data = {firstData}
                    {...props.comparisonOptions[status[0]]}
                    linkInfo = {props.linkInfo}
                />
                <ArcLinkItem
                    data = {secondData}
                    {...props.comparisonOptions[status[1]]}
                    linkInfo = {props.linkInfo}
                />
            </>
        )
    }
}
