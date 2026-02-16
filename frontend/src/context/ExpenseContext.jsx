import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext();
const backend_url = import.meta.env.VITE_BACKEND_URL;

export const ExpenseProvider = ({ children }) => {
  const { token } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`${backend_url}/expenses?sort=date_desc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    }
  };

  const addExpense = async (data) => {
    try {
      await axios.post(`${backend_url}/expenses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Expense added");
      fetchExpenses();
    } catch (err) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, fetchExpenses, addExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);
