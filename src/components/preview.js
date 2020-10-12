import React from "react"
import Graph from "./preview/graph"

export default class Preview extends React.Component {
    render() {
        return (
            <div className='preview-box'>
                <div className='sub-title'>&nbsp;Preview
                    <svg className="icon" aria-hidden="true" >
                        <use xlinkHref="#icon-play"></use>
                    </svg>
                </div>
                <Graph />

            </div>
        );
    }
}
