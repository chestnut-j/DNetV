import React from 'react'

export default class Position extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Position</div>
                <div className='position-ctrl'>
                    <div className='position-circle1'></div>
                    <div className='position-circle2'></div>
                </div>
            </div>
        )
    }
}