import React from "react";
const Filters = ({ onChange, onSort }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white border rounded-xl p-4 shadow-sm">
      <div className="flex gap-2 flex-wrap">
        {["All", "Food", "Travel", "Shopping"].map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat === "All" ? "" : cat)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="sm:ml-auto">
        <select
          onChange={(e) => onSort(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
