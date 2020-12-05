import React from "react"
import Data from "./components/data/data.js"
import Encoding from "./components/encoding/encoding.js"
import Grammar from "./components/grammar.js"
import Preview from "./components/preview/preview.js"
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
            config: {
                width: 1000,
                height: 750,
                eachMargin: 20,
                eachWidth: 180,
                eachHeight: 180
            },
            relationOptions: {
                taskType: 'Time',
                chooseItem: 'stable-Node',
                appearNode: {
                    shape: 'circle',
                    fillColor: 'red',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    strokeType: 'solid',
                    textColor: 'white',
                    radius: 5,
                },
                stableNode: {
                    shape: 'circle',
                    fillColor: '#eeeeee',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 5,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                disappearNode: {
                    shape: 'circle',
                    fillColor: 'gray',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 5,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                appearLink: {
                    strokeColor: 'red',
                    strokeType: 'solid',
                    strokeWidth: 1,
                },
                stableLink: {
                    strokeColor: '#000000',
                    strokeType: 'solid',
                    strokeWidth: 1,
                },
                disappearLink: {
                    strokeColor: 'gray',
                    strokeType: 'solid',
                    strokeWidth: 1,
                }
            }
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
    handleSubmitFromData = (file) => {
        if (!file) return;
        // console.log("handleSubmitFromData-file",file);
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
                        <Relation 
                            options={this.state.relationOptions} 
                            onSubmit={this.handleSubmitFromRelation}
                        />
                    </div>
                    <div className="col">
                        <Encoding 
                            preColor={this.state.preColor} 
                            options={this.state.encodingOptions} 
                            relationOptions={this.state.relationOptions}
                            onSubmitToRelation={this.handleSubmitFromRelation}
                            onSubmit={this.handleSubmitFromEncoding}/>
                    </div>
                    <div className="col">
                        <Grammar options={grammarOptions} onSubmit={this.handleSubmitFromGrammar} />
                    </div>

                    <div className="col">
                        <div className="row">
                            <Render style={{ float: "left" }} />
                            <Template style={{ float: "left" }} />
                        </div>
                        <Preview 
                            jsonfile={this.state.jsonfile} 
                            encodingOptions={this.state.encodingOptions} 
                            relationOptions={this.state.relationOptions}
                            config = {this.state.config} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}
