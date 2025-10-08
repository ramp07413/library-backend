import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { assignSeat, createSeat, deleteSeat, getSeats, getSeatStats, unassignSeat } from '../controllers/seat.Controller.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes with authorization
router.get('/', authorize('seats', 'read'), getSeats);
router.get('/stats', authorize('seats', 'read'), getSeatStats);
router.post('/assign', authorize('seats', 'update'), assignSeat);
router.post('/create', authorize('seats', 'create'), createSeat);
router.delete('/delete', authorize('seats', 'delete'), deleteSeat);
router.put('/:id/unassign', authorize('seats', 'update'), unassignSeat);

export { router as seatRouter}
