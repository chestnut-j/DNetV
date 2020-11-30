import React from "react"
import { Button } from 'antd'
import {ChromePicker} from 'react-color'
import './encoding.css'


export default class Encoding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            encodingType: this.props.options.encodingType,
            visible: this.props.options.visible,
            position: this.props.options.position,
            color: this.props.options.color,
            animation:this.props.options.animation,
            link:this.props.options.link,
            glyph:this.props.options.glyph,
            colorPickerDisplay:false,
            isVisible:(this.props.options.visible!=='dashed')?true:false,
        }
    }
    handleVisibleClick=()=>{
        this.setState(
            state =>({
                visible:'solid',
                isVisible:true
            }),
            ()=>{
                this.handleSubmitOptions()
            }
        )
    }
    handleInvisibleClick=()=>{
        this.setState(
            state =>({
                visible:'dashed',
                isVisible: false
            }),
            ()=>{
                    this.handleSubmitOptions()
            }
        )
    }
    handleColorClick= () => {
        this.setState({
            colorPickerDisplay:!this.state.colorPickerDisplay
        })
        console.log("display",this.state.colorPickerDisplay)
    }
    handleColorChange=(colorCode)=> {
        this.setState(
            state =>({color:colorCode.hex}),
            ()=>{
                this.handleSubmitOptions()
            }
        )
    }
    handleSubmitOptions() {
        if (this.props.onSubmit) {
                const {visible, position, color, animation, link, glyph} = this.state
                this.props.onSubmit({visible, position, color, animation, link, glyph})
        }
    }
    handleButtonOnClick(type, event){
        console.log("handleButtonOnClick(type, event)", type, event);
        this.props.onSubmit({
            encodingType: type
        })
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

                    {/* visble */}
                    <div className='encoding-item'>
                        <div className="encoding-item-title" >
                            <Button 
                                type= {this.props.options.encodingType ==='visible'? 'primary' : 'default' }
                                onClick = {(e)=>{this.handleButtonOnClick('visible', e)}}
                            block>
                                Visible
                            </Button>
                        </div>
                        <div className='visible-ctrl item-ctrl'>
                            <div className='visible-circle1 item-circle1' style={{borderStyle:this.state.visible}}></div>
                            <div className='visible-circle2 item-circle2' style={{borderStyle:this.state.visible}}></div>
                        </div>
                        <div className='visible-picker-box'>
                        <       Button id='visible-button' 
                                        onClick={this.handleVisibleClick}
                                        style={{
                                            color: (this.state.isVisible)? '#6495ED' : '#B0C4DE',
                                            borderColor: (this.state.isVisible)? '#6495ED' : '#B0C4DE',
                                            borderWidth: (this.state.isVisible)? '2px' : '1px'
                                        }}
                                > Visible </Button>
                                <Button id='invisible-button'
                                        onClick={this.handleInvisibleClick} 
                                        style={{
                                            color: (!this.state.isVisible)? '#6495ED' : '#B0C4DE',
                                            borderColor: (!this.state.isVisible)? '#6495ED' : '#B0C4DE',
                                            borderWidth: (!this.state.isVisible)? '2px' : '1px'
                                        }}
                                > Invisible 
                                </Button>
                                
                        </div>
                    </div>

                    {/* position */}
                    <div className='encoding-item'>
                        <div className="encoding-item-title" >
                            <Button 
                                type= {this.props.options.encodingType ==='position'? 'primary' : 'default' }
                                onClick = {(e)=>{this.handleButtonOnClick('position', e)}}
                            block>
                                Position
                            </Button>
                        </div>
                        <div className='position-ctrl item-ctrl'>
                            <div className='position-circle1 item-circle1'></div>
                            <div className='position-circle2 item-circle2'></div>
                        </div>
                    </div>

                    {/* animaiton */}
                    <div className='encoding-item'>
                        <div className="encoding-item-title" >
                            <Button 
                                type= {this.props.options.encodingType ==='animaiton'? 'primary' : 'default' }
                                onClick = {(e)=>{this.handleButtonOnClick('animaiton', e)}}
                            block>
                                Animaiton
                            </Button>
                        </div>
                        <div className='animation-ctrl item-ctrl'>
                            <div className='animation-circle1 item-circle1'></div>
                            <div className='ellipse1'></div>
                            <div className='ellipse2'></div>
                            <div className='ellipse3'></div>
                            <div className='animation-circle2 item-circle2'></div>
                        </div>
                    </div>

                    {/* color */}
                    <div className='encoding-item'>
                        <div className="encoding-item-title" >
                            <Button 
                                type= {this.props.options.encodingType ==='color'? 'primary' : 'default' }
                                onClick = {(e)=>{this.handleButtonOnClick('color', e)}}
                            block>
                                Color
                            </Button>
                        </div>
                        <div className='color-item'>
                            <div className='color-ctrl item-ctrl'>
                                <div className='color-circle1 item-circle1'></div>
                                <div className='color-circle2 item-circle2' style={{backgroundColor:this.state.color}}></div>
                            </div>
                            <div className='color-picker-box'>
                                <Button onClick={this.handleColorClick}> Choose Color</Button>
                                <div>
                                    {this.state.colorPickerDisplay ? ( <ChromePicker className="color-picker" 
                                    color={this.state.color} 
                                    onChange={this.handleColorChange} />):null} 
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    {/* link */}
                    <div className='encoding-item'>
                        <div className="encoding-item-title" >
                            <Button 
                                type= {this.props.options.encodingType ==='link'? 'primary' : 'default' }
                                onClick = {(e)=>{this.handleButtonOnClick('link', e)}}
                            block>
                                Link
                            </Button>
                        </div>
                        <div className='link-ctrl item-ctrl'>
                            <div className='link-circle1 item-circle1'></div>
                            <div className='wavy'></div>
                            <div className='link-circle2 item-circle2'></div>
                        </div>
                    </div>
              </div>
        )
    }
}
