import React from "react";

const Filter = ({ current, setFilter }) => {
  const filters = ["all", "completed", "pending"];

  return (
    <div className="filter-buttons">
      {filters.map((status) => (
        <button
          key={status}
          onClick={() => setFilter(status)}
          className={current === status ? "active" : ""}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Filter;
