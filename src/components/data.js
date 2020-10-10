import React from "react"

export default class Data extends React.Component {
  render() {
    return (
      <div className="box">
        <div className="sub-title">
          {" "}
          &nbsp; Data
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-add"></use>
          </svg>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#icon-center"></use>
          </svg>
        </div>
        <div className="divider">Overview</div>
        <div className="item">
          Name:XXX &nbsp;&nbsp; #Times:12 <br />
          #Nodes:222 &nbsp;&nbsp; #Edges:55
        </div>
        <div className="divider">Selection</div>
        <div className="divider">Group</div>
      </div>
    )
  }
}
