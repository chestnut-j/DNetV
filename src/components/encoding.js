import React from "react"
import Visible from "./encoding/visible"
import Position from "./encoding/position"
import Color from "./encoding/color"
import Animation from "./encoding/animation"
import Link from "./encoding/link"
import Glyph from "./encoding/glyph"

export default class Encoding extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if(this.props.relationType === 1)  {
            return (
              <div className='encoding-box'>
                  <div className='sub-title'>&nbsp;Encoding
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-save"></use>
                      </svg>
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-set"></use>
                      </svg> 
                  </div>
                  <Visible />
                  <Position />
                  <Color />
                  <Animation />
                  <Link />   
                  <Glyph/>    
              </div>
          )
        }

        if(this.props.relationType === 2)  {
            return (
              <div className='encoding-box'>
                  <div className='sub-title'>&nbsp;Encoding
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-save"></use>
                      </svg>
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-set"></use>
                      </svg> 
                  </div>
                  <Visible />
                  <Position />
                  <Color />
                  <Animation />
                  <Link />       
              </div>
          )
        }

        if(this.props.relationType === 3)  {
            return (
              <div className='encoding-box'>
                  <div className='sub-title'>&nbsp;Encoding
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-save"></use>
                      </svg>
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-set"></use>
                      </svg> 
                  </div>
                  <Visible />
                  <Position />
                  <Color />       
              </div>
          )
        }

        if(this.props.relationType === 4)  {
            return (
              <div className='encoding-box'>
                  <div className='sub-title'>&nbsp;Encoding
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-save"></use>
                      </svg>
                      <svg className="icon" aria-hidden="true" >
                          <use xlinkHref="#icon-set"></use>
                      </svg> 
                  </div>
                  <Visible />
                  <Position />
                  <Color />
                  <Glyph/>        
              </div>
          )
      }
    }
}
