const mongoose = require("mongoose");

const TabSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    // TODO: implement history with tab pref
  },
  { collection: "users_list" }
);

const Tab = mongoose.model("Tab", TabSchema);

module.exports = Tab;
