import { Expense } from "../../models/Expense.js";
import mongoose from "mongoose";

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const { category, type, libraryId } = req.query;

    if (!libraryId) {
      return res.status(400).json({ success: false, message: "Library ID is required" });
    }

    let query = { libraryId };

    if (category && category !== "all") query.category = category;
    if (type && type !== "all") query.type = type;

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, total: expenses.length, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new expense
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json({ success: true, message: "Expense created", expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    res.status(200).json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ success: false, message: "Expense not found" });
    res.status(200).json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get expense statistics for a library
export const getExpenseStats = async (req, res) => {
  try {
    const { libraryId } = req.query;
    if (!libraryId) return res.status(400).json({ success: false, message: "Library ID is required" });

    const totalExpenses = await Expense.aggregate([
      { $match: { libraryId: new mongoose.Types.ObjectId(libraryId) } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const recurringExpenses = await Expense.aggregate([
      { $match: { libraryId: new mongoose.Types.ObjectId(libraryId), type: "recurring" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const categoryStats = await Expense.aggregate([
      { $match: { libraryId: new mongoose.Types.ObjectId(libraryId) } },
      { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      totalExpenses: totalExpenses[0]?.total || 0,
      recurringExpenses: recurringExpenses[0]?.total || 0,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
