const mongoose = require("mongoose");

const TabSchema = new mongoose.Schema(
  {
    song_title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    tab: {
      type: String,
      required: true
    },
    url: String
  },
  { collection: "tabs_list" }
);

tabSchema.index({ "song_title": 1, "artist": 1}, { "unique": true })

module.exports = TabSchema;
