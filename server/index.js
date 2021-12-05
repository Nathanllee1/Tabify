const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const fs = require("fs").promises;
const path = require("path");

const port = 5000;

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = "http://localhost:3000/auth/callback";
if (process.argv[2] == "--prod") {
  spotify_redirect_uri = "https://tabify-app.herokuapp.com/auth/callback";
}

var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.get("/auth/login", (req, res) => {
  var scope = "streaming user-read-email user-read-private";
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });
  console.log("https://accounts.spotify.com/authorize/?" +
  auth_query_parameters.toString());
  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", (req, res) => {
  var code = req.query.code;

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect("/?token=" + access_token);
    }
  });
});

// TODO fetch songs from ultimate guitar
app.get("/api/gettab", async (req, res) => {
  let name = req.query.song_name;
  let artist = req.query.artist_name;

  console.log("Fetching tabs for ", artist, name);

  // TODO: check if tab is in database

  // if tab is in database, return tab


  // if not, fetch from scraper

  request.get(`https://tabify-scraper.herokuapp.com/gettab?artist_name=${encodeURIComponent(artist)}&song_name=${encodeURIComponent(name)}`, function (error, response, body) {
    res.json(JSON.parse(body));
  })
  
});

// TODO: /tabs endpoint to return all tabs in database (for dev)

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening. on", port);
});

app.use(express.static(path.join(__dirname, "../build")));