import React, { useState, useEffect } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { makeStyles } from "@material-ui/core/styles";
import { mergeClasses, StylesContext } from "@material-ui/styles";
import Tab from "./tab/tab.js";
import "./progress.css";

const useStyles = makeStyles({
  cover: {
    maxWidth: "100%",
  },
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

  let current_song = track;

  useEffect(() => {
    if (history[history.length - 1] && history[history.length - 1].name !== current_track.name) {
      add_history([...history, current_track]);

      current_song = current_track;

      console.log("Switching track to", current_song.name);
      
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
        /*
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + props.token);
        myHeaders.append("Content-Type", "text/plain");

        console.log(myHeaders.Authorization);

        var raw = '{\n  "device_ids": [\n    "' + device_id + '"\n  ]\n}';

        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://api.spotify.com/v1/me/player", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          */
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

  const timer = () => {
    var interval = setInterval(() => {
      if (is_active && !is_paused) {
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
              <SkipPreviousIcon
                onClick={() => {
                  player.previousTrack();
                }}
              />
              {is_paused ? (
                <PlayCircleFilledIcon
                  onClick={() => {
                    player.togglePlay();
                  }}
                />
              ) : (
                <PauseCircleFilledIcon
                  onClick={() => {
                    player.togglePlay();
                  }}
                />
              )}
              <SkipNextIcon
                onClick={() => {
                  player.nextTrack();
                }}
              />
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
          <Tab track={current_song} />
        </div>
      </>
    );
  }
}

export default WebPlayback;
