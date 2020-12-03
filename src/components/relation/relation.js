import React from 'react'
import Appear from './appear'
import Stable from './stable'
import Disappear from './disappear'
import RelationItem from '../relationItem/relationItem.js'
import SampleItem from '../sampleItem/sampleItem.js'
import { Radio } from 'antd';
import './relation.css'

const taskOptions = [
    { label: 'Time', value: 'Time' },
    { label: 'Comparison', value: 'Comparison' },
  ];

const cloumnOptions = [
    { label: 'appear', value: 'appear' },
    { label: 'stable', value: 'stable' },
    { label: 'disappear', value: 'disappear' },
];

const index2ChooseItem = [
    'appear-Node',
    'stable-Node',
    'disappear-Node',
    'appear-Link',
    'stable-Link',
    'disappear-Link'
]
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
    handleColumnChange = e => {
        const nodeOrLink = this.props.options.chooseItem.split('-')[1]
        this.props.onSubmit({chooseItem: `${e.target.value}-${nodeOrLink}` })
    }   
    handleRowChange = e => {
        const changeAttr = this.props.options.chooseItem.split('-')[0]
        this.props.onSubmit({chooseItem: `${changeAttr}-${e.target.value}` })
    }   
    handleIconsClick = (e) => {
        const index = e.target.getAttribute('class').split('-')[2]
        this.props.onSubmit({chooseItem: index2ChooseItem[Number(index)] })
    }
    render() {
        const { taskType, chooseItem , appearNode, appearLink, stableNode, stableLink, disappearNode, disappearLink } = this.props.options
        // console.log("this.state.taskType",this.state.taskType)
        const columnButtonStyle={
            boxSizing: 'border-box',
            width: '62px', 
            padding:'0px', 
            fontSize: '12px',
            height: '30px',
            alighItems: 'center'
        }
        const rowButtonStyle={
            boxSizing: 'border-box',
            width: '62px', 
            padding:'0px', 
            fontSize: '12px',
            height: '62px',
            alighItems: 'center'
        }
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
                <div className='comparison-table-container'>
                    <div className='table-first-line'>
                        <div
                            className='blank-icon'
                        ></div>
                        <Radio.Group buttonStyle="solid" onChange={this.handleColumnChange} value={chooseItem.split('-')[0]}>
                            <Radio.Button style={columnButtonStyle} value="appear">appear</Radio.Button>
                            <Radio.Button style={columnButtonStyle} value="stable">stable</Radio.Button>
                            <Radio.Button style={columnButtonStyle} value="disappear">disappear</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='table-second-line'>
                        <div className='second-line-left'>
                            <Radio.Group buttonStyle="solid" onChange={this.handleRowChange} value={chooseItem.split('-')[1]}>
                                <Radio.Button style={rowButtonStyle} value="Node">Node</Radio.Button>
                                <Radio.Button style={rowButtonStyle} value="Link">Link</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div 
                            className='second-line-right'
                            onClick = {this.handleIconsClick}
                        >
                            <div 
                                id='appear-Node'
                                className={`line-icon-container ${chooseItem==='appear-Node'? 'choose-icon':''}`}
                            >
                                <SampleItem
                                    config = {appearNode}
                                    index = {0}
                                />
                            </div>
                            <div 
                                className={`line-icon-container ${chooseItem==='stable-Node'? 'choose-icon':''}`}
                            >
                                <SampleItem
                                    config = {stableNode}
                                    index = {1}
                                />
                            </div>
                            <div 
                                className={`line-icon-container ${chooseItem==='disappear-Node'? 'choose-icon':''}`}
                            >
                                <SampleItem
                                    config = {disappearNode}
                                    index = {2}
                                />
                            </div>
                            <div className={`line-icon-container ${chooseItem==='appear-Link'? 'choose-icon':''}`}>
                                <SampleItem
                                    config = {appearLink}
                                    type = {'link'}
                                    index = {3}
                                />
                            </div>
                            <div className={`line-icon-container ${chooseItem==='stable-Link'? 'choose-icon':''}`}>
                                <SampleItem
                                    config = {stableLink}
                                    type = {'link'}
                                    index = {4}
                                />  
                            </div>
                            <div className={`line-icon-container ${chooseItem==='disappear-Link'? 'choose-icon':''}`}>
                                <SampleItem
                                    config = {disappearLink}
                                    type = {'link'}
                                    index = {5}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <RelationItem option={{type: 'appear', ...appearOptions }} onSubmit={this.handleOptionChange}/> */}
                {/* <RelationItem option={{type: 'stable', ...stableOptions }} onSubmit={this.handleOptionChange}/> */}
                {/* <RelationItem option={{type: 'disappear', ...disappearOptions}} onSubmit={this.handleOptionChange}/> */}
            </div>
        );
    }
}
