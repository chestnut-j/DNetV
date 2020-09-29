import React from 'react'

export default class Encoding extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '220px', height:'620px'}}>
                <div className='sub-title'>Encoding
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>
            </div>
        );
    }
}
