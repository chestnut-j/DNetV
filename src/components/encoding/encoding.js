import React from 'react'
import { Button, Select, Input } from 'antd'
import { ChromePicker } from 'react-color'
import './encoding.css'

const { Option } = Select
const colorIndexToName = ['strokeColor', 'fillColor', 'textColor']
export default class Encoding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            encodingType: this.props.options.encodingType,
            visible: this.props.options.visible,
            position: this.props.options.position,
            color: this.props.options.color,
            animation: this.props.options.animation,
            link: this.props.options.link,
            glyph: this.props.options.glyph,
            colorPickerDisplay: false,
            isVisible: this.props.options.visible !== 'dashed' ? true : false,
            elementColorPickerDisplay: [false, false, false]
        }
    }
    switchVisibleClick = (value) => {
        this.props.onSubmit({
            visible: {
                isVisible: value
            }
        })
    }
    handleInvisibleClick = () => {
        this.setState(
            (state) => ({
                visible: 'dashed',
                isVisible: false
            }),
            () => {
                this.handleSubmitOptions()
            }
        )
    }
    handleColorClick = () => {
        this.setState({
            colorPickerDisplay: !this.state.colorPickerDisplay
        })
        console.log('display', this.state.colorPickerDisplay)
    }
    handleColorChange = (colorCode) => {
        this.setState(
            (state) => ({ color: colorCode.hex }),
            () => {
                this.handleSubmitOptions()
            }
        )
    }
    handleSubmitOptions() {
        if (this.props.onSubmit) {
            const { visible, position, color, animation, link, glyph } = this.state
            this.props.onSubmit({ visible, position, color, animation, link, glyph })
        }
    }
    handleButtonOnClick(type, event) {
        console.log('handleButtonOnClick(type, event)', type, event)
        const tempArr = [...this.props.options.encodingType]
        const tempIndex = tempArr.indexOf(type)
        if (tempIndex === -1) {
            tempArr.push(type)
        } else {
            tempArr.splice(tempIndex, 1)
        }
        this.props.onSubmit({
            encodingType: tempArr
        })
    }
    changeElementStyle = (option) => {
        const changeKey = this.props.relationOptions.chooseItem.split('-').join('')
        const changeOptions = this.props.relationOptions[changeKey]
        this.props.onSubmitToRelation({ [changeKey]: { ...changeOptions, ...option } })
    }
    handleShapeChange = (value) => {
        this.changeElementStyle({ shape: value })
    }
    handleStrokeTypeChange = (value) => {
        this.changeElementStyle({ strokeType: value })
    }
    handleStrokeWidthChange = (e) => {
        const { value } = e.target
        this.changeElementStyle({ strokeWidth: Number(value) })
    }
    handleRadiusChange = (e) => {
        const { value } = e.target
        this.changeElementStyle({ radius: Number(value) })
    }
    handleElementColorChange = (colorCode, index) => {
        this.changeElementStyle({ [colorIndexToName[index]]: colorCode.hex })
    }

    handleElementColorClick = (e, index) => {
        const tempArr = this.state.elementColorPickerDisplay
        tempArr[index] = !tempArr[index]
        this.setState({
            elementColorPickerDisplay: tempArr
        })
    }
    handleTimeOptionsInput = (e, option, key) => {
        const { value } = e.target
        const optionObject = this.props.options[option]
        optionObject[key] = Number(value)
        this.props.onSubmit({ [option]: optionObject })
    }

    render() {
        let changeKey = this.props.relationOptions.chooseItem.split('-')
        const isNode = changeKey[1] === 'Node' ? true : false
        changeKey = changeKey.join('')
        const changeOptions = this.props.relationOptions[changeKey]
        const options = this.props.options
        return (
            <div className="encoding-box">
                <div className="sub-title">
                    &nbsp;Encoding
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-save"></use>
                    </svg>
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-set"></use>
                    </svg>
                </div>
                <div className="encoding-table-container">
                    {/* visble */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.encodingType.indexOf('visible') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('visible', e)
                                }}
                                block
                            >
                                Visible
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="visible-ctrl item-ctrl">
                                <div
                                    className="visible-circle1 item-circle1"
                                    style={{ borderStyle: this.state.visible }}
                                ></div>
                                <div
                                    className="visible-circle2 item-circle2"
                                    style={{ borderStyle: this.state.visible }}
                                ></div>
                            </div>
                            <div className="visible-picker-box">
                                <Button
                                    id="visible-button"
                                    onClick={() => this.switchVisibleClick(true)}
                                    style={{
                                        color: options.visible.isVisible ? '#6495ED' : '#B0C4DE',
                                        borderColor: options.visible.isVisible
                                            ? '#6495ED'
                                            : '#B0C4DE',
                                        borderWidth: options.visible.isVisible ? '2px' : '1px'
                                    }}
                                >
                                    {' '}
                                    Visible{' '}
                                </Button>
                                <Button
                                    id="invisible-button"
                                    onClick={() => this.switchVisibleClick(false)}
                                    style={{
                                        color: !options.visible.isVisible ? '#6495ED' : '#B0C4DE',
                                        borderColor: !options.visible.isVisible
                                            ? '#6495ED'
                                            : '#B0C4DE',
                                        borderWidth: !options.visible.isVisible ? '2px' : '1px'
                                    }}
                                >
                                    {' '}
                                    Invisible
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* position */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.encodingType.indexOf('position') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('position', e)
                                }}
                                block
                            >
                                Position
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="position-ctrl item-ctrl">
                                <div className="position-circle1 item-circle1"></div>
                                <div className="position-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <text>TotalWidth:</text>
                                    <Input
                                        value={options.position.totalWidth}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'position', 'totalWidth')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                                <div className="item-right-option">
                                    <text>EachWidth:</text>
                                    <Input
                                        value={options.position.eachWidth}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'position', 'eachWidth')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* animaiton */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.encodingType.indexOf('animation') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('animation', e)
                                }}
                                block
                            >
                                Animaiton
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="animation-ctrl item-ctrl">
                                <div className="animation-circle1 item-circle1"></div>
                                <div className="ellipse1"></div>
                                <div className="ellipse2"></div>
                                <div className="ellipse3"></div>
                                <div className="animation-circle2 item-circle2"></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <text>Speed:</text>
                                    <Input
                                        value={options.animation.speed}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'animation', 'speed')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* color */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.encodingType.indexOf('color') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('color', e)
                                }}
                                block
                            >
                                Color
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="color-ctrl item-ctrl">
                                <div className="color-circle1 item-circle1"></div>
                                <div
                                    className="color-circle2 item-circle2"
                                    style={{ backgroundColor: this.state.color }}
                                ></div>
                            </div>
                            <div className="item-right-container">
                                <div className="item-right-option">
                                    <text>Number:</text>
                                    <Input
                                        value={options.color.number}
                                        type="number"
                                        onChange={(e) =>
                                            this.handleTimeOptionsInput(e, 'color', 'number')
                                        }
                                        style={{ width: '65px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* link */}
                    <div className="encoding-item">
                        <div className="encoding-item-title">
                            <Button
                                type={
                                    this.props.options.encodingType.indexOf('link') > -1
                                        ? 'primary'
                                        : 'default'
                                }
                                onClick={(e) => {
                                    this.handleButtonOnClick('link', e)
                                }}
                                block
                            >
                                Link
                            </Button>
                        </div>
                        <div className="encoding-item-content">
                            <div className="link-ctrl item-ctrl">
                                <div className="link-circle1 item-circle1"></div>
                                <div className="wavy"></div>
                                <div className="link-circle2 item-circle2"></div>
                            </div>
                        </div>
                    </div>

                    {/* 针对具体元素的编码配置 */}
                    <div className="change-option-panle">
                        {/* 选择形状：圆形、三角形、方形 */}
                        {changeOptions.shape ? (
                            <div className="change-option-item">
                                <text>Shape:</text>
                                <Select
                                    value={changeOptions.shape}
                                    onChange={this.handleShapeChange}
                                    style={{ width: 120 }}
                                >
                                    <Option key="circle">
                                        <div>circle</div>
                                    </Option>
                                    <Option key="rect">
                                        <div>rect</div>
                                    </Option>
                                </Select>
                            </div>
                        ) : null}
                        {/* 选择线型 */}
                        <div className="change-option-item">
                            <text>StrokeType:</text>
                            <Select
                                value={changeOptions.strokeType}
                                style={{ width: 120 }}
                                onChange={this.handleStrokeTypeChange}
                            >
                                <Option value="solid">solid</Option>
                                <Option value="dashed">dashed</Option>
                            </Select>
                        </div>
                        {/* 输入线宽 */}
                        <div className="change-option-item">
                            <text>StrokeWidth:</text>
                            <Input
                                value={changeOptions.strokeWidth}
                                type="number"
                                onChange={this.handleStrokeWidthChange}
                                style={{ width: '120px' }}
                            />
                        </div>
                        {/* 输入半径长度 */}
                        {changeOptions.radius ? (
                            <div className="change-option-item">
                                <text>Radius:</text>
                                <Input
                                    value={changeOptions.radius}
                                    type="number"
                                    onChange={this.handleRadiusChange}
                                    style={{ width: '120px' }}
                                />
                            </div>
                        ) : null}
                        {/* 节点的外边颜色或 线型颜色 */}
                        {
                            <div>
                                <div className="change-option-item">
                                    <div>strokeColor</div>
                                    <div
                                        onClick={(e) => this.handleElementColorClick(e, 0)}
                                        style={{
                                            backgroundColor: changeOptions.strokeColor,
                                            width: '120px',
                                            height: '32px'
                                        }}
                                    ></div>
                                </div>
                                {this.state.elementColorPickerDisplay[0] ? (
                                    <ChromePicker
                                        className="item-color-picker"
                                        color={changeOptions.strokeColor}
                                        onChange={(value) =>
                                            this.handleElementColorChange(value, 0)
                                        }
                                    />
                                ) : null}
                            </div>
                        }
                        {/* 节点内部的填充颜色 */}
                        {changeOptions.fillColor ? (
                            <div>
                                <div className="change-option-item">
                                    <div>fillColor</div>
                                    <div
                                        onClick={(e) => this.handleElementColorClick(e, 1)}
                                        style={{
                                            backgroundColor: changeOptions.fillColor,
                                            width: '120px',
                                            height: '32px'
                                        }}
                                    ></div>
                                </div>
                                {this.state.elementColorPickerDisplay[1] ? (
                                    <ChromePicker
                                        className="item-color-picker"
                                        color={changeOptions.fillColor}
                                        onChange={(value) =>
                                            this.handleElementColorChange(value, 1)
                                        }
                                    />
                                ) : null}
                            </div>
                        ) : null}
                        {/* 节点内部的填充颜色 */}
                        {changeOptions.textColor ? (
                            <div>
                                <div className="change-option-item">
                                    <div>textColor</div>
                                    <div
                                        onClick={(e) => this.handleElementColorClick(e, 2)}
                                        style={{
                                            backgroundColor: changeOptions.textColor,
                                            width: '120px',
                                            height: '32px'
                                        }}
                                    ></div>
                                </div>
                                {this.state.elementColorPickerDisplay[2] ? (
                                    <ChromePicker
                                        className="item-color-picker"
                                        color={changeOptions.textColor}
                                        onChange={(value) =>
                                            this.handleElementColorChange(value, 2)
                                        }
                                    />
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}
