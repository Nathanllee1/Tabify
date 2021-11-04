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
  },
  song_title: {},
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
              <ProgressBar
                is_paused={is_paused}
                is_active={is_active}
                start_position={position}
                duration={currentDuration}
              />
            </div>
          </div>
          <Tab track={current_track} />
        </div>
      </>
    );
  }
}

export default WebPlayback;
