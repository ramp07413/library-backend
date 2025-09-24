const express = require('express');

const { authenticate, authorize } = require('../middleware/auth');
const { getPayments } = require('../controllers/payment.controller');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Routes with authorization
// router.get('/', authorize('payments', 'read'), getPayments);
// router.get('/stats', authorize('payments', 'read'), getPaymentStats);
// router.get('/export', authorize('payments', 'read'), exportPayments);
// router.put('/:id', authorize('payments', 'update'), updatePayment);

//routes with authorization payment routes

router.get("/", authorize("payments", 'read'), getPayments)

module.exports = router;
