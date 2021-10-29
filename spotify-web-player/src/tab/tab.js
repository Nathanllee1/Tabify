import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function Tab(props) { 

   const { track } = props; 

   const [currentTrack, setCurrentTrack] = useState(null);
   const [tabHTML, setTabHTML] = useState('');

   function cleanHTML(rawHTML) {
      const html = DOMPurify.sanitize(rawHTML, {
         USE_PROFILES: { html: true },
       })
       setTabHTML(html);
   }

  useEffect(() => {
    async function getTab() {
      const response = await fetch(`/api/gettabs?name=${track.name}&topArtist=${track.artists[0].name}`);
      const json = await response.json();
      cleanHTML(json.tabs[0]);
      console.log(tabHTML)
    }
    getTab();
    setCurrentTrack(track);
  }, []);

    return (
       <div>
        <div>{parse(tabHTML)}</div> 
      </div>
    )
}

export default Tab;