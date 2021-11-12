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

async function deleteUserById(id) {
    try {
        return await userModel.findByIdAndDelete(id);
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

async function deleteAllUsers() {
    try {
        return await userModel.remove({});
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.deleteUserById = deleteUserById;
exports.deleteAllUsers = deleteAllUsers;