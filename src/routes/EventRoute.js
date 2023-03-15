const express = require('express');
const verifyToken = require('../middleware/auth');
const catchAsync = require('../utils/catchAsync');

const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/EventController');

const router = express.Router();

router.get('/', verifyToken, catchAsync(getAllEvents));
router.post('/', verifyToken, catchAsync(createEvent));
router.get('/:id', verifyToken, catchAsync(getEventById));
router.put('/:id', verifyToken, catchAsync(updateEvent));
router.delete('/:id', verifyToken, catchAsync(deleteEvent));

module.exports = router;
