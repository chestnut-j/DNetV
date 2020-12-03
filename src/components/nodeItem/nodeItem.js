import React from "react"

export default function NodeItem(props){
  if(props.shape==='circle'){
    return (
      <circle
        cx = {props.x}
        cy = {props.y}
        fill = {props.fillColor}
        stroke = {props.strokeColor}
        strokeWidth = {`${props.strokeWidth}px`}
        r = {props.radius}
        strokeDasharray = {props.strokeType==='solid'?'':`${props.radius/2},${props.radius/2} `}
      >
      </circle>
    )
  }else if(props.shape==='rect'){
    return (
      <rect
        x = {props.x-props.radius}
        y = {props.y-props.radius}
        fill = {props.fillColor}
        stroke = {props.strokeColor}
        strokeWidth = {`${props.strokeWidth}px`}
        width = {props.radius*2}
        height = {props.radius*2}
        strokeDasharray = {props.strokeType==='solid'?'':`${props.radius/2},${props.radius/2} `}
      >
      </rect>
    )
  }
  
}