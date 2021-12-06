import React, { useState, useEffect, useRef } from "react";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "./tab/tab.js";
import "./progress.css";

const useStyles = makeStyles({
  cover: {
    maxWidth: "80%",
  },
  container: {
    display: "flex",
    position: "sticky",
    overflowY: "hidden",
    justifyContent: "center",
    gap: "10%",
    flexWrap: "wrap",
  },
  controls: {
    boxShadow: "0px 4px 4px 0px #00000040",
    padding: "30px",
    height: "min-content",
    borderRadius: "15px",
    alignSelf: "flex-start",
    width: "20%",
    backgroundColor: "white",
    position: "sticky",
    minWidth: "350px",
    marginBottom: "20px",
  },
  song_title: {},
  picture_container: {
    display: "flex",
    justifyContent: "center",
  },
  device_container: {
    width: "fit-content"
  },
  tab: {
    textAlign: "left",
    fontSize: "medium",
    fontWeight: "bold",
    width: "50%",
    minWidth: "350px",
    height: "65vh",
    position: "sticky",
    overflowWrap: "anywhere",
    overflowY: "auto",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "15px",
    backgroundColor: "white",
    padding: "60px",
    marginBottom: "20px",
    marginTop: "1px",
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
  const { setMusicConnected, token, autoScroll } = props;

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [position, setPosition] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [history, add_history] = useState([]);
  const [tabFetched, setTabFetched] = useState(false);

  const classes = useStyles();
  const tabRef = useRef();
  const containerRef = useRef();

  const [steady_track, set_steady_track] = useState();

  useEffect(() => {
    // edge case of first song
    if (history.length == 0)
      add_history([...history, current_track]);

    else if (history[history.length - 1].name !== current_track.name) {
      add_history([...history, current_track]);

      set_steady_track(current_track);

      console.log("Switching track to", steady_track);
      
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
          cb(token);
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
        setCurrentDuration(state.duration);
        setTrack(state.track_window.current_track);

        setPaused(state.paused);
        setPosition(state.position); // update position if song is paused
        player.getCurrentState().then((state) => {
          if (!state) {
            setActive(false);
            setMusicConnected(false);
          } else {
            setActive(true);
            setMusicConnected(true);
          }
        });
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    //window.addEventListener("scroll", turnOffAutoScroll);
  }, []);

  const timer = () => {
    var interval = setInterval(() => {
      if (is_active && !is_paused) {
        if (autoScroll) {
          console.log(tabRef.current.offsetHeight);
          console.log((position / currentDuration) * tabRef.current.offsetHeight);
          containerRef.current.scrollTo({
            top:
              (position / currentDuration) * tabRef.current.offsetHeight,
            left: 0,
            behavior: "smooth",
          });
        }
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
      <div className={classes.app_container}>
        <div className={classes.tutorial}>
          To get started, open your Spotify app and select{" "}
          <em style={{ color: "#1dd760" }}>Tabify</em> as your Spotify player
          <br />
          <br />
          <br />
          <div className={classes.picture_container}>
            <div className={classes.device_container}>
              <br />
              <h2>Desktop</h2>
              <img src="device_tabify.png" style={{ width: "50%" }} />
            </div>

            <div className={classes.device_container}>
              <br />
              <h2>Mobile</h2>
              <img src="mobile_1.jpg" style={{ width: "40%" }} /> <br /> <br />
              <img src="mobile_2.jpg" style={{ width: "40%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
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
        <div ref={containerRef} className={classes.tab}>
          <Tab
            setTabFetched={setTabFetched}
            ref={tabRef}
            track={steady_track}
          />
        </div>
      </div>
    );
  }
}

export default WebPlayback;
