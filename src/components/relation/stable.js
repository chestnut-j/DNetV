import React from 'react'

export default class Stable extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className='relation-item' onClick={this.props.onClick}>
                    <div className='relation-divider'>Stable</div>
                    <div className='stable-ctrl' > 
                        <div className='left-solid-circle'></div>
                        <div className='right-solid-circle' style={{background: this.props.stableOptions.color}}></div>
                    </div>
            </div>
        )
    }
}