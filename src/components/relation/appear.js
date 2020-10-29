import React from 'react'

export default class Appear extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className='relation-item' onClick={this.props.onClick}>
                <div className='relation-divider'>Appear</div>
                <div className='appear-ctrl' >
                    <div className='left-dashed-circle'></div>
                    <div className='right-solid-circle' style={{background: this.props.options.color}}></div>
                </div>
            </div>
        )
    }
}