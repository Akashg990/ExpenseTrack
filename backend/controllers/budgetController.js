import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";


// CREATE BUDGET
// CREATE OR UPDATE BUDGET FOR A SPECIFIC MONTH
export const createBudget = async (req, res) => {
  try {
    let {
      category,
      limit,
      month,
    } = req.body;

    // Validation
    if (!category || !limit || !month) {
      return res.status(400).json({
        message:
          "Category, limit and month are required",
      });
    }

    // Normalize data
    category = category.trim().toLowerCase();
    const budgetLimit = Number(limit);

    if (isNaN(budgetLimit)) {
      return res.status(400).json({
        message: "Limit must be a valid number",
      });
    }

    // Find existing budget
    let budget = await Budget.findOne({
      user: req.user._id,
      category,
      month,
    });

    if (budget) {
      // Update existing budget
      budget.limit = budgetLimit;
      await budget.save();
    } else {
      // Create new budget
      budget = await Budget.create({
        user: req.user._id,
        category,
        limit: budgetLimit,
        month,
      });
    }

    res.status(200).json(budget);
  } catch (error) {
    console.error(
      "Budget Creation Error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET BUDGETS
export const getBudgets = async (req, res) => {
  try {
    // Fetch all budgets for the current user
    const budgets = await Budget.find({
      user: req.user._id,
    }).sort({
      month: -1,
      createdAt: -1,
    });

    // Fetch all expenses for the current user
    const expenses = await Expense.find({
      user: req.user._id,
    });

    // Calculate spent amount for each budget
    const budgetsWithSpent = budgets.map((budget) => {
      const budgetObj = budget.toObject();

      // Normalize category
      const budgetCategory = String(
        budget.category || ""
      )
        .trim()
        .toLowerCase();

      // Validate month format
      if (
        !budget.month ||
        typeof budget.month !== "string"
      ) {
        return {
          ...budgetObj,
          spent: 0,
        };
      }

      // Create month boundaries
      const startDate = new Date(
        `${budget.month}-01T00:00:00.000Z`
      );

      // Invalid date check
      if (isNaN(startDate.getTime())) {
        return {
          ...budgetObj,
          spent: 0,
        };
      }

      const endDate = new Date(startDate);
      endDate.setMonth(
        endDate.getMonth() + 1
      );

      // Calculate matching expenses
      let spent = 0;

      for (const expense of expenses) {
        const expenseCategory = String(
          expense.category || ""
        )
          .trim()
          .toLowerCase();

        // Use explicit date or fallback to createdAt
        const rawDate =
          expense.date ||
          expense.createdAt;

        const expenseDate =
          new Date(rawDate);

        // Skip invalid dates
        if (
          isNaN(expenseDate.getTime())
        ) {
          continue;
        }

        // Match category and month
        if (
          expenseCategory ===
            budgetCategory &&
          expenseDate >= startDate &&
          expenseDate < endDate
        ) {
          spent += Number(
            expense.amount || 0
          );
        }
      }

      return {
        ...budgetObj,
        spent,
      };
    });

    res.status(200).json(
      budgetsWithSpent
    );
  } catch (error) {
    console.error(
      "Error in getBudgets:",
      error
    );

    res.status(500).json({
      message:
        "Failed to fetch budgets",
      error: error.message,
    });
  }
};


// DELETE BUDGET
export const deleteBudget = async (req, res) => {

  try {

    const budget = await Budget.findById(
      req.params.id
    );

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found",
      });
    }

    if (
      budget.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await budget.deleteOne();

    res.json({
      message: "Budget deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};