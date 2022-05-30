import type { VercelRequest, VercelResponse } from "@vercel/node";
import  * as req from "request"

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = "http://localhost:3000/api/callback";
if (process.env.PRODUCTION === "True") {

  spotify_redirect_uri = "https://www.tabify.app/api/callback";
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  var code = request.query.code;

  console.log("Recieved code", code)

  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: "Basic " +
        Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString(
          "base64",
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  req.post(authOptions, function (error, res, body) {
    if (!error && res.statusCode === 200) {
      response.redirect("/?token=" + body.access_token);
    }
  });
}
