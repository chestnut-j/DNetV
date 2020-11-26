import React from 'react'
import Appear from './appear'
import Stable from './stable'
import Disappear from './disappear'
import RelationItem from '../relationItem/relationItem.js'
import { Radio } from 'antd';
import './relation.css'

const taskOptions = [
    { label: 'Time', value: 'Time' },
    { label: 'Comparison', value: 'Comparison' },
  ];

export default class Relation extends React.Component {
    constructor(props) {
        super(props)
    }
    handleOptionChange = (value) => {
        this.props.onSubmit({...value})
    }
    handleTaskChange = e => {
        this.props.onSubmit({ taskType: e.target.value })
    };        
    render() {
        const { taskType, appearOptions, stableOptions, disappearOptions} = this.props.options
        // console.log("this.state.taskType",this.state.taskType)
        return (
            <div className='relation-box'>
                <div className='sub-title'>&nbsp;Relation</div>
                <Radio.Group
                    options={taskOptions}
                    onChange={this.handleTaskChange}
                    value={taskType}
                    optionType="button"
                    buttonStyle="solid"
                    style={{
                        width:'90%',
                        marginTop: 10,
                    }}
                />
                <RelationItem option={{type: 'appear', ...appearOptions }} onSubmit={this.handleOptionChange}/>
                <RelationItem option={{type: 'stable', ...stableOptions }} onSubmit={this.handleOptionChange}/>
                <RelationItem option={{type: 'disappear', ...disappearOptions}} onSubmit={this.handleOptionChange}/>
            </div>
        );
    }
}
