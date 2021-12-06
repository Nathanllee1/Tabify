const mongoose = require('mongoose');
const TabSchema = require("./tab");
const process = require("process");
const dotenv = require("dotenv");

dotenv.config();

let conn;

function setConnection(newConn) {
    return (conn = newConn);
}

function getConnection() {
    if (!conn) {
        conn = mongoose.createConnection(
            "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PWD +
            "@cluster0.tnew1.mongodb.net/" +
            process.env.MONGO_DB +
            "?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("mongodb+srv://" +
        process.env.MONGO_USER +
        ":" +
        process.env.MONGO_PWD +
        "@cluster0.tnew1.mongodb.net/" +
        process.env.MONGO_DB +
        "?retryWrites=true&w=majority");
    }
    return conn;
}

async function addTab(title, artist, tabHtml, tabUrl) {
    const tabModel = getConnection().model("Tab", TabSchema);
    try {
        const tabToAdd = new tabModel({"song_title": title, "artist": artist, "tab": tabHtml, "url": tabUrl});
        const savedTab = await tabToAdd.save()
        return savedTab;
    } catch(error) {
        console.log(error);
        return false;
    }
}

async function getTabByTitleAndArtist(title, artist) {
    const tabModel = getConnection().model("Tab", TabSchema);
    return await tabModel.find({"song_title": title, "artist": artist});
}

exports.setConnection = setConnection;
exports.addTab = addTab;
exports.getTabByTitleAndArtist = getTabByTitleAndArtist;