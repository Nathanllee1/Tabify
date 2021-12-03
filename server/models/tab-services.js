const mongoose = require('mongoose');
const dotenv = require("dotenv");
const tabModel = require("./tab");

dotenv.config();

mongoose.connect(
    `mongodb+srv://BSilton:${process.env.MONGODB_PASSWORD}@cluster0.tnew1.mongodb.net/TabifyDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(error => console.log(error));

async function addTab(title, artist, tabHtml) {
    try {
        const tabToAdd = new tabModel({"song_title": title, "artist": artist, tab: tabHtml});
        const savedTab = await tabToAdd.save()
        return savedTab;
    } catch(error) {
        console.log(error);
        return false;
    }
}

// somewhat spaghetti code, but leaves space for feature expansion later on
async function getTabByTitleAndArtist(title, artist) {
    result = await findTabByTitleAndArtist(title, artist)
    return result;
}

async function findTabByTitleAndArtist(title, artist) {
    return await tabModel.find({"song_title": title, "artist": artist});
}

exports.addTab = addTab;
exports.getTabByTitleAndArtist = getTabByTitleAndArtist;