import React from "react"
import Data from "./components/data/data.js"
import Encoding from "./components/encoding/encoding.js"
import Grammar from "./components/grammar.js"
import Preview from "./components/preview.js"
import Relation from "./components/relation/relation.js"
import Render from "./components/render.js"
import Template from "./components/template.js"

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonfile: { },
            filename:'',
            relationType: 'appear',
            preColor:'',
            encodingOptions: {
                encodingType: 'position',
                visible:'',
                position:'',
                color: '#FFFFFF',
                animation:'',
                link:'',
                glyph:'',
            },
            relationOptions: {
                taskType: 'Time',
                appearOptions:{
                    visible:'',
                    position:'',
                    color: '#00FF00',
                    animation:'',
                    link:'',
                    glyph:'',
                },
                stableOptions:{
                    visible:'',
                    position:'',
                    color: '#FFFFFF',
                    animation:'',
                    link:'',
                    glyph:'',
                },
                disappearOptions:{
                    visible:'',
                    position:'',
                    color: '#FF0000',
                    animation:'',
                    link:'',
                    glyph:'',
                }
            }
        }
        // this.handleSubmitFromRelation= this.handleSubmitFromRelation.bind(this)

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
    handleSubmitFromData = (file) => {
        if (!file) return;
        console.log("handleSubmitFromData-file",file);
        this.setState(
            {
                jsonfile: file.jsonData,
                filename: file.filename
            }
        )
    }
    handleSubmitFromRelation = (value) => {
        if(!value) return;
        this.setState({
            relationOptions: {
               ...this.state.relationOptions,
               ...value
            }
        })
      }
    handleSubmitFromEncoding = (value) => {
        if(!value) return;
        this.setState({
            encodingOptions: {
                ...this.state.encodingOptions,
                ...value
            }
        })
    }
    render() {
        const grammarOptions = {
            relationOptions: this.state.relationOptions,
            encodingOptions: this.state.encodingOptions
        }
        return (
            <div className="board">
                <div className="title"> DNetV </div>
                <div className="row">
                    <div className="col">
                        <Data onSubmit={this.handleSubmitFromData} />
                        <Relation options={this.state.relationOptions} onSubmit={this.handleSubmitFromRelation}/>
                    </div>
                    <div className="col">
                        <Encoding preColor={this.state.preColor} options={this.state.encodingOptions} onSubmit={this.handleSubmitFromEncoding}/>
                    </div>
                    <div className="col">
                        <Grammar options={grammarOptions} onSubmit={this.handleSubmitFromGrammar} />
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
