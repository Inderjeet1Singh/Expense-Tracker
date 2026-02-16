import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createExpense,
  getExpenses,
} from "../controllers/expenseController.js";

const expenseRoutes = express.Router();

expenseRoutes.use(protect);

expenseRoutes.post("/", createExpense);
expenseRoutes.get("/", getExpenses);

export default expenseRoutes;
