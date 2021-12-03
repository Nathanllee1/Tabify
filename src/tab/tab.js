import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tab: {
    textAlign: "left",
    fontSize: "medium",
    fontWeight: "bold",
    width: "auto",
    overflowWrap: "anywhere",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "15px",
    backgroundColor: "white",
    padding: "60px",
    width: "100%",
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

function Tab(props) {
  const { track } = props;

  const [currentTrack, setCurrentTrack] = useState(null);
  const [tabHTML, setTabHTML] = useState("");
  const [tabURL, setTabURL] = useState("");

  const classes = useStyles();

  function cleanHTML(rawHTML) {
    const html = DOMPurify.sanitize(rawHTML, {
      USE_PROFILES: { html: true },
    });
    setTabHTML(html);
  } 





  useEffect(() => {
    async function getTab() {

      if (track) {
        console.log("Fetching ", `/gettab?song_name=${encodeURIComponent(track.name)}&artist_name=${encodeURIComponent(track.artists[0].name)}`)
        const response = await fetch(`/gettab?song_name=${encodeURIComponent(track.name)}&artist_name=${encodeURIComponent(track.artists[0].name)}`);
        const json = await response.json();
  
        cleanHTML(json.TAB);
      }
      
    }
    getTab();
    setCurrentTrack(track);
  }, [props.track]);

  return (
    <div>

      <div className={classes.tab}>
        {tabURL &&
        <div className={classes.tabLink}>
          <a href={tabURL} target="_blank" style={{color:"white", textDecoration: "none"}}>View on Ultimate Guitar</a>
        </div>
          
        }
        {parse(tabHTML)}
      </div>
    </div>
  );
}

export default Tab;
