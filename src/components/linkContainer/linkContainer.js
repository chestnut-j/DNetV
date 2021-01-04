import React from 'react'
import LineLinkContainer from '../lineLinkContainer/lineLinkContainer.js'
import ArcLinkContainer from '../arcLinkContainer/arcLinkContainer.js'

export default function LinkContainer(props) {
    console.log("----props.opacity-----", props.opacity)
    const status = Object.keys(props.style)
    if (props.style[status[0]].shape == 'curve') {
    return <ArcLinkContainer {...props} />
    } else {
    return <LineLinkContainer {...props} />
    }
}
