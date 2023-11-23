import React from "react";
import { useState, useEffect } from "react";
import { CaretRightOutlined, StepForwardOutlined } from "@ant-design/icons";
import "./Timeline.css";
// 用法示例：
// const itmesForYear = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];
//   const itmesForMonth = [
//     "2017-01",
//     "2017-02",
//     "2017-03",
//     "2017-04",
//     "2017-05",
//     "2017-06",
//     "2017-07",
//     "2017-08",
//     "2017-09",
//     "2017-10",
//     "2017-11",
//     "2017-12",
//   ];

//   return (
//     <>
//       <div className="login">
//         <TimelineComponent
//           model={"year"}
//           itmes={itmesForYear}
//           onChange={() => {
//             console.log("触发回调");
//           }}
//         />
//         <TimelineComponent
//           model={"month"}
//           itmes={itmesForMonth}
//           onChange={() => {
//             console.log("触发回调");
//           }}
//         />
//       </div>
//     </>
//   );

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
  return (
    <div className="play" onClick={setPlayingStatus}>
      {!playingStatus ? <CaretRightOutlined /> : <StepForwardOutlined />}
      <span className="play">{!playingStatus ? "播放" : "暂停"}</span>
    </div>
  );
}

/// 进度条-底部色条

function BarBaseLine() {
  return <div className="bar-base-line" />;
}
// 进度条-进度值色条
function BarColorLine({ percent }) {
  return <div className="bar-color-line" style={{ height: `${percent}%` }} />;
}
/// 圆点
function BarPoint() {
  return <div className="bar-point" />;
}
// 进度条-圆点条
function BarPointLine({ items }) {
  return (
    <div className="bar-point-line">
      {items.map((item, index) => (
        <BarPoint key={index} />
      ))}
    </div>
  );
}

// 文字item
function BarText({ title }) {
  return <div className="bar-text">{title}</div>;
}

function BarTextLine({ items }) {
  return (
    <div className="bar-text-line">
      {items.map((item, index) => (
        <BarText key={index} title={item} />
      ))}
    </div>
  );
}

/// 步骤条Widget
function StepsWidget({ height, items, percent }) {
  const subHeight = height / items.length;
  return (
    // 半透明圆角背景色
    <div className="bar">
      <div className="bar-container" style={{ height: `${height}px` }}>
        <div
          className="bar-container-major"
          style={{
            height: `${height - subHeight / 2}px`,
            marginTop: `${subHeight / 4}px`,
          }}
        >
          <BarBaseLine />
          <BarColorLine percent={percent} />
          <BarPointLine items={items} />
        </div>

        {/* 文字部分 */}
        <BarTextLine items={items} />
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
