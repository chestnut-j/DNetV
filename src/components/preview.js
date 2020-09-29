import React from 'react'

export default class Preview extends React.Component {
    render() {
        return (
            <div className='box' style={{width: '800px', height:'475px'}}>
                <div className='sub-title'>Preview
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-play"></use>
                    </svg>
                </div>

            </div>
        );
    }
} 