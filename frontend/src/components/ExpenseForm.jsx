import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const submit = (e) => {
    e.preventDefault();

    addExpense({
      amount: Math.round(Number(amount) * 100),
      category,
      description,
      date,
      requestId: crypto.randomUUID(),
    });

    setAmount("");
    setCategory("");
    setDescription("");
    setDate("");
  };

  return (
    <form
      onSubmit={submit}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
