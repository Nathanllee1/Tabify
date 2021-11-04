import React, { useState, useEffect } from "react";

function ProgressBar(props) {
  const { is_paused, is_active, start_position, duration } = props;
  var [position, setPosition] = useState(start_position);

  const timer = () => {
    var interval = setInterval(() => {
      if (!is_paused && is_active) {
        setPosition((position) => position + 300);
      }
      clearInterval(interval);
      return;
    }, 300);
    return () => {
      clearInterval(interval);
    };
  };
  useEffect(timer, [position, is_paused]);

  return <progress max={duration} value={position}></progress>;
}
export default ProgressBar;
