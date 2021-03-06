import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tab: {
    textAlign: "left",
    fontSize: "medium",
    fontWeight: "bold",
    width: "auto",
    height: "65vh",
    position: "sticky",
    overflowWrap: "anywhere",
    overflowY: "scroll",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "15px",
    backgroundColor: "white",
    padding: "60px",
  },
  tabLink: {
    backgroundColor: "#ffc600",
    color: "",
    padding: "20px",
    display: "inline-block",
    borderRadius: "99px",
  }
});

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const Tab = forwardRef((props, ref) => {
  const { track, setTabFetched } = props;

  const [currentTrack, setCurrentTrack] = useState(null);
  const [tabHTML, setTabHTML] = useState("");
  const [tabURL, setTabURL] = useState("");
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  function cleanHTML(rawHTML) {
    const html = DOMPurify.sanitize(rawHTML, {
      USE_PROFILES: { html: true },
    });
    setTabHTML(html);
    
  } 

  useEffect(() => {
    async function getTab() {
      if (track) {
        setTabHTML("");
        setLoading(true);
        console.log("Fetching ", `/api/gettab?song_name=${encodeURIComponent(track.name)}&artist_name=${encodeURIComponent(track.artists[0].name)}`)
        const response = await fetch(`/api/gettab?song_name=${encodeURIComponent(track.name)}&artist_name=${encodeURIComponent(track.artists[0].name)}`);
        const json = await response.json();
        setTabURL(json.URL);
        cleanHTML(json.TAB);
        setLoading(false);
      }
    }
    setTabFetched(false);
    getTab();
    setTabFetched(true);
    setCurrentTrack(track);
  }, [props.track]);

  return (
    
    <div ref={ref}>
      {tabURL && !loading &&
        <div className={classes.tabLink}>
          <a href={tabURL} target="_blank" style={{color:"white", textDecoration: "none"}}>View on Ultimate Guitar</a>
        </div>   
        
      }
      {parse(tabHTML)}

      {loading &&
        <div>Loading...</div>
      }
        
    </div>
  );
});

export default Tab;
