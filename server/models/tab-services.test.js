const mongoose = require("mongoose");
const TabSchema = require("./tab");
const tabServices = require("./tab-services.js");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let tabModel;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  conn = await mongoose.createConnection(uri, mongooseOpts);

  tabModel = conn.model("Tab", TabSchema);

  tabServices.setConnection(conn);
});

afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
  await mongoServer.stop();
});

beforeEach(async () => {
    let dummyTab = {
      song_title: "Lost in the Woods",
      artist: "Jonathan Groff",
      tab: "<section class=\"_3cXAr _1G5k-\"><code class=\"_3enQP\"><pre class=\"_3F2CP _3hukP\" style=\"font-size: 13px; font-family: Roboto Mono, Courier New, monospace;\"><span class=\"_3rlxz\">Capo 1\r\n\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"G7\" style=\"color: rgb(0, 0, 0);\">G7</span> : 323003\r\n\r\n\r\n[Intro]\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"G7\" style=\"color: rgb(0, 0, 0);\">G7</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>        <span class=\"_3PpPJ OrSDI\" data-name=\"Eb\" style=\"color: rgb(0, 0, 0);\">Eb</span>\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"G7\" style=\"color: rgb(0, 0, 0);\">G7</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>\r\n\r\n\r\n[Verse 1: Kristoff]\r\n                <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>\r\nAgain, you're gone\r\n           <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>                   <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>\r\nOff on a different path than mine\r\n             <span class=\"_3PpPJ OrSDI\" data-name=\"Em\" style=\"color: rgb(0, 0, 0);\">Em</span>\r\nI'm left behind\r\n          <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"Dsus4\" style=\"color: rgb(0, 0, 0);\">Dsus4</span>   <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>\r\nWondering if I should follow\r\n     <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>\r\nYou had to go\r\n         <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>                  <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>\r\nAnd, of course, it's always fine\r\n   <span class=\"_3PpPJ OrSDI\" data-name=\"Em\" style=\"color: rgb(0, 0, 0);\">Em</span>                  <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"Dsus4\" style=\"color: rgb(0, 0, 0);\">Dsus4</span>   <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>   <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>\r\nI probably could catch up with you tomorrow\r\n\r\n\r\n[Pre-Chorus: Kristoff]\r\n       <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span>            <span class=\"_3PpPJ OrSDI\" data-name=\"A\" style=\"color: rgb(0, 0, 0);\">A</span>\r\nBut is this what it feels like\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"G#m\" style=\"color: rgb(0, 0, 0);\">G#m</span>        <span class=\"_3PpPJ OrSDI\" data-name=\"A\" style=\"color: rgb(0, 0, 0);\">A</span>\r\nTo be growing apart?\r\n         <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>            <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>\r\nWhen did I become the one\r\n             <span class=\"_3PpPJ OrSDI\" data-name=\"Dsus4\" style=\"color: rgb(0, 0, 0);\">Dsus4</span>        <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>\r\nWho's always chasing your heart?\r\n\r\n\r\n[Chorus 1: Kristoff]\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"Bb\" style=\"color: rgb(0, 0, 0);\">Bb</span>              <span class=\"_3PpPJ OrSDI\" data-name=\"Gm\" style=\"color: rgb(0, 0, 0);\">Gm</span>\r\nNow I turn around and find\r\n     <span class=\"_3PpPJ OrSDI\" data-name=\"Cm\" style=\"color: rgb(0, 0, 0);\">Cm</span>          <span class=\"_3PpPJ OrSDI\" data-name=\"F\" style=\"color: rgb(0, 0, 0);\">F</span>\r\nI am lost in the woods\r\n           <span class=\"_3PpPJ OrSDI\" data-name=\"Dm\" style=\"color: rgb(0, 0, 0);\">Dm</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"Eb\" style=\"color: rgb(0, 0, 0);\">Eb</span>\r\nNorth is south, right is left\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"Cm\" style=\"color: rgb(0, 0, 0);\">Cm</span>\r\nWhen you're gone\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"F\" style=\"color: rgb(0, 0, 0);\">F</span>       <span class=\"_3PpPJ OrSDI\" data-name=\"Bb\" style=\"color: rgb(0, 0, 0);\">Bb</span>                <span class=\"_3PpPJ OrSDI\" data-name=\"Gm\" style=\"color: rgb(0, 0, 0);\">Gm</span>\r\nI'm the one who sees you home\r\n            <span class=\"_3PpPJ OrSDI\" data-name=\"Cm\" style=\"color: rgb(0, 0, 0);\">Cm</span>          <span class=\"_3PpPJ OrSDI\" data-name=\"F\" style=\"color: rgb(0, 0, 0);\">F</span>\r\nBut now I'm lost in the woods\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"F\" style=\"color: rgb(0, 0, 0);\">F</span>            <span class=\"_3PpPJ OrSDI\" data-name=\"Bb\" style=\"color: rgb(0, 0, 0);\">Bb</span>                <span class=\"_3PpPJ OrSDI\" data-name=\"Eb\" style=\"color: rgb(0, 0, 0);\">Eb</span>\r\nAnd I don't know what path you are on\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>           <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>          <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>\r\nI'm lost in the woods\r\n\r\n\r\n[Verse 2: Kristoff]\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>       <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>\r\nUp 'til now\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>               <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>               <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>\r\nThe next step was a question of how\r\n         <span class=\"_3PpPJ OrSDI\" data-name=\"Em\" style=\"color: rgb(0, 0, 0);\">Em</span>              <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"Dsus4\" style=\"color: rgb(0, 0, 0);\">Dsus4</span>   <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>\r\nI never thought it was a question of whether\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>      <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"D\" style=\"color: rgb(0, 0, 0);\">D</span>              <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>\r\nWho am I,        if I'm not your guy?\r\n         <span class=\"_3PpPJ OrSDI\" data-name=\"C\" style=\"color: rgb(0, 0, 0);\">C</span>     <span class=\"_3PpPJ OrSDI\" data-name=\"Am\" style=\"color: rgb(0, 0, 0);\">Am</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"F#m\" style=\"color: rgb(0, 0, 0);\">F#m</span>        <span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>\r\nWhere am I, if we're not together      Forever?\r\n\r\n\r\n[Chorus 2: Kristoff]\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>                   <span class=\"_3PpPJ OrSDI\" data-name=\"G#m\" style=\"color: rgb(0, 0, 0);\">G#m</span>\r\nNow I know you're my true north\r\n            <span class=\"_3PpPJ OrSDI\" data-name=\"C#m\" style=\"color: rgb(0, 0, 0);\">C#m</span>         <span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>\r\n'Cause I am lost in the woods\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"D#m\" style=\"color: rgb(0, 0, 0);\">D#m</span>           <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span>\r\nUp is down, day is night\r\n            <span class=\"_3PpPJ OrSDI\" data-name=\"C#m\" style=\"color: rgb(0, 0, 0);\">C#m</span>\r\nWhen you're not there\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>  <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>              <span class=\"_3PpPJ OrSDI\" data-name=\"G#m\" style=\"color: rgb(0, 0, 0);\">G#m</span>\r\nOh, you're my only landmark\r\n       <span class=\"_3PpPJ OrSDI\" data-name=\"C#m\" style=\"color: rgb(0, 0, 0);\">C#m</span>         <span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>\r\nSo I'm lost in the woods\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>        <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>            <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span>\r\nWondering if you still care\r\n\r\n\r\n[Bridge: Kristoff & Reindeer]\r\n          <span class=\"_3PpPJ OrSDI\" data-name=\"C#m\" style=\"color: rgb(0, 0, 0);\">C#m</span>\r\nBut I'll wait\r\n      <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span>\r\nFor a sign (For a sign)\r\n           <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>\r\nThat I'm your path\r\n             <span class=\"_3PpPJ OrSDI\" data-name=\"G#m\" style=\"color: rgb(0, 0, 0);\">G#m</span>\r\n'Cause you are mine (You are mine)\r\n     <span class=\"_3PpPJ OrSDI\" data-name=\"C#m\" style=\"color: rgb(0, 0, 0);\">C#m</span>\r\n'Til then\r\n     <span class=\"_3PpPJ OrSDI\" data-name=\"F#\" style=\"color: rgb(0, 0, 0);\">F#</span>        \r\nI'm lost in the woods\r\n\r\n\r\n[Outro: Kristoff & Reindeer]\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>             <span class=\"_3PpPJ OrSDI\" data-name=\"B7/A\" style=\"color: rgb(0, 0, 0);\">B7/A</span>    <span class=\"_3PpPJ OrSDI\" data-name=\"E\" style=\"color: rgb(0, 0, 0);\">E</span> \r\nLost in the woods    (Lost in the woods)\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"Gmaj7\" style=\"color: rgb(0, 0, 0);\">Gmaj7</span>   <span class=\"_3PpPJ OrSDI\" data-name=\"G6\" style=\"color: rgb(0, 0, 0);\">G6</span>      <span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span>                 <span class=\"_3PpPJ OrSDI\" data-name=\"B7/A\" style=\"color: rgb(0, 0, 0);\">B7/A</span> \r\nI'm lost in the woods (Lost in the woods)\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"G#m\" style=\"color: rgb(0, 0, 0);\">G#m</span>\r\nI'm lost\r\n    <span class=\"_3PpPJ OrSDI\" data-name=\"G\" style=\"color: rgb(0, 0, 0);\">G</span>          \r\nI'm lost in the woods\r\n\r\n<span class=\"_3PpPJ OrSDI\" data-name=\"B\" style=\"color: rgb(0, 0, 0);\">B</span></section>"
    };
    let result = new tabModel(dummyTab);
    await result.save();
  
    dummyTab = {
        song_title: "Title 1",
        artist: "Artist A",
        tab: "some tab"
    };
    result = new tabModel(dummyTab);
    await result.save();
  
    dummyTab = {
        song_title: "Title 2",
        artist: "Artist A",
        tab: "some other tab"
    };
    result = new tabModel(dummyTab);
    await result.save();
  
    dummyTab = {
        song_title: "Title 1",
        artist: "Artist B",
        tab: "another other tab"
    };
    result = new tabModel(dummyTab);
    await result.save();
});

afterEach(async () => {
    await tabModel.deleteMany();
});

test("Fetch tab by title and artist", async () => {
    const title = "Title 1";
    const artist = "Artist A";
    const tabs = await tabServices.getTabByTitleAndArtist(title, artist);
    expect(tabs).toBeDefined();
    expect(tabs.length).toEqual(1);
    tabs.forEach(
        (tab) => expect(tab.song_title).toBe(title) && expect(tab.artist).toBe(artist)
    );
});

test("Adding tab", async () => {
    const dummyTab = {
      song_title: "Title 2",
      artist: "Artist B",
      tab: "some other another other tab"
    };

    const result = await tabServices.addTab(dummyTab.song_title, dummyTab.artist, dummyTab.tab);
    expect(result).toBeTruthy();
    expect(result.song_title).toBe(dummyTab.song_title);
    expect(result.artist).toBe(dummyTab.artist);
    expect(result).toHaveProperty("_id");
});

test("Adding tab -- nonunique song_title/artist combo", async () => {
    const dummyTab = {
      song_title: "Title 1",
      artist: "Artist A",
      tab: "some other another other tab also"
    };

    const result = await tabServices.addTab(dummyTab);
    expect(result).toBeFalsy();
});
