import { GoogleGenerativeAI } from "@google/generative-ai";

import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import Budget from "../models/Budget.js";


// GENERATE AI INSIGHTS
export const generateInsights = async (
  req,
  res
) => {

  try {

    console.log(
      process.env.GEMINI_API_KEY
    );

    const genAI =
      new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
      );

    const model =
      genAI.getGenerativeModel({
       model: "gemini-2.5-flash",
      });


    const expenses = await Expense.find({
      user: req.user._id,
    });

    const income = await Income.find({
      user: req.user._id,
    });

    const budgets = await Budget.find({
      user: req.user._id,
    });


    // CLEAN DATA
    const expenseData = expenses.map(
      (expense) => ({
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      })
    );

    const incomeData = income.map(
      (item) => ({
        source: item.source,
        amount: item.amount,
      })
    );

    const budgetData = budgets.map(
      (budget) => ({
        category: budget.category,
        limit: budget.limit,
      })
    );


    const prompt = `
Analyze this financial data. Do response every amount in indian rupee only.

Expenses:
${JSON.stringify(expenseData)}

Income:
${JSON.stringify(incomeData)}

Budgets:
${JSON.stringify(budgetData)}

Provide:
1. Spending insights
2. Savings analysis
3. Overspending warnings
4. Smart recommendations

Keep response under 120 words.
`;

    console.log("AI route hit");


   let result;

try {

  result =
    await model.generateContent(prompt);

} catch (error) {

  // retry once after delay
  if (error.status === 503) {

    console.log(
      "Retrying AI request..."
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );

    result =
      await model.generateContent(prompt);
  } else {
    throw error;
  }
}

    const text =
      result.response?.candidates?.[0]
        ?.content?.parts?.[0]?.text
      || "No insights generated.";

    console.log(text);

    res.json({
      insights: text,
    });

  } catch (error) {

  console.log(error);

  let message =
    "AI service unavailable.";

  if (error.status === 429) {
    message =
      "AI quota exceeded. Try later.";
  }

  if (error.status === 503) {
    message =
      "AI servers are busy right now. Please retry.";
  }

  res.status(500).json({
    message,
  });
}
};