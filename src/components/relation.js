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
            var preColor = this.props.options.appearOptions.color
            this.props.onSubmit({type,preColor})
            console.log("type in relation",type)
            console.log("option in relation" , this.props.options.appearOptions)
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
