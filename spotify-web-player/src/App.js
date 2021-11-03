import React, { useState, useEffect } from "react";
import WebPlayback from "./WebPlayback";
import Login from "./Login";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  "logo_container": {
    display: "flex",
    margin: "2%",
    alignItems: "center",
    gap: "5px",
    height: "15%"
  },
  "app_container" : {
    textAlign:"center",
    marginTop: "2%",
    height: "75%",
    display: "block"
  }
})

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
      <div className={classes.logo_container}>
        <h1 className="app_logo">Tabify</h1>
        <img src="tabify_logo.png" />
      </div>
      <div className={classes.app_container}>
      <>{token === "" ? <Login /> : <WebPlayback token={token} />}</>
      </div>
      
    </div>
    
  );
}

export default App;
