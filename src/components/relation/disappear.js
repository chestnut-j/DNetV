import React from 'react'

export default class Disappear extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
            <div className='relation-item' onClick={this.props.onClick}>
                    <div className='relation-divider'>Disappear</div>
                    <div className='disappear-ctrl'>
                        <div className='left-solid-circle' ></div>
                        <div className='right-dashed-circle' style={{background: this.props.disappearOptions.color}}></div>
                    </div>
            </div>
        )
    }
}