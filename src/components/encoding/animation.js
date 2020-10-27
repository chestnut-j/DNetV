import React from 'react'

export default class Animation extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Animation</div>
                <div className='animation-ctrl'>
                    <div className='animation-circle1'></div>
                    <div className='ellipse1'></div>
                    <div className='ellipse2'></div>
                    <div className='ellipse3'></div>
                    <div className='animation-circle2'></div>
                </div>
            </div>
        )
    }
}