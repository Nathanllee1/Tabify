import React, { useState, useEffect } from "react";

function ProgressBar(props) {
  const { is_paused, is_active, start_position, duration } = props;
  var [position, setPosition] = useState(start_position);

  const timer = () => {
    var interval = setInterval(() => {
      if (!is_paused && is_active) {
        setPosition((position) => position + 100);
      }
      clearInterval(interval);
      return;
    }, 100);
    return () => {
      clearInterval(interval);
    };
  };
  useEffect(timer, [position, is_paused]);
  return (
    <div class="demo-wrapper html5-progress-bar">
      <div class="progress-bar-wrapper">
        <progress id="progressbar" value={position} max={duration}></progress>
      </div>
    </div>
  );
}
export default ProgressBar;
