import { Router } from 'express';
import { createExpense, deleteExpense, getExpenses, getExpenseStats, updateExpense } from '../controllers/expense.Controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes with authorization
router.get('/', authorize('expenses', 'read'), getExpenses);
router.get('/stats', authorize('expenses', 'read'), getExpenseStats);
router.post('/', authorize('expenses', 'create'), createExpense);
router.put('/:id', authorize('expenses', 'update'), updateExpense);
router.delete('/:id', authorize('expenses', 'delete'), deleteExpense);

export {router as expenseRouter}
