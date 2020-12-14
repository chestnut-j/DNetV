import React from 'react'
import NodeItem from '../nodeItem/nodeItem.js'
import HalfNodeItem from '../halfNodeItem/halfNodeItem.js'

export default function NodeItemContainer (props) {
  const options = {
    ...props,
    comparisonOptions: ''
  }
  if (props.status.length < 2) {
      return (
          <NodeItem
              {...props.comparisonOptions[props.status[0]]}
              {...options}
          />
      )
  } else {
      return (
          <>
              <HalfNodeItem
                  direction={'left'}
                  {...props.comparisonOptions[props.status[0]]}
                  {...options}
              />
              <HalfNodeItem
                  direction={'right'}
                  {...props.comparisonOptions[props.status[1]]}
                  {...options}
              />
          </>
      )
  }
}
