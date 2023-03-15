const EventService = require('../services/EventService');
const { eventSchema } = require('../middleware/schemas');
const AppError = require('../utils/AppError');

exports.getAllEvents = async (req, res) => {
  try {
    const events = await EventService.getAllEvents();
    res.json({ data: events, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(msg, 400);
    }
    const event = await EventService.createEvent(req.body);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await EventService.getEventById(req.params.id);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(msg, 400);
    }
    const event = await EventService.updateEvent(req.params.id, req.body);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await EventService.deleteEvent(req.params.id);
    res.json({ data: event, status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
