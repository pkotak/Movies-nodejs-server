var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, required: true},
    password: String,
    email: String,
    phone: String,
    role: {type: String, enum: ['user','critic', 'admin', 'actor'], default: 'user'},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    favorites: [],
    watchList: []
}, {collection: 'user'});

module.exports = userSchema;