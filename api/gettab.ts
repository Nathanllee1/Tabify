import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as tabServices from "./models/tab-services"
import  * as req from "request"

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  let name = (typeof (request.query.song_name ) === "string" ? request.query.song_name : "");
  let artist =  (typeof (request.query.artist_name ) === "string" ? request.query.artist_name : "");

  console.log("Fetching tabs for ", artist, name);

  // TODO: check if tab is in database

  let tab = await tabServices.getTabByTitleAndArtist(name, artist);

  // if tab is in database, return tab
    
  if (tab.length !== 0) {
    console.log("Tab found in database.");
    tab = tab[0];
    response.send(
      {
        "TAB": tab.tab,
        "URL": tab.url,
      },
    );
  } // if not, fetch from scraper
  else {
    try {
      console.log("Tab not in database. Requesting from scraper...", `https://tabify-scraper.herokuapp.com/gettab?artist_name=${
        encodeURIComponent(artist)
      }&song_name=${encodeURIComponent(name)}`);
      req.get(
        `https://tabify-scraper.herokuapp.com/gettab?artist_name=${
          encodeURIComponent(artist)
        }&song_name=${encodeURIComponent(name)}`,
        function (error, res, body) {
          let tabHtml = JSON.parse(body);
          // console.log(tabHtml)
          response.json(tabHtml);
          
          tabServices.addTab(name, artist, tabHtml.TAB, tabHtml.URL);
        },
      );
    } catch (err) {
      console.log("No tab on UltimateGuitar. Yet :)");
    }
  }  
}
