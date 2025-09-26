const express = require('express');

const { authenticate, authorize } = require('../middleware/auth');
const { getPayments, addPendingPayment, depositPayment, getOneStudentPayment, updatePayment, deletePayment } = require("../controllers/payment.controller")

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
router.post("/addPending", authorize("payments", 'create'), addPendingPayment)
router.put("/depositPayment", authorize("payments", 'update'), depositPayment)
router.get("/get/:id", authorize("payments", 'read'), getOneStudentPayment)
router.patch("/update/:id", authorize("payments", 'update'), updatePayment)
router.delete("/delete/:id", authorize("payments", 'delete'), deletePayment)

module.exports = router;
