import React from "react"

export default class Relation extends React.Component {
    constructor(props) {
        super(props)
    }
    handleSubmitType(type){
        //console.log(this.state.relationType,)
        if (this.props.onSubmit) {
            this.props.onSubmit(type)
            console.log("type in relation",type)
        }
    }
    render() {
        return (
            <div className='relation-box'>
                <div className='sub-title'>&nbsp;Relation</div>
                <div className='relation-item' onClick={()=>{this.handleSubmitType(1)}}>
                    <div className='relation-divider'>Stable</div>
                    <div className='stable-ctrl' > 
                        <div className='left-solid-circle'></div>
                        <div className='right-solid-circle' style={{background: this.props.options.color}}></div>
                    </div>
                </div>
                <div className='relation-item' onClick={()=>{this.handleSubmitType(2)}}>
                    <div className='relation-divider'>Appear</div>
                    <div className='appear-ctrl' >
                        <div className='left-dashed-circle'></div>
                        <div className='right-solid-circle'></div>
                    </div>
                </div>
                <div className='relation-item' onClick={()=>{this.handleSubmitType(3)}}>
                    <div className='relation-divider'>Disappear</div>
                    <div className='disappear-ctrl'>
                        <div className='left-solid-circle'></div>
                        <div className='right-dashed-circle'></div>
                    </div>
                </div>
                
            </div>
        );
    }
}
