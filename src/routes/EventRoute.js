import express from 'express';
import verifyToken from '../middleware/auth.js';
import catchAsync from '../utils/catchAsync.js';
import controller from '../controllers/EventController.js';

const router = express.Router();

router.get('/', verifyToken, catchAsync(controller.getAllEvents));
router.post('/', verifyToken, catchAsync(controller.createEvent));
router.get('/:id', verifyToken, catchAsync(controller.getEventById));
router.put('/:id', verifyToken, catchAsync(controller.updateEvent));
router.delete('/:id', verifyToken, catchAsync(controller.deleteEvent));

export default router;
