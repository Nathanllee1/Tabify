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

module.exports = TabSchema;