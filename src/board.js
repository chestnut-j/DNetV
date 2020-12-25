import React, { useEffect, useState, useRef } from 'react'
import Data from './components/data/data.js'
import Encoding from './components/encoding/encoding.js'
import Grammar from './components/grammar.js'
import Preview from './components/preview/preview.js'
import Relation from './components/relation/relation.js'
import Render from './components/render.js'
import Template from './components/template.js'
import ExampleBoard from './components/exampleBoard/exampleBoard.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: 'example',
            jsonfile: {},
            filename: '',
            basic: {
                width: 300,
                height: 300,
                eachWidth: 300,
                eachHeight: 300,
                margin: 10,
                nodeStyle: {
                    shape: 'circle',
                    fillColor: '#DAD5D5',
                    strokeColor: '#000000',
                    strokeWidth: 1,
                    radius: 6,
                    strokeType: 'solid',
                    textColor: 'white'
                },
                linkStyle: {
                    shape: 'line',
                    strokeColor: '#908F8F',
                    strokeType: 'solid',
                    strokeWidth: 2
                }
            },
            time: {
                chooseTypes: ['link'],
                visible: {
                    isVisible: true
                },
                position: {
                    eachMargin: 5,
                    eachWidth: 200,
                    eachHeight: 200
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
            layout: {
                chooseTypes:'vertical', 
                vertical: {
                    yDistance: 40,
                    linkStyle: {
                        shape: 'curve'
                    }
                }
            },
            comparison: {
                isOn: true,
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
            comparison: {
                ...this.state.comparison,
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
    }
    handleBoardSwitch = (value) => {
        console.log('value', value, this.state.board)
        if (this.state.board !== value) {
            this.setState({
                board: value
            })
        }
    }
    render() {
        const combineConfigs = {
            global: this.state.global,
            time: this.state.time,
            comparison: this.state.comparison,
            layout: this.state.layout
        }
        return (
            <div className="board">
                <div className="window-header">
                    <div className="title"> DNetV </div>
                    <div
                        className={`header-sub-title ${
                            this.state.board === 'system' ? 'header-sub-choose' : ''
                        }`}
                        onClick={() => this.handleBoardSwitch('system')}
                    >
                        System
                    </div>
                    <div className="header-sub-divide"></div>
                    <div
                        className={`header-sub-title ${
                            this.state.board === 'example' ? 'header-sub-choose' : ''
                        }`}
                        onClick={() => this.handleBoardSwitch('example')}
                    >
                        Example
                    </div>
                </div>
                {this.state.board === 'example' ? (
                    <ExampleBoard></ExampleBoard>
                ) : (
                    <div className="row">
                        <div className="col">
                            <Data onSubmit={this.handleSubmitFromData} />
                            <Relation
                                options={this.state.comparison}
                                onSubmit={this.handleSubmitFromRelation}
                            />
                        </div>
                        <div className="col">
                            <Encoding
                                preColor={this.state.preColor}
                                options={this.state.encodingOptions}
                                comparison={this.state.comparison}
                                onSubmitToRelation={this.handleSubmitFromRelation}
                                onSubmit={this.handleSubmitFromEncoding}
                            />
                        </div>
                        <div className="col">
                            <Grammar
                                options={combineConfigs}
                                onSubmit={this.handleSubmitFromGrammar}
                            />
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
                                data={this.state.jsonfile.graphs}
                                config={{
                                    basic: this.state.basic,
                                    layout: this.state.layout,
                                    comparison: this.state.comparison,
                                    time: this.state.time
                                }}
                                // encodingOptions={this.state.encodingOptions}
                                // comparison={this.state.comparison}
                                // config={combineConfigs}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }
}
