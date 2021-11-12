const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    country: String,
    display_name: String,
    email: String,
    uri: String
    // TODO: implement history with tab pref
}, {collection : 'users_list'});

const User = mongoose.model("User", UserSchema);

module.exports = User;