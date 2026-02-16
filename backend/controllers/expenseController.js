import Expense from "../models/Expense.js";
// new data entry
export const createExpense = async (req, res) => {
  const { amount, category, description, date, requestId } = req.body;
  if (!amount || !category || !date || !requestId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  // re-submit same request
  const existing = await Expense.findOne({ requestId });
  if (existing) {
    return res.status(200).json(existing);
  }
  const expense = await Expense.create({
    userId: req.userId,
    amount,
    category,
    description,
    date,
    requestId,
  });
  res.status(201).json(expense);
};
// filter options
export const getExpenses = async (req, res) => {
  const { category, sort } = req.query;
  const query = { userId: req.userId };
  if (category) query.category = category;

  const sortOption = sort === "date_desc" ? { date: -1 } : {};

  const expenses = await Expense.find(query).sort(sortOption);
  res.json(expenses);
};
