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
            taskType: 'Time',
            config: {
                width: 1000,
                height: 750,
                eachMargin: 20,
                eachWidth: 180,
                eachHeight: 180
            },
            comparisonOptions: {
                chooseItem: 'stableNode',
                appearNode: {
                    shape: 'circle',
                    fillColor: '#FFFFFF',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    strokeType: 'solid',
                    textColor: 'white',
                    radius: 5,
                },
                appearLink: {
                    strokeColor: '#FFFFFF',
                    strokeType: 'solid',
                    strokeWidth: 1,
                },
                stableNode: {
                    shape: 'circle',
                    fillColor: '#000000',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 5,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                stableLink: {
                    strokeColor: '#000000',
                    strokeType: 'solid',
                    strokeWidth: 1,
                },
                disappearNode: {
                    shape: 'circle',
                    fillColor: '#FFFFFF',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 5,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                disappearLink: {
                    strokeColor: '#FFFFFF',
                    strokeType: 'solid',
                    strokeWidth: 1,
                }
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
    handleChangeRenderConfig = (propType, value) => {
        let renderConfig = this.state.config
        renderConfig[propType] = value
        this.setState({
            config: renderConfig
        })
        console.log("change config",this.state.config)
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
                            <Render onChangeConfig={this.handleChangeRenderConfig} style={{ float: "left" }} />
                            <Template style={{ float: "left" }} />
                        </div>
                        <Preview 
                            taskType = {this.state.taskType}
                            jsonfile={this.state.jsonfile} 
                            encodingOptions={this.state.encodingOptions} 
                            relationOptions={this.state.relationOptions}
                            config = {this.state.config} 
                            comparisonOptions = {this.state.comparisonOptions}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
