import React from 'react'
import Appear from './relation/appear'
import Stable from './relation/stable'
import Disappear from './relation/disappear'

export default class Relation extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmitType(type){
        //console.log(this.state.relationType)
        if (this.props.onSubmit) {
            this.props.onSubmit(type)
            console.log("type in relation",type)
        }
    }
    render() {
        return (
            <div className='relation-box'>
                <div className='sub-title'>&nbsp;Relation</div>
                <Appear options={this.props.options} onClick={()=>{this.handleSubmitType(2)}}/>
                <Stable onClick={()=>{this.handleSubmitType(1)}}/>
                <Disappear onClick={()=>{this.handleSubmitType(3)}}/>
                    
            </div>
        );
    }
}
