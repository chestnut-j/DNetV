import React, { useEffect, useState, useRef } from 'react'
import Grammar from '../../components/grammar.js'
import Preview from '../../components/preview/preview.js'
import * as testData from '../../data/import/test1.json'
import { configSet } from './config.js'
import { new_configSet } from './new_config'
import './exampleBoard.css'
import { defaultConfigs } from '../preview/util/defaultConfig'
import { configs } from 'eslint-plugin-prettier'
import { Result } from 'antd'
import dnetv from '../preview/dnetv.js'
import * as _ from 'lodash'
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
    // const assignConfigs = (configs) => {
    //     const { time, comparison } = configs
    //     const timeArr = typeof time === 'string' ? [time] : time
    //     const comparisonArr = typeof comparison === 'string' ? [comparison] : comparison
    //     let result = { timeArr, comparisonArr, ...defaultConfigs }
    //     Object.keys(configs).forEach((key) => {
    //         if (Object.prototype.toString.call(key) === '[object Object]') {
    //             Object.keys(configs[key]).forEach(
    //                 (item) => (result[key][item] = { ...configs[key][item], ...result[key][item] })
    //             )
    //         } else {
    //             if (!(key in result)) {
    //                 result[key] = configs[key]
    //             }
    //         }
    //     })
    //     result.renderType = result.timeArr[0]
    //     return result
    // }
    return (
        <div className="example-board">
            {new_configSet.map((configItem, index) => {
                // const result = assignConfigs(new_configSet[index])
                // const grammarOptions = {
                //     relationOptions: assignConfigs(configItem.relationOptions),
                //     encodingOptions: assignConfigs(configItem.encodingOptions)
                // }
                let data = dnetv()
                data.initData(jsonData.graphs, configItem)
                let grammarConfig = _.cloneDeep(new_configSet[index])
                delete grammarConfig.renderType
                // data.configs.renderType = 'position'
                // console.log('---encodingOptions---', configItem.encodingOptions)
                // console.log('---relationOptions---', configItem.relationOptions)
                // delete configItem.relationOptions.chooseItem
                // delete configItem.encodingOptions.taskType
                return (
                    <div div className="example-row">
                        <Grammar
                            options={grammarConfig}
                            // onSubmit={this.handleSubmitFromGrammar}
                            width={200}
                            height={300}
                        />
                        <Preview
                            jsonfile={jsonData}
                            // time={'Time'}
                            // timeArr={result.timeArr}
                            data={data}
                            config={data.configs}
                            // encodingOptions={configItem.encodingOptions}
                            // relationOptions={configItem.relationOptions}
                            // config={configItem.config}
                            width={1700}
                            height={300}
                            index={index}
                        />
                    </div>
                )
            })}
        </div>
    )
}
