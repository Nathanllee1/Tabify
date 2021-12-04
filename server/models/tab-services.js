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
        if (process.argv.includes("--prod")) {
            conn = mongoose.createConnection(
                "mongodb+srv://" +
                process.env.MONGO_USER +
                ":" +
                process.env.MONGO_PWD +
                "@csc307.7ijdm.mongodb.net/" +
                process.env.MONGO_DB +
                "?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        } else {
            conn = mongoose.createConnection("mongodb://localhost:27017/tabs", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
    }
    return conn;
}

// mongoose.connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@cluster0.tnew1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// ).catch(error => console.log(error));

async function addTab(title, artist, tabHtml) {
    const tabModel = getConnection().model("Tab", TabSchema);
    try {
        const tabToAdd = new tabModel({"song_title": title, "artist": artist, tab: tabHtml});
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

exports.addTab = addTab;
exports.getTabByTitleAndArtist = getTabByTitleAndArtist;