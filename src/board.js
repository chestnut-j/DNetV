import React from "react"
import Data from "./components/data.js"
import Encoding from "./components/encoding.js"
import Grammar from "./components/grammar.js"
import Preview from "./components/preview.js"
import Relation from "./components/relation.js"
import Render from "./components/render.js"
import Template from "./components/template.js"

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          jsonfile: { },
          filename:'',
          relationType: 1
        }
    }
    handleSubmitFromGrammar = (file) => {
        if (!file) return;
        this.setState(
          {
            jsonfile: file.jsonData,
            filename: file.filename
          }
        )
      }
    handleSubmitFromRelation = (type) => {
        if(!type) return;
        this.setState({
            relationType:type
        })
      }
    render() {
        return (
            <div className="board">
                <div className="title"> DNetV </div>
                <div className="row">
                    <div className="col">
                        <Data />
                        <Relation onSubmit={this.handleSubmitFromRelation}/>
                    </div>
                    <div className="col">
                        <Encoding relationType={this.state.relationType}/>
                    </div>
                    <div className="col">
                        <Grammar onSubmit={this.handleSubmitFromGrammar} />
                    </div>

                    <div className="col">
                        <div className="row">
                            <Render style={{ float: "left" }} />
                            <Template style={{ float: "left" }} />
                        </div>
                        <Preview jsonfile={this.state.jsonfile} filename={this.state.filename}/>
                    </div>
                </div>
            </div>
        )
    }
}
