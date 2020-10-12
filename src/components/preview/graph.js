import React, { useState, useEffect } from "react"
import DNetV from "./dnetv"
const data = [
    {
        nodes: [{ id: "a" }, { id: "b" }, { id: "c" }],
        links: [{ source: "a", target: "b" }],
    },
    {
        nodes: [{ id: "a" }, { id: "c" }],
        links: [{ source: "a", target: "c" }],
    },
]
function Graph() {
    const dealData = () => {
        DNetV({ data }, document.getElementById("graph"))
    }
    useEffect(() => {
        dealData()
    })
    return <div id="graph" className="graph"></div>
}
export default Graph
