import { useExpenses } from "../context/ExpenseContext";

const ExpenseList = ({ category, sort }) => {
  const { expenses } = useExpenses();

  let filtered = category
    ? expenses.filter((e) => e.category === category)
    : expenses;

  if (sort === "date_asc") {
    filtered = [...filtered].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
  } else {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }

  const total = filtered.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-4">
      <div className="hidden md:grid grid-cols-4 gap-4 px-4 text-sm font-semibold text-gray-600">
        <span>Category</span>
        <span>Description</span>
        <span>Date</span>
        <span className="text-right">Amount</span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No expenses found</div>
      ) : (
        <ul className="space-y-2">
          {filtered.map((e) => (
            <li
              key={e._id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white border rounded-xl px-4 py-3"
            >
              <span className="font-medium">{e.category}</span>
              <span>{e.description || "—"}</span>
              <span className="text-sm text-gray-500">
                {new Date(e.date).toLocaleDateString("en-IN")}
              </span>
              <span className="text-right font-semibold">
                ₹{(e.amount / 100).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex justify-between border-t pt-4">
        <span className="font-semibold">Total</span>
        <span className="font-bold text-blue-600">
          ₹{(total / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseList;
