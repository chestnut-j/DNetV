import React, { useEffect } from "react"
import DNetV from "./dnetv"
const graphs = [
    {
        nodes: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
        links: [{ source: "a", target: "b" }],
    },
    {
        nodes: [{ id: "b" }, { id: "c" }],
        links: [{ source: "b", target: "c" }],
    },
    {
        nodes: [{ id: "b" }, { id: "c" }, { id: "d" }],
        links: [
            { source: "b", target: "c" },
            { source: "c", target: "d" },
        ],
    },
]
function Graph() {
    const dealData = () => {
        DNetV({ graphs }, document.getElementById("graph"))
    }
    useEffect(() => {
        dealData()
    })
    return <div id="graph" className="graph"></div>
}
export default Graph
