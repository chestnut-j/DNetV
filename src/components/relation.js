import React from 'react'
import Appear from './relation/appear'
import Stable from './relation/stable'
import Disappear from './relation/disappear'

export default class Relation extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmitType(type){
        if (this.props.onSubmit) {
            this.props.onSubmit(type)
        }
    }
    render() {
        return (
            <div className='relation-box'>
                <div className='sub-title'>&nbsp;Relation</div>
                <Appear appearOptions={this.props.options.appearOptions}  onClick={()=>{this.handleSubmitType('appear')}}/>
                <Stable stableOptions={this.props.options.stableOptions} onClick={()=>{this.handleSubmitType('stable')}}/>
                <Disappear disappearOptions={this.props.options.disappearOptions} onClick={()=>{this.handleSubmitType('disappear')}}/>
                    
            </div>
        );
    }
}
