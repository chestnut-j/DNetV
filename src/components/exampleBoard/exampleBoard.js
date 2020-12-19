import React, { useEffect, useState, useRef } from 'react'
import Grammar from '../../components/grammar.js'
import Preview from '../../components/preview/preview.js'
import * as testData from '../../data/import/test1.json'
import { configSet } from './config.js'
import './exampleBoard.css'

const dataset = [
    {
        dataName: 'testData',
        description: 'Barley yield by variety across the upper midwest in 1931 and 1932',
        data: testData.default
    }
]

export default function ExampleBoard() {
    const [jsonData, setJsonData] = useState(dataset[0].data)
    const [configs, setConfigs] = useState(configSet)

    return (
        <div className="example-board">
            {configs.map((configItem) => {
                const grammarOptions = {
                    relationOptions: configItem.relationOptions,
                    encodingOptions: configItem.encodingOptions
                }
                return (
                    <div div className="example-row">
                        <Grammar
                            options={grammarOptions}
                            // onSubmit={this.handleSubmitFromGrammar}
                            width={940}
                            height={600}
                        />
                        <Preview
                            jsonfile={jsonData}
                            encodingOptions={configItem.encodingOptions}
                            relationOptions={configItem.relationOptions}
                            config={configItem.config}
                            width={940}
                            height={600}
                        />
                    </div>
                )
            })}
        </div>
    )
}
