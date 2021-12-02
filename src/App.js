import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logo_container: {
    display: "flex",
    margin: "2%",
    alignItems: "center",
    gap: "5px",
    height: "15%",
  },
  app_container: {
    textAlign: "center",
    marginTop: "15%",
    height: "75%",
    display: "block",
  },
});

const THEME = createTheme({
  typography: {
   "fontFamily": `Menlo, Monaco, Consolas, "Courier New", monospace`,
  }
});


function App() {
  const classes = useStyles();
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    let tok = urlParams.get("token");
    if (tok) {
      setToken(tok);
    }
  }, []);

  return (
    <div>
      <MuiThemeProvider theme={THEME}>
        <div className={classes.app_container}>
          <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
