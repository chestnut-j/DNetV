import React, { useEffect } from "react"
import DNetV from "./dnetv"

var graphs
function Graph(props) {
    graphs = props.jsonfile
    const dealData = () => {
        const graphs = props.jsonfile
        console.log("deal graphs", graphs)
        DNetV({ graphs }, document.getElementById("graph"))
    }
    useEffect(() => {
        console.log("graphs", graphs)
        dealData()
        document.title=`${props.filename}`
    })
    return <div id="graph" className="graph"></div>
}

export default Graph
