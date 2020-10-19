import React, { useEffect} from "react"
import DNetV from "./dnetv"

var graphs0 = [
    {
        nodes: [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
        links: [{ source: "a", target: "b" }]
    }
]
var graphs;
function Graph(props) {
    let data = props.jsonfile;
    console.log("json",data);
    graphs=JSON.stringify(data) === "{}" ? graphs0 : data;
    const dealData = () => {
        console.log("indeal graphs",graphs);
        DNetV({ graphs }, document.getElementById("graph"))
    }
    useEffect(() => {
        console.log("graphs",graphs);
        dealData()
        
    },[props.jsonfile])
    return <div id="graph" className="graph" ></div>
}

export default Graph
