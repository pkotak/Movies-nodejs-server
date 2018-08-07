const mongoose = require('mongoose');
const eventSchema = require('./event.schema.server');

const eventModel = mongoose.model('EventModel', eventSchema);

createEvent = event =>
    eventModel.create(event);

findAllEvents = () =>
    eventModel.find();

findEventById = eventId =>
    eventModel.findById(eventId);

updateEvent = (eventId, updatedEvent) =>
    eventModel.update({_id: eventId}, {
        $set: updatedEvent
    });

deleteEvent = eventId =>
    eventModel.remove({_id: eventId});

var api = {
    createEvent,
    findAllEvents,
    findEventById,
    updateEvent,
    deleteEvent
}

module.exports = api;