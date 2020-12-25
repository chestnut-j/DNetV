import React from 'react'
import ArcLinkItem from '../arcLinkItem/arcLinkItem.js'
import { getArcPathData, getDividedArcPathData } from '../../util/dnetChart.js'

export default function ArcLinkContainer(props) {
    const { status, linkStyle, comparisonOptions, source, target} = props
    const { firstData, secondData} = getDividedArcPathData(source, target)
    const firstComparisonOptions = comparisonOptions.isOn ?
        {...comparisonOptions[status[0] ? status[0] : 'stableLink']}:
        linkStyle
    const secondComparisonOptions = comparisonOptions.isOn ? 
        {...comparisonOptions[status[1]]}:
        linkStyle
    
    if (status.length < 2) {
        return (
            <ArcLinkItem
                data = {firstData+secondData}
                {...firstComparisonOptions}
            />
        )
    } else {
        return (
            <>
                <ArcLinkItem
                    data = {firstData}
                    {...firstComparisonOptions}
                />
                <ArcLinkItem
                    data = {secondData}
                    {...secondComparisonOptions}
                />
            </>
        )
    }
}
