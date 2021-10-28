# Tabify

## Project Description:

When I play guitar, I usually put songs on spotify and jam along to them. I’ll usually pull up the chords to the song on https://www.ultimate-guitar.com/. I was thinking it would be a good idea to make a website that uses the Spotify playback API to get the song you’re currently playing and then use a custom scraper to search the song by artist and song name on ultimate guitar and display the chords on the site. I would definitely use this every time I play guitar.

## Authentication

The first part is authentication with Spotify using Oauth 2.0. I’ve done this before and have a reasonable idea how it works.

1. The express server redirects the website to the Spotify sign in.
2. The Spotify sign in page redirects back to the original page and returns tokens.
3. The express server grabs those tokens and stores them in the db.

![](spotify_architecture.png)

## Playback

The website then uses the tokens to get the current user’s playback state. You can get how far they are, the current song, and some other stuff. This will be some kind of widget on the website.

The above two are actually implemented here, so we can use this:
https://developer.spotify.com/documentation/web-playback-sdk/guide/

## Webscraping

Once the website gets the current song playing, it will run a search on Ultimate Guitar and return the results for chords that the user can pick from. Ultimate guitar doesn’t have an API, so we’ll have to implement this manually using a javascript web scraping library.

We could either do this on the frontend or backend.

## UI

For a bare minimum, we’ll need to make an authentication page, and some kind of playback page. I have some ideas for how to do it, but we’ll make a few components. We’ll make a currently playing song widget and a component for the chords. We could probably make it fancy and scroll as the song plays.

I’m not sure how heavily we need to rely on a database? I had this in mind to be completely frontend, but we could store the user tokens with song history or keep stats like number of songs played.

I think there’s not much point in storing the actual tabs in the database.

UI Prototype: https://www.figma.com/file/J7pzVQTY6Wv1YScIYKMDGf/Login-Page?node-id=0%3A1

## Style Check

For this project we're using Prettier as a style checker to ensure our code styles are consistent. To install using npm, you can run the followming commands in the root directory:

```npm install --save-dev --save-exact prettier```

To let the editor know you're using Prettier:

```echo {}> .prettierrc.json```

Create a ```.prettierignore``` file to let the editor know which files NOT to style check.

Add these lines in .prettierignore

```
# Ignore artifacts:
build
coverage
```

To format all files, run

```npx prettier --write . ```

Further instructions for installation can be found here: 
https://prettier.io/docs/en/install.html

Style rules here: 
https://prettier.io/docs/en/options.html

We recommend integrating Prettier into your chosen code editor (we recommend VSCode). Instructions on how to do so can be found here:
https://prettier.io/docs/en/editors.html
