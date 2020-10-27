import React from 'react'

export default class Link extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Link</div>
                <div className='link-ctrl'>
                    <div className='link-circle1'></div>
                    <div className='wavy'></div>
                    <div className='link-circle2'></div>
                </div>
            </div>
        )
    }
}