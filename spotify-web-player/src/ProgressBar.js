import React, { useState, useEffect } from "react";
import "./progress.css";

function ProgressBar(props) {
  const { is_paused, is_active, start_position, currentPosition, duration } = props;
  var [position, setPosition] = useState(currentPosition);

  /* the issue is that the state isn't getting updated in time */ 
  console.log("resetting, current position = " + position);
  useEffect(() => {
    var interval = setInterval(() => {
      if (is_active && !is_paused) {
      //  console.log(position);
        setPosition((position) => position + 100);
      }
      clearInterval(interval);
      return;
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [position, currentPosition, is_paused]);

  return (
    <div className="demo-wrapper html5-progress-bar">
      <div className="progress-bar-wrapper">
        <progress id="progressbar" value={position} max={duration}></progress>
      </div>
    </div>
  );
}
export default ProgressBar;
