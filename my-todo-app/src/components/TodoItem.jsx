import React from "react";

const TodoItem = ({ task, onToggle, onDelete }) => {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.isCompleted ? "completed" : ""}>{task.text}</span>
      </label>
      <button onClick={() => onDelete(task.id)}>❌</button>
    </li>
  );
};

export default TodoItem;
