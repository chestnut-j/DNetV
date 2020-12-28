import React from 'react'
import LinkItem from '../linkItem/linkItem.js'
import { getDividedOptions } from '../../util/dnetChart.js'

export default function LineLinkContainer(props) {
    const status = Object.keys(props.style)
    if (status.length < 2) {
        // const options = {
        //     ...props
        //     // comparisonOptions: ''
        // }
        return (
            <LinkItem
                // {...props.comparisonOptions[props.status[0] ? props.status[0] : 'stableLink']}
                {...props.style[status[0]]}
                {...props}
            />
        )
    } else {
        const { firstOption, secondOption } = getDividedOptions(props, status)
        return (
            <>
                <LinkItem {...firstOption} />
                <LinkItem {...secondOption} />
            </>
        )
    }
}
