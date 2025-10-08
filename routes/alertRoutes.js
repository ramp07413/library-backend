 import { Router } from 'express';
import { createAlert, deleteAlert, getAlerts, getAlertStats, markAllAsRead, markAsRead } from '../controllers/alert.Controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes with authorization
router.get('/', authorize('alerts', 'read'), getAlerts);
router.get('/stats', authorize('alerts', 'read'), getAlertStats);
router.post('/', authorize('alerts', 'create'), createAlert);
router.put('/:id/read', authorize('alerts', 'update'), markAsRead);
router.put('/read-all', authorize('alerts', 'update'), markAllAsRead);
router.delete('/:id', authorize('alerts', 'delete'), deleteAlert);


export {router as alertRouter}