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
      TAB: {
        type: String,
        required: true
      },
      URL: {
        type: String,
        required: true
      },
    },
  },
  { collection: "tabs_list" }
);

TabSchema.index({ "song_title": 1, "artist": 1}, { "unique": true })

module.exports = TabSchema;
