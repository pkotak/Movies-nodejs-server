const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

createUser = user =>
    userModel.create(user);

findAllUsers = () =>
    userModel.find();

findUserById = userId =>
    userModel.findById(userId);

updateUser = (userId, updatedUser) =>
    userModel.update({_id: userId}, {
        $set: updatedUser
    });

deleteUser = userId =>
    userModel.remove({_id: userId});

var api = {
    createUser,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
}

module.exports = api;