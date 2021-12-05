import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  container: {
    height: "100vh",
  },
  app_container: {
    textAlign: "center",
    align : "center",
    marginTop: "5%",
    display: "block",
  },
});

const THEME = createTheme({
  typography: {
    fontFamily: `source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace`,
  },
});

function App() {
  const [token, setToken] = useState("");
  // Whether or not tabify is synced up with user's spotify music
  const [musicConnected, setMusicConnected] = useState(false);
  // Whether autoscroll is enabled
  const [autoScroll, setAutoScroll] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let tok = urlParams.get("token");
    if (tok) {
      setToken(tok);
    }
  }, []);

  return (
    <div className={classes.container}>
      <MuiThemeProvider theme={THEME}>
        <Navbar
          musicConnected={musicConnected}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
        />
        <div className={classes.app_container}>
          {token === "" ? (
            <Login />
          ) : (
            <WebPlayback
              token={token}
              setMusicConnected={setMusicConnected}
              autoScroll={autoScroll}
            />
          )}
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
