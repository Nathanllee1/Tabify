const mongoose = require("mongoose");

const TabSchema = new mongoose.Schema(
  {
    TAB: {
      type: String,
      required: true,
    },
    URL: String
  },
  { collection: "tabs_list" }
);

const Tab = mongoose.model("Tab", TabSchema);

module.exports = Tab;
