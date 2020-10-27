import React from 'react'

export default class Glyph extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Glyph</div>
                <div className='glyph-ctrl'>
                    <div className='glyph-circle1'></div>
                    <div className='glyph-circle2'></div>
                    <svg className="glyph-icon" aria-hidden="true" >
                        <use xlinkHref="#icon-tick"></use>
                    </svg>
                </div>
            </div>
        )
    }
}