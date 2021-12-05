import React, { useState, useEffect, useRef } from "react";
import Tab from "./tab/tab.js";

function AutoScrollContainer (props) {
  const { track } = props;
  console.log(track);
  const bottomRef = useRef();
  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  

  return (
    <div className="autoscroll-container">
      <button type="button" onClick={scrollToBottom}>
        Scroll To Bottom
      </button>
      <div className="scroll-list">
        <Tab track={track} />
        <div ref={bottomRef} className="list-bottom"></div>
      </div>
    </div>
  );
};
export default AutoScrollContainer;
