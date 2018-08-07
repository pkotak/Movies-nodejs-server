var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: {type: String, required: true},
    movieId: {type: String, required: true},
    venue: String,
    date: {type: Date, default: Date.now()},
    ticketPrice: String
});

module.exports = eventSchema;