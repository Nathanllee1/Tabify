import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

function Tab() { 

   const track = {
      name: "Song1",
      album: {
        images: [{ url: "" }],
      },
      artists: [{ name: "" }],
    };

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
      const response = await fetch("/api/gettabs");
      const json = await response.json();
      cleanHTML(json.tabs[0]);
      console.log(tabHTML)
    }
    getTab();
  }, []);

    return (
       <div>
        <div>{parse(tabHTML)}</div> 
      </div>
    )
}

export default Tab;