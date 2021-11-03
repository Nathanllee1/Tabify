const mongoose = require('mongoose');
const userModel = require("./user");

mongoose.connect(
    'mongodb://localhost:27017/users',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).catch(error => console.log(error));

async function addUser(user) {
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    } catch(error) {
        console.log(error);
        return false;
    }
}

async function getUsers() {
    let result = await userModel.find();
    return result;
}

exports.addUser = addUser;
exports.getUsers = getUsers;