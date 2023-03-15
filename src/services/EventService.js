const EventModel = require('../models/Event');

exports.getAllEvents = async () => EventModel.find();

exports.createEvent = async (event) => EventModel.create(event);
exports.getEventById = async (id) => EventModel.findById(id);

exports.updateEvent = async (id, event) => EventModel.findByIdAndUpdate(id, event);

exports.deleteEvent = async (id) => EventModel.findByIdAndDelete(id);
