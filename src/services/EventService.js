import EventModel from '../models/Event.js';
import AppError from '../utils/AppError.js';

const getAllEvents = async () => {
    try {
       return EventModel.find();
    } catch (err) {
        throw new AppError(err.message, 500);
    }
}

const createEvent = async (event) => {
    try {
        return EventModel.create(event);
    } catch (err) {
        throw new AppError(err.message, 500);
    }
}

const getEventById = async (id) => {
    try {
        return EventModel.findOne({ pubId: id });
    } catch (err) {
        throw new AppError(err.message, 500);
    }
}

const updateEvent = async (id, event) => {
    try {
        return EventModel.findOneAndUpdate({ pubId: id }, event);
    } catch (err) {
        throw new AppError(err.message, 500);
    }
}

const deleteEvent = async (id) => {
    try {
        return EventModel.findOneAndDelete({ pubId: id });
    } catch (err) {
        throw new AppError(err.message, 500);
    }
}

export default {
  getAllEvents, createEvent, getEventById, updateEvent, deleteEvent,
};
