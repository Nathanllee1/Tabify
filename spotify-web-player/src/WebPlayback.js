import React, { useState, useEffect } from "react";
import Tab from "./tab/tab.js";

import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses, StylesContext } from "@material-ui/styles";
import ProgressBar from "./ProgressBar.js";

const useStyles = makeStyles({
  cover: {},
  container: {
    display: "flex",
    justifyContent: "center",
    gap: "10%",
    flexWrap: "wrap",
  },
  controls: {
    marginTop: "1em",
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: "30px",
    height: "min-content;",
    borderRadius: "15px",
    position: "sticky",
    alignSelf: "flex-start",
    top: "10%",
    width: "20%",
    backgroundColor: "white",
  },
  song_title: {},
  picture_container: {
    display: "flex",
    justifyContent: "center",
  },
});

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
  const [position, setPosition] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  const [history, add_history] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (history[history.length - 1] !== current_track.name) {
      add_history([...history, current_track]);
    }
  }, [current_track]);

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
      console.log(player.dur);

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
        setCurrentDuration(state.duration);
        setTrack(state.track_window.current_track);

        setPaused(state.paused);
        setPosition(state.position); // update position if song is paused
        console.log("position changed " + state.position);
        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, []);

  const timer = () => {
    var interval = setInterval(() => {
      if (is_active && !is_paused) {
        console.log(position);
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

  if (!is_active) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            To get started, open your Spotify app and select{" "}
            <em style={{ color: "#1dd760" }}>Tabify</em> as your Spotify player
            <br />
            <br />
            <br />
            <div className={classes.picture_container}>
              <div>
                <br />
                <h2>Desktop</h2>
                <img src="device_tabify.png" style={{ width: "70%" }} />
              </div>

              <div>
                <br />
                <h2>Mobile</h2>
                <img src="mobile_1.jpg" style={{ width: "50%" }} /> <br />{" "}
                <br />
                <img src="mobile_2.jpg" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
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
              <br />
              <h2 className={classes.song_title}>{current_track.name}</h2>
              <h3 className="now-playing__artist">
                {current_track.artists[0].name}
              </h3>
              <br />
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
              <div className="demo-wrapper html5-progress-bar">
                <div className="progress-bar-wrapper">
                  <progress
                    id="progressbar"
                    value={position}
                    max={currentDuration}
                  ></progress>
                </div>
              </div>
            </div>
          </div>
          <Tab track={current_track} />
        </div>
      </>
    );
  }
}

export default WebPlayback;
