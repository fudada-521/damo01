import React from "react";
import { useState, useEffect } from "react";
// import { Switch } from "antd";
import { CaretRightOutlined, StepForwardOutlined } from "@ant-design/icons";
import "./Timeline.css";

// 年、月 模式切换
// function SwitchYearAndMonth({ playMode, setPlayMode }) {
//   return (
//     <Switch
//       size="small"
//       checkedChildren="年"
//       unCheckedChildren="月"
//       style={{
//         backgroundColor: "rgba(9, 71, 149, 1)",
//       }}
//       checked={playMode}
//       onChange={setPlayMode}
//     />
//   );
// }

// 播放、暂停按钮
function ControllerWidget({ playingStatus, setPlayingStatus }) {
  // 文字样式
  var style = {
    color: "#666666",
    fontSize: "13px",
    padding: "5px 0px",
    width: "60px",
  };

  return (
    <div style={style} onClick={setPlayingStatus}>
      {!playingStatus ? <CaretRightOutlined /> : <StepForwardOutlined />}
      <span style={style}>{!playingStatus ? "播放" : "暂停"}</span>
    </div>
  );
}

/// 步骤条Widget
function StepsWidget({ height, items, percent }) {
  const itemHeight = height / items.length;
  const itemHeight2 = height / (items.length - 1);
  return (
    <div className="bar" style={{ height: `${height + itemHeight}px` }}>
      <div className="bar-body" style={{ height: `${height}px` }}>
        {/* 进度条 */}

        <div style={{ height: "100%", position: "relative" }}>
          <div className="bar-outline">
            <div className="bar-color" style={{ height: `${percent}%` }} />
          </div>
          <div
            style={{
              height: `${height + itemHeight}px`,
              position: "absolute",
              top: "-3px",
              left: "-1px",
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  height: `${itemHeight2}px`,
                  width: "5px",
                }}
              >
                <div
                  style={{
                    height: "7px",
                    width: "7px",
                    border: "1px solid #fff",
                    backgroundColor: "rgba(9, 71, 149, 1)",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* item */}
        <div
          className="bar-item-board"
          style={{ height: `${height + itemHeight}px` }}
        >
          {items.map((item, index) => (
            <div
              className="bar-item"
              key={index}
              style={{
                height: `${itemHeight2}px`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/// 时间条
/// model：播放模式，year，month
/// items：时间轴节点
/// onChange：播放过程中的回调
const TimelineComponent = ({ model, itmes, onChange }) => {
  const height = model === "year" ? 200 : 300;
  const length = itmes.length; // 一共需要几个时间轴节点
  const size = 100.0 / (length - 1); // 每两个时间轴节点的之间（一段）占整个时间轴的百分比

  // 播放模式：逐年/逐月
  // const [playMode, setPlayMode] = useState(model === 'year');

  // 播放控制：播放、暂停,默认未播放
  const [playingStatus, setPlayingStatus] = useState(false);

  // 当前的进度百分比
  const [percent, setPercent] = useState(0.0);

  // 切换播放模式
  // function handlePlayModeChange() {
  //     if (!playingStatus) {
  //         setPercent(0);
  //     }
  //     if (playMode) {
  //         setPlayMode(!playMode);
  //         setPlayingStatus(false);
  //         setPercent(0);
  //     } else {
  //         setPlayMode(!playMode);
  //         setPlayingStatus(false);
  //         setPercent(0);
  //     }
  // }

  // 播放状态
  function handlePlayingStatus() {
    setPlayingStatus(!playingStatus);
  }

  useEffect(() => {
    let intervalId;
    if (playingStatus) {
      // 开始计时任务
      intervalId = setInterval(() => {
        setPercent((prevCount) => (prevCount >= 99 ? 0 : prevCount + size));
      }, 1000);
    } else {
      // 清除定时器
      clearInterval(intervalId);
    }

    // 在组件卸载时清除定时器
    return () => clearInterval(intervalId);
  }, [playingStatus, size]);
  return (
    <div style={{ display: "inline-block" }}>
      {/* <SwitchYearAndMonth playMode={playMode} setPlayMode={() => handlePlayModeChange()} /> */}
      <ControllerWidget
        playingStatus={playingStatus}
        setPlayingStatus={() => handlePlayingStatus()}
      />
      <StepsWidget height={height} items={itmes} percent={percent} />
    </div>
  );
};

export default TimelineComponent;
