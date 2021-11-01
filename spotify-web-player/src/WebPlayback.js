import React, { useState, useEffect } from "react";
import Tab from './tab/tab.js';

import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses, StylesContext } from "@material-ui/styles";


const useStyles = makeStyles({
  "cover": {
  },
  "container": {
    display: "flex",
    justifyContent: "center",
    gap: "10%",
    flexWrap: "wrap",

  },
  "controls": {
    marginTop: "1em",
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: "30px",
    height: "min-content;",
    borderRadius: "15px",
    position: "sticky",
    alignSelf: "flex-start",
    top: "10%",
    width: "20%"

  },
  "song_title": {
  }
})

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  const [history, add_history] = useState([])

  const classes = useStyles();

  useEffect(() => {
    
    console.log(history[history.length - 1] === current_track.name)
    if (history[history.length - 1] !== current_track.name) {
      console.log("switched to ", current_track);
      add_history([...history, current_track]);
    }
  }, [current_track])

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Tabify",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        
        setTrack(state.track_window.current_track);      
        
        setPaused(state.paused);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              {" "}
              Instance not active. Transfer your playback using your Spotify app{" "}
            </b>
          </div>
        </div>
      </>
    );
  } else {
    console.log("artists");
    console.log(current_track.artists)
    return (
      <>
        <div className={classes.container}>
          <div className={classes.controls}>
            <img
              src={current_track.album.images[0].url}
              className={classes.cover}
              alt=""
            />
            <div className="now-playing__side">
            <br/>
              <h2 className={classes.song_title}>{current_track.name}</h2>
              <h3 className="now-playing__artist">
                {current_track.artists[0].name}
              </h3>
              <br/>
              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "PLAY" : "PAUSE"}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
            
          </div>
          <Tab track={current_track}/>
        </div>
      </>
    );
  }
}

export default WebPlayback;
