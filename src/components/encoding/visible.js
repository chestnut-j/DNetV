import React from 'react'

export default class Visible extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Visible</div>
                <div className='visible-ctrl'>
                    <div className='visible-circle1'></div>
                    <div className='visible-circle2'></div>
                </div>
            </div>
        )
    }
}