import React, { useEffect, useState, useRef } from 'react'
import { Slider } from 'antd'
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons'
import NodeLinkGraph from '../../nodeLinkGraph/nodeLinkGraph.js'
import './timeAnimationDnet.css'

export default function TimeAnimationDnet(props) {
    const [frameIndex, setFrameIndex] = useState(0)
    const [playOrPause, setPlayOrPause] = useState(false)
    let timeout
    useEffect(() => {
        if (timeout) {
            clearTimeout(timeout)
        }
        // 切换数据后暂停，帧号归零
        setPlayOrPause(false)
        setFrameIndex(0)
        setTimeout(() => {
            // 将playOrPause改成true会自动播放动画，所以不用去单独执行controlAnimation函数
            setPlayOrPause(true)
        }, props.speed)
    }, [props.data])

    useEffect(() => {
        controlAnimation()
    }, [frameIndex])

    useEffect(() => {
        if (playOrPause) {
            controlAnimation()
        }
    }, [playOrPause])

    if (props.data.length === 0) return null

    function handlePlayOrPause() {
        setPlayOrPause(!playOrPause)
    }

    function controlAnimation() {
        // 清除之前的定时器
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            if (playOrPause) {
                const len = props.data.length
                const nextFrame = (frameIndex + 1) % len
                setFrameIndex(nextFrame)
            }
        }, props.speed)
    }
    // console.log("-----comparisonOptions---", props.comparisonOptions)
    return props.data[frameIndex] ? (
        <div className="TimeAnimationDnet graph">
            <NodeLinkGraph
                data={props.data[frameIndex]}
                height={props.height}
                width={props.width}
                margin={props.margin}
                comparisonOptions={props.comparisonOptions}
            />
            <div className="tad-control-container">
                {playOrPause ? (
                    <PauseCircleOutlined className="tad-control-icon" onClick={handlePlayOrPause} />
                ) : (
                        <PlayCircleOutlined className="tad-control-icon" onClick={handlePlayOrPause} />
                    )}
                <Slider
                    style={{
                        width: '150px',
                        marginLeft: '20px'
                    }}
                    included={false}
                    value={frameIndex}
                    min={0}
                    max={props.data.length - 1}
                    tooltipVisible
                    tooltipPlacement={'bottom'}
                />
            </div>
        </div>
    ) : null
}
