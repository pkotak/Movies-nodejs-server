const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function updateUser(id, user) {
    return userModel.updateOne({_id: id},
        user);
}

function findByUserName(username) {
    return userModel.findOne({username: username});
}
function deleteUser(id){
    return userModel.deleteOne({_id:id})
}

function findAllFans() {
    return userModel.find({type: 'Fan'})
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findByUserName: findByUserName,
    deleteUser:deleteUser,
    findAllFans:findAllFans
};

module.exports = api;