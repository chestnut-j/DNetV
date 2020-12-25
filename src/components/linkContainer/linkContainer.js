import React from 'react'
import LineLinkContainer from '../lineLinkContainer/lineLinkContainer.js'
import ArcLinkContainer from '../arcLinkContainer/arcLinkContainer.js'

export default function LinkContainer(props) {
    if (props.linkStyle.shape == 'curve') {
        return <ArcLinkContainer {...props} />
    } else {
        return <LineLinkContainer {...props} />
    }
}
