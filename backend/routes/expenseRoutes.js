import express from "express";

import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET + ADD
router
  .route("/")
  .get(protect, getExpenses)
  .post(protect, addExpense);


// UPDATE + DELETE
router
  .route("/:id")
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

export default router;