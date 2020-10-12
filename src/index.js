import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Board from "./board.js"

let script = document.createElement("script")
script.type = "text/javascript"
script.src = "http://at.alicdn.com/t/font_2104982_95r8oz9uzww.js"
document.getElementById("root").appendChild(script)

ReactDOM.render(<Board />, document.getElementById("root"))
