import React from 'react'
import LinkItem from '../linkItem/linkItem.js'
import {getDividedOptions } from '../../util/dnetChart.js'

export default function LinkItemContainer(props) {
    if (props.status.length < 2) {
        const options = {
            ...props,
            comparisonOptions: ''
        }
        return (
            <LinkItem
                {...props.comparisonOptions[props.status[0] ? props.status[0] : 'stableLink']}
                {...options}
            />
        )
    } else {
        const { firstOption, secondOption} = getDividedOptions(props)
        return (
            <>
                <LinkItem
                    {...firstOption}
                />
                <LinkItem
                    {...secondOption}
                />
            </>
        )
    }
}
