var url = require("url"),
  cheerio = require("cheerio");

function formatSearchUrl(artist_name, song_name) {
  // Builds the search URL from the artist and song names
  base_url = "https://www.ultimate-guitar.com/search.php?title=";
  encoded_url = encodeURI(
    base_url.concat(artist_name, " ", song_name, "&page=1&type=300")
  );
}

function getTabURL() {
  // Gets the URL of the correct Tab from the Search page
  /*

        Make sure to select the first tab of that kind.

        Select the div with class="_3yi9p". For each child with class="__3uKbA", go to child div of class="_2amQf _2Fdo4". If content is chords.


        // parent, all children with this class, 
        $("._3yi9p").children().("__3uKbA").children

        $("._2amQf _2Fdo4")


        1. Grab all html under class "_3yi9p"
        2. 

        2. For all children in this class that are of class "__3uKbA"
        3. Go to child div of class _2amQf _2Fdo4, confirm that .text() is "chords"


        $(":contains(Duck)")


        maybe contains chords 

        */
}

function scrapeTabHTML() {
  // Scrapes the Tab HTML from the Tab page
  const $ = cheerio.load('<section class="_3cXAr _1G5k-">...</section>');
  return $.html();
}
