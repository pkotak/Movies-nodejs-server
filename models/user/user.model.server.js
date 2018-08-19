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

function updateUserEvent(id, event) {
    return userModel.update({_id: id}, {$push: {events: event._id}})
}

function deleteUserEvent(id, event) {
    return userModel.update({_id: id}, {$pull: {events: event._id}})
}

function findAllEventsOfUser(user) {
    return userModel.findOne({_id: user._id}, {events: 1}).populate('events')
}

function findAllFavoriteMoviesOfUser(user) {
    return userModel.findOne({_id: user._id}, {favorites: 1}).populate('favorites')
}

function deleteUserFavoriteMovie(id, movieId) {
    return userModel.update({_id: id}, {$pull: {favorites: movieId}})
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findByUserName: findByUserName,
    deleteUser:deleteUser,
    findAllFans:findAllFans,
    updateUserEvent:updateUserEvent,
    deleteUserEvent:deleteUserEvent,
    findAllEventsOfUser:findAllEventsOfUser,
    findAllFavoriteMoviesOfUser: findAllFavoriteMoviesOfUser,
    deleteUserFavoriteMovie: deleteUserFavoriteMovie
};

module.exports = api;