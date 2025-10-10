import express from "express";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats
} from "../../controllers/library/expenceController.js";
import { expenseValidation,validateExpense } from "../../middleware/validation.js";


const router = express.Router();

router.get("/", getExpenses);
router.post("/", expenseValidation,validateExpense,createExpense);
router.patch("/:id", expenseValidation,validateExpense,updateExpense);
router.delete("/:id", deleteExpense);
router.get("/stats", getExpenseStats);

export default router;
