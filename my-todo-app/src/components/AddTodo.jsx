import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
    const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    onAdd(input.trim());
    setInput("");
  };

  return (
    <div className="input-group">
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Add a new task..."
    />
    <button onClick={addTask}>Add</button>
  </div>
  );
};

export default AddTodo;
