import React from 'react'
import Appear from './appear'
import Stable from './stable'
import Disappear from './disappear'
import RelationItem from '../relationItem/relationItem.js'
import {ChromePicker} from 'react-color'
import SampleItem from '../sampleItem/sampleItem.js'
import { Radio, Select, Input} from 'antd';
import './relation.css'

const { Option } = Select;
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
        this.state = {
            colorPickerDisplay: [
                false,
                false,
                false
            ]
        }
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
    handleShapeChange = (value) => {
        const changeKey = chooseItem.split('-').join('')
        const changeOptions = this.props.options[changeKey]
        // this.props.onSubmit({[changeKey]: {...changeOptions, shape: value}})
    }
    handleStrokeTypeChange = (value) => {
        console.log(`selected ${value}`);
    }
    handleStrokeWidthChange = () =>{

    }
    handleRadiusChange = () => {

    }
    handleColorChange=(colorCode)=> {
        // this.setState({
        //   color: colorCode.hex
        // })
        console.log("handleColorChange---onSubmit", this.props.onSubmit)
        this.setState()
        // const tempKey = `${this.props.option.type}Options`
        // this.props.onSubmit({
        //   [tempKey]:{
        //     ...this.props.option,
        //     color: colorCode.hex
        //   }
        // })
    }

    handleColorClick = (e, index) => {
        const tempArr = this.state.colorPickerDisplay
        tempArr[index] = !tempArr[index] 
        this.setState({
            colorPickerDisplay: tempArr
        })
    }
    render() {
        const { taskType, chooseItem , appearNode, appearLink, stableNode, stableLink, disappearNode, disappearLink } = this.props.options
        // console.log("this.state.taskType",this.state.taskType)
        let changeKey = chooseItem.split('-')
        const isNode = changeKey[1]==='Node' ? true : false
        changeKey = changeKey.join('') 
        const changeOptions = this.props.options[changeKey]
        console.log("changeOptions----", changeOptions)
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
                <div className='change-option-panle'>
                    {/* 选择形状：圆形、三角形、方形 */}
                    <div className="change-option-item">
                        <Select
                            defaultValue={changeOptions.shape}
                            onChange={this.handleShapeChange}
                            style={{ width: '100%' }}
                        >
                            <Option key="circle">
                                <div>circle</div>
                            </Option>
                            <Option key="rect">
                                <div>rect</div>
                            </Option>
                        </Select>
                    </div>
                    {/* 选择线型 */}
                    <div className="change-option-item">
                        <text>strokeType:</text>
                        <Select defaultValue={changeOptions.strokeType} style={{ width: 120 }} onChange={this.handleStrokeTypeChange}>
                            <Option value="solid">solid</Option>
                            <Option value="dashed">dashed</Option>
                        </Select>
                    </div>
                    {/* 输入线宽 */}
                    <div className="change-option-item">
                        <text>strokeWidth:</text>
                        <Input value={1} type='number' onChange={this.handleStrokeWidthChange} style={{width:'120px'}} />
                    </div>
                    {/* 输入半径长度 */}
                    <div className="change-option-item">
                        <text>radius:</text>
                        <Input value={changeOptions.radius} type='number' onChange={this.handleRadiusChange} style={{width:'120px'}} />
                    </div>
                    {/* 填充颜色 */}
                    {
                        changeOptions.fillColor ? 
                        <div>
                            <div 
                                className='change-option-item'
                            >
                                <div >fillColor</div> 
                                <div 
                                    onClick={(e)=>this.handleColorClick(e, 0)}
                                    style={{
                                        backgroundColor: 'red',
                                        // backgroundColor:changeOptions.fillColor,
                                        width:'120px',
                                        height: '32px'
                                    }}></div>
                            </div>
                            {this.state.colorPickerDisplay[0] ? ( <ChromePicker className="item-color-picker" 
                                color={changeOptions.fillColor} 
                                onChange={this.handleColorChange} />):null} 
                        </div>:null
                    }
                </div>
                {/* <RelationItem option={{type: 'appear', ...appearOptions }} onSubmit={this.handleOptionChange}/> */}
                {/* <RelationItem option={{type: 'stable', ...stableOptions }} onSubmit={this.handleOptionChange}/> */}
                {/* <RelationItem option={{type: 'disappear', ...disappearOptions}} onSubmit={this.handleOptionChange}/> */}
            </div>
        );
    }
}
