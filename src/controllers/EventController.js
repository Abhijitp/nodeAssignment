import EventService from '../services/EventService.js';

import { eventSchema } from '../middleware/schemas.js';

import AppError from '../utils/AppError.js';

const getAllEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents();
    res.json({ data: events, status: 'success' });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const createEvent = async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(msg, 400);
    }
    const event = await EventService.createEvent(req.body);
    res.status(201).json({ data: event, status: 'success' });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await EventService.getEventById(req.params.id);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(msg, 400);
    }
    const event = await EventService.updateEvent(req.params.id, req.body);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await EventService.deleteEvent(req.params.id);
    res.json({ message: "Event has been deleted", status: 'success' });
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};
export default {
  getAllEvents, createEvent, getEventById, updateEvent, deleteEvent,
};
