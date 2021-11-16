import React, { useState, useEffect } from "react";
import "./progress.css";

function ProgressBar(props) {
  const { is_paused, is_active, start_position, duration } = props;
  var [position, setPosition] = useState(start_position);

  console.log(start_position);
  const timer = () => {
    var interval = setInterval(() => {
      if (!is_paused && is_active) {
      //  console.log(position);
        setPosition((position) => position + 10);
      }
      clearInterval(interval);
      return;
    }, 10);
    return () => {
      clearInterval(interval);
    };
  };

  useEffect(timer, [position, is_paused]);
  return (
    <div className="demo-wrapper html5-progress-bar">
      <div className="progress-bar-wrapper">
        <progress id="progressbar" value={position} max={duration}></progress>
      </div>
    </div>
  );
}
export default ProgressBar;
