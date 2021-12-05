import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

/* Styling from https://dev.to/dipscoder/spotify-authentication-using-client-react-and-server-expressjs-27l0 */
const useStyles = makeStyles({
  login: {
    color: "black",
    display: "grid",
    verticalAlign: "middle",
    placeItems: "center",
    alignContent: "center",
    backgroundColor: "white",

    "& a": {
      padding: "20px",
      borderRadius: "99px",
      backgroundColor: "#1dd760",
      fontWeight: 600,
      color: "white",
      textDecoration: "none",
    },

    "& a:hover": {
      backgroundColor: " white",
      borderColor: "#1dd760",
      color: "#1db954",
      borderWidth: "1px",
      borderStyle: "solid",
    },

    "& img": {
      width: "40px",
      verticalAlign: "middle",
      padding: "5px",
      align: "left",
    },

    "& img:hover": {
      content: "/Spotify_Icon_RGB_Green.png",
    },
  },
});
function Login() {
  const classes = useStyles();

  return (
    <div className={classes.login}>
      <h1>Tabify</h1>
      <a href="/auth/login">
        <img src="/Spotify_Icon_RGB_White.png" />
        LOGIN WITH SPOTIFY
      </a>
    </div>
  );
}

export default Login;
