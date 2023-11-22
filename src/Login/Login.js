import React from "react";
import "./Login.css";
import TimelineComponent from "../Stepsbar/Timeline";

// 页面主体
export default function Login() {
  const itmesForYear = ["2017", "2018", "2019", "2020", "2021", "2022", "2023"];
  const itmesForMonth = [
    "2017-01",
    "2017-02",
    "2017-03",
    "2017-04",
    "2017-05",
    "2017-06",
    "2017-07",
    "2017-08",
    "2017-09",
    "2017-10",
    "2017-11",
    "2017-12",
  ];

  return (
    <>
      <div className="login">
        <TimelineComponent
          model={"year"}
          itmes={itmesForYear}
          onChange={() => {
            console.log("触发回调");
          }}
        />
        <TimelineComponent
          model={"month"}
          itmes={itmesForMonth}
          onChange={() => {
            console.log("触发回调");
          }}
        />
      </div>
    </>
  );
}
