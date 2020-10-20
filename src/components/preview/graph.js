import React, { useEffect } from "react"
import DNetV from "./dnetv"

var graphs
function Graph(props) {
    const dealData = () => {
        const graphs = props.jsonfile
        console.log("json", graphs)
        // graphs = JSON.stringify(data) === "{}" ? graphs0 : data
        console.log("deal graphs", graphs)
        DNetV({ graphs }, document.getElementById("graph"))
    }
    useEffect(() => {
        console.log("graphs", graphs)
        dealData()
    }, [props.jsonfile])
    return <div id="graph" className="graph"></div>
}

export default Graph
