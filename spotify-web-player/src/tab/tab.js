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
      console.log("cleaning")
      const html = DOMPurify.sanitize(rawHTML, {
         USE_PROFILES: { html: true },
       })
      setTabHTML(html);
   }

   useEffect(() => {
      fetch("/gettabs")
      .then(res => res.text())
      .then(rawHTML => cleanHTML(rawHTML))
    }, []);

    return (
       <div>
        <div>{parse(tabHTML)}</div> 
      </div>
    )
}

export default Tab;