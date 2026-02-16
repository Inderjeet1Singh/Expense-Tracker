import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Filters from "../components/Filters";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../context/ExpenseContext";

const Home = () => {
  const { token } = useAuth();
  const { fetchExpenses } = useExpenses();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");

  useEffect(() => {
    if (token) fetchExpenses(sort);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {!token && (
        <div className="flex items-center justify-center px-4 py-32">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-gray-800">
              Expense Tracker
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              A simple way to track your daily expenses and stay in control of
              your money.
            </p>
            <p className="text-sm text-gray-500">
              Please login or signup to continue
            </p>
          </div>
        </div>
      )}

      {token && (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ExpenseForm />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Filters onChange={setCategory} onSort={setSort} />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ExpenseList category={category} sort={sort} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
