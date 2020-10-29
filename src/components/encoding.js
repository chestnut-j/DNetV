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
        this.state={
            visible:'',
            position:'',
            color: '',
            animation:'',
            link:'',
            glyph:''
        }
    }
    handleSubmitColor=(colorCode)=> {
        this.setState(
            state =>({color:colorCode.hex}),
            ()=>{
                console.log("color",this.state.color)
                this.handleSubmitOptions()
            }
        )
        
    }
    handleSubmitOptions() {
        if (this.props.onSubmit) {
            const {visible, position, color, animation, link, glyph} = this.state
            this.props.onSubmit({visible, position, color, animation, link, glyph})
        }
        console.log("color option",this.state.color)
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
                  <Color onSubmit={this.handleSubmitColor}/>
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

        
    }
}
