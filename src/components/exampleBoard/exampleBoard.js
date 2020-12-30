import React, { useEffect, useState, useRef } from 'react'
import Grammar from '../../components/grammar.js'
import Preview from '../../components/preview/preview.js'
import * as testData from '../../data/import/test1.json'
import { configSet } from './config.js'
import './exampleBoard.css'
import { defaultConfigs } from '../preview/util/defaultConfig'
import { configs } from 'eslint-plugin-prettier'
import { Result } from 'antd'
import dnetv from '../preview/dnetv.js'
import { composeConfig, assignConfigs } from '../../util/dnetChart'
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
            {configSet.map((configItem, index) => {
                const config = assignConfigs(configItem)
                // let data = dnetv()
                // data.initData(jsonData.graphs, configItem)
                // data.configs.renderType = 'position'
                console.log("---ExampleBoard----" ,config)
                // console.log('---encodingOptions---', configItem.encodingOptions)
                // console.log('---relationOptions---', configItem.relationOptions)
                // delete configItem.relationOptions.chooseItem
                // delete configItem.encodingOptions.taskType
                return (
                    <div className="example-row" key={`example-row-${index}`}>
                        <Grammar
                            options={configItem}
                            // onSubmit={this.handleSubmitFromGrammar}
                            width={340}
                            height={600}
                        />
                        <Preview data={jsonData.graphs} config={config} width={1540} height={600} />
                    </div>
                )
            })}
        </div>
    )
}
