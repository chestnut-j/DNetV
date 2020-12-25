import React from 'react'
import LinkItem from '../linkItem/linkItem.js'
import { getDividedOptions } from '../../util/dnetChart.js'

export default function LineLinkContainer(props) {
    const { comparisonOptions, status, linkStyle } = props
    const options = {
        ...props,
        comparisonOptions: ''
    }
    if (comparisonOptions.isOn) {
        if (status.length < 2) {
            
            return (
                <LinkItem {...comparisonOptions[status[0] ? status[0] : 'stableLink']} {...options} />
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
    } else {
        return (
            <LinkItem {...linkStyle} {...options} />
        )
    }
}
