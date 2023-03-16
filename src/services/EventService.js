import EventModel from '../models/Event.js';

const getAllEvents = async () => EventModel.find();

const createEvent = async (event) => EventModel.create(event);
const getEventById = async (id) => EventModel.findById(id);

const updateEvent = async (id, event) => EventModel.findByIdAndUpdate(id, event);

const deleteEvent = async (id) => EventModel.findByIdAndDelete(id);

export default {
  getAllEvents, createEvent, getEventById, updateEvent, deleteEvent,
};
