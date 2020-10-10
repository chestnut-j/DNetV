import React from "react"

export default class Grammar extends React.Component {
  render() {
    return (
      <div className="box" style={{ width: "200px", height: "620px" }}>
        <div className="sub-title">
          &nbsp;Grammar
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
