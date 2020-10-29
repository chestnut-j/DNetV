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
                color: '#FFFFFF',
                animation:'',
                link:'',
                glyph:'',
        }
    }
    handleSubmitColor=(colorCode)=> {
        this.setState(
            state =>({color: colorCode.hex}),
            ()=>{
                console.log("color",this.state.color)
                this.handleSubmitOptions()
            }
        )
        
    }
    handleSubmitOptions() {
        if (this.props.onSubmit) {
            if(this.props.relationType === 'appear'){
                const {visible, position, color, animation, link, glyph} = this.state
                this.setState(
                    state =>({appearOptions:{visible, position, color, animation, link, glyph}}),
                    ()=>{
                        const {appearOptions, stableOptions, disappearOptions} = this.state
                        this.props.onSubmit({appearOptions, stableOptions, disappearOptions})
                        console.log(appearOptions)
                    }
                )
            }
        }
        console.log("color option",this.state.color)
        console.log("pre color",this.props.preColor)
    }
    render() {
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
                  <Color preColor={this.props.preColor} onSubmit={this.handleSubmitColor}/>
                  <Animation />
                  <Link />   
                  <Glyph/>    
              </div>
          )
        }

}
