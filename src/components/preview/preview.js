import React from "react"
import Graph from "./graph"
import { dealData} from '../../util/preview.js'
import TimePositionDnet from '../dnetCharts/timePositionDnet/timePositionDnet.js'
import TimeAnimationDnet from '../dnetCharts/timeAnimationDnet/timeAnimationDnet.js'
import TimeChartDnet from '../dnetCharts/timeChartDnet/timeChartDnet.js'
import ComparisonPositionDnet from '../dnetCharts/comparisonPositionDnet/comparisonPositionDnet.js'
import ComparisonAnimationDnet from '../dnetCharts/comparisonAnimationDnet/comparisonAnimationDnet.js'


export default class Preview extends React.Component {
    
    static defaultProps = {
        jsonfile: {},
        filename:''
    }
    render() {
        // 处理数据，处理完后，有每个图的数据，也有总和图的数据。
        // 依赖画布大小，如果是position的编码方式：是小图。否则是大图的方式
        let width,height
        if(this.props.encodingOptions.encodingType.indexOf('position') != -1){
            width = this.props.config.eachWidth
            height = this.props.config.eachHeight
        }else{
            width = this.props.config.width
            height = this.props.config.height
        }
        // 是否有关键帧，有就和关键帧比较。没有就和前一帧作对比
        const keyFrame = -1
        console.log("this.props.jsonfile", this.props)
        // 针对每一帧的图数据，加上时间维度
        // 利用节点和链接的id的特性，求出每个id的位置
        // 注意对props利用，不要更改原来数据
        let sumGraphs, subGraphs
        let renderType
        if(this.props.jsonfile.graphs){
            const data = dealData(this.props.jsonfile.graphs, width, height)
            subGraphs = data.subGraphs
            renderType = `${this.props.relationOptions.taskType}-${this.props.encodingOptions.encodingType}`
        }else{
            renderType = ''
        }
        console.log('renderType', renderType)
        return (
            <div className='preview-box'>
                <div className='sub-title'>&nbsp;Preview
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-play"></use>
                    </svg>
                </div>
                {(()=>{
                    switch (renderType) {
                        case 'Time-position':
                            return <TimePositionDnet
                                    data = {subGraphs}
                                    comparisonOptions = {this.props.relationOptions}
                                    width = {width}
                                    height = {height}
                                    margin = {this.props.config.eachMargin}
                                />
                        case 'Time-animation':
                            return <TimeAnimationDnet/>
                        case 'Time-chart':
                            return <TimeChartDnet/>
                        case 'Comparison-position':
                            return <ComparisonPositionDnet/>
                        case 'Comparison-animation':
                            return <ComparisonAnimationDnet/>
                        default:
                            return null
                        }
                })()}
                <Graph 
                    jsonfile={this.props.jsonfile} 
                    encodingOptions={this.props.encodingOptions} 
                    relationOptions={this.props.relationOptions}
                />
            </div>
        );
    }
}
