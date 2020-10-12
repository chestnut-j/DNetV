import React from "react"

export default class Template extends React.Component {
    render() {
        return (
            <div className="box" style={{ width: "600px", height: "120px" }}>
                <div className="sub-title">
                    &nbsp;Template
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-add"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-download"></use>
                    </svg>
                </div>
            </div>
        )
    }
}
