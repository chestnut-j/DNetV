import React from "react"

export default function NodeItem(props){
  return (
    <circle
      cx = {props.x}
      cy = {props.y}
      fill = {props.fillColor}
      stroke = {props.strokeColor}
      strokeWidth = {`${props.strokeWidth}px`}
      r = {props.radius}
    >
    </circle>
  )
}