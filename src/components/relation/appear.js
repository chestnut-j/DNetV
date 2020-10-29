import React from 'react'

export default class Appear extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            preColor:this.props.appearOptions.color
        }
    }



    render(){
        return(
            <div className='relation-item' onClick={this.props.onClick}>
                <div className='relation-divider'>Appear</div>
                <div className='appear-ctrl' >
                    <div className='left-dashed-circle'></div>
                    <div className='right-solid-circle' style={{background: this.props.appearOptions.color}}></div>
                </div>
            </div>
        )
    }
}