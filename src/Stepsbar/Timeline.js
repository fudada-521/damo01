import React from "react";
import { useState, useEffect } from 'react';
import { Steps, Switch } from 'antd';
import { CaretRightOutlined, StepForwardOutlined } from "@ant-design/icons";
// 年、月 模式切换
function SwitchYearAndMonth({ playMode, setPlayMode }) {
    return (
        <Switch
            size="small"
            checkedChildren="年"
            unCheckedChildren="月"
            style={{
                backgroundColor: 'rgba(9, 71, 149, 1)',
            }}
            checked={playMode}
            onChange={setPlayMode}

        />
    );
}
// 播放、暂停按钮
function ControllerWidget({ playingStatus, setPlayingStatus }) {
    // 文字样式
    var style = {
        color: '#666666',
        fontSize: '13px',
        padding: '5px 0px',
        width: '60px'
    }

    return (
        <div style={style} onClick={setPlayingStatus}>
            {!playingStatus ? <CaretRightOutlined /> : <StepForwardOutlined />}
            <span style={style}>{!playingStatus ? '播放' : '暂停'}</span>
        </div>
    );
}


/// 步骤条Widget
function StepsWidget({ items, current }) {
    return (
        <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '3px',
            paddingLeft: '5px',
            paddingRight: '5px',
            paddingTop: '5px',
            paddingBottom: '5px',
        }}>
            <Steps
                progressDot
                current={current}
                direction="vertical"
                items={items}
            />

        </div>
    );
}
const itemsByYear = [
    {
        title: '2018'
    },
    {
        title: '2019'
    },
    {
        title: '2020'
    },
    {
        title: '2022'
    },
    {
        title: '2023'
    },

];
const itemsByMonth = [
    {
        title: '2019-01'
    },
    {
        title: '2019-02'
    },
    {
        title: '2019-03'
    },
    {
        title: '2019-04'
    },
    {
        title: '2019-05'
    },
    {
        title: '2019-06'
    },
    {
        title: '2019-07'
    },
    {
        title: '2019-08'
    },
    {
        title: '2019-09'
    },
    {
        title: '2019-10'
    },
    {
        title: '2019-11'
    },
    {
        title: '2019-12'
    },

];

/// 时间条
const TimelineComponent = ({ model, itmes, onChange }) => {
    // 播放模式：逐年/逐月
    const [isByYear, setPlayMode] = useState(true);
    // 播放控制：播放、暂停,默认未播放
    const [isPlaying, setPlayingStatus] = useState(false);
    const [timelineItems, setTimelineItems] = useState(itemsByYear);
    const [currentIndex, setCurrentIndex] = useState(0);

    // 切换播放模式
    function handlePlayModeChange() {
        // 切换计时器状态

        // 如果计时器关闭，重置计数
        if (!isPlaying) {
            setCurrentIndex(0);
        }
        if (isByYear) {
            setPlayMode(!isByYear);
            setCurrentIndex(0);
            setTimelineItems(itemsByMonth);
            setPlayingStatus(false);
        } else {
            setPlayMode(!isByYear);
            setCurrentIndex(0);
            setTimelineItems(itemsByYear);
            setPlayingStatus(false);
        }
    }

    // 播放状态
    function handlePlayingStatus() {
        setPlayingStatus(!isPlaying);
    }


    useEffect(() => {
        let intervalId;

        if (isPlaying) {
            // 开始计时任务
            intervalId = setInterval(() => {
                if (isByYear) {
                    setCurrentIndex(prevCount => (prevCount >= 4 ? 0 : prevCount + 1));
                } else {
                    setCurrentIndex(prevCount => (prevCount >= 11 ? 0 : prevCount + 1));
                }
            }, 500);
        } else {
            // 清除定时器
            clearInterval(intervalId);
        }

        // 在组件卸载时清除定时器
        return () => clearInterval(intervalId);
    }, [isPlaying, isByYear]);


    return (
        <>
            <SwitchYearAndMonth playMode={isByYear} setPlayMode={() => handlePlayModeChange()} />
            <ControllerWidget playingStatus={isPlaying} setPlayingStatus={() => handlePlayingStatus()} />
            <StepsWidget items={timelineItems} current={currentIndex} />
        </>
    );
}

export default TimelineComponent;