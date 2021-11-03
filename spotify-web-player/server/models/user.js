const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    }
    // TODO: implement history with tab pref
}, {collection : 'users_list'});

const User = mongoose.model("User", UserSchema);

module.exports = User;