import React from 'react'
import Data from './components/data/data.js'
import Encoding from './components/encoding/encoding.js'
import Grammar from './components/grammar.js'
import Preview from './components/preview/preview.js'
import Relation from './components/relation/relation.js'
import Render from './components/render.js'
import Template from './components/template.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jsonfile: {},
            filename: '',
            relationType: 'appear',
            preColor: '',
            encodingOptions: {
                encodingType: ['link'],
                visible: {
                    isVisible: true
                },
                position: {
                    totalWidth: 1000,
                    eachWidth: 500
                },
                color: {
                    number: 10
                },
                animation: {
                    speed: 800
                },
                link: {
                    xDistance: 100,
                    yDistance: 40
                },
                glyph: ''
            },
            config: {
                width: 500,
                height: 500,
                eachMargin: 20,
                eachWidth: 200,
                eachHeight: 200
            },
            relationOptions: {
                taskType: 'Time',
                chooseItem: 'stable-Node',
                appearNode: {
                    shape: 'circle',
                    fillColor: '#FD8F8F',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    strokeType: 'solid',
                    textColor: 'white',
                    radius: 6
                },
                stableNode: {
                    shape: 'circle',
                    fillColor: '#DAD5D5',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 6,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                disappearNode: {
                    shape: 'circle',
                    fillColor: '#90B5FB',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 6,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                appearLink: {
                    strokeColor: '#FD8F8F',
                    strokeType: 'solid',
                    strokeWidth: 2
                },
                stableLink: {
                    strokeColor: '#908F8F',
                    strokeType: 'solid',
                    strokeWidth: 2
                },
                disappearLink: {
                    strokeColor: '#90B5FB',
                    strokeType: 'solid',
                    strokeWidth: 2
                }
            }
        }
    }
    handleSubmitFromGrammar = (file) => {
        if (!file) return
        this.setState({
            jsonfile: file.jsonData,
            filename: file.filename
        })
    }
    handleSubmitFromData = (file) => {
        if (!file) return
        // console.log("handleSubmitFromData-file",file);
        this.setState({
            jsonfile: file.jsonData,
            filename: file.filename
        })
    }
    handleSubmitFromRelation = (value) => {
        if (!value) return
        this.setState({
            relationOptions: {
                ...this.state.relationOptions,
                ...value
            }
        })
    }
    handleSubmitFromEncoding = (value) => {
        if (!value) return
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
        console.log('change config', this.state.config)
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
                            onSubmit={this.handleSubmitFromEncoding}
                        />
                    </div>
                    <div className="col">
                        <Grammar options={grammarOptions} onSubmit={this.handleSubmitFromGrammar} />
                    </div>

                    <div className="col">
                        <div className="row">
                            <Render
                                onChangeConfig={this.handleChangeRenderConfig}
                                style={{ float: 'left' }}
                            />
                            <Template style={{ float: 'left' }} />
                        </div>
                        <Preview
                            jsonfile={this.state.jsonfile}
                            encodingOptions={this.state.encodingOptions}
                            relationOptions={this.state.relationOptions}
                            config={this.state.config}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
