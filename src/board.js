import React from "react"
import Data from "./components/data.js"
import Encoding from "./components/encoding.js"
import Grammar from "./components/grammar.js"
import Preview from "./components/preview.js"
import Relation from "./components/relation.js"
import Render from "./components/render.js"
import Template from "./components/template.js"

export default class Board extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="title"> DNetV </div>
        <div className="row">
          <div className="col">
            <Data />
            <Relation />
          </div>
          <div className="col">
            <Encoding />
          </div>
          <div className="col">
            <Grammar />
          </div>

          <div className="col">
            <div className="row">
              <Render style={{ float: "left" }} />
              <Template style={{ float: "left" }} />
            </div>
            <Preview />
          </div>
        </div>
      </div>
    )
  }
}
