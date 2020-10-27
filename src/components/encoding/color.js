import React from 'react'

export default class Color extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Color</div>
                <div className='color-ctrl'>
                    <div className='color-circle1'></div>
                    <div className='color-circle2'></div>
                </div>
            </div>
        )
    }
}