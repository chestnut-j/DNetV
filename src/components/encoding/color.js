import { Button } from 'antd'
import React from 'react'
import {ChromePicker} from 'react-color'


export default class Color extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            color: '#FFFFFF',
            colorPickerDisplay:false
        }
    }
    handleClick= () => {
        this.setState({
            colorPickerDisplay:!this.state.colorPickerDisplay
        })
        console.log("display",this.state.colorPickerDisplay)
    }
    handleColorChange=(colorCode)=> {
        this.setState(
            state =>({color:colorCode.hex}),
            ()=>{
                console.log("color",this.state.color)
            }
        )
        if (this.props.onSubmit) {
            this.props.onSubmit(colorCode)
        }
    }
    render() {
        return (
            <div className='encoding-item'>
                <div className="encoding-divider">Color</div>
                <div className='color-item'>
                    <div className='color-ctrl'>
                        <div className='color-circle1'></div>
                        <div className='color-circle2' style={{backgroundColor:this.state.color}}></div>
                    </div>
                    <div className='color-picker-box'>
                        <Button onClick={this.handleClick}> Choose Color</Button>
                        <div>
                            {this.state.colorPickerDisplay ? ( <ChromePicker className="color-picker" 
                            if-show={this.state.colorPickerDisplay}
                            color={this.state.color} 
                            onChange={this.handleColorChange} />):null} 
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}