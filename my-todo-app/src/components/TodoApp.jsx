import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import TodoList from "./TodoList";

// Main container component for the to-do app
const TodoApp = () => {

    // Load todos from localStorage or default to empty
    const [tasks, setTasks] = useState(
        () => {
        const saved = localStorage.getItem("todoTasks");
        try {
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
      
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        const fetchTodos = async () => {
          if (tasks.length === 0) {
            try {
              const res = await fetch("https://dummyjson.com/todos?limit=10");
              if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
              const data = await res.json();
              const mapped = data.todos.map((todo) => ({
                id: todo.id,
                text: todo.todo,
                isCompleted: todo.completed,
              }));
              setTasks(mapped);
            } catch (error) {
              console.error("Failed to fetch todos:", error);
            }
          }
        };
      
        fetchTodos();
    }, []);
      
  

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const visibleTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.isCompleted;
    if (filterStatus === "pending") return !task.isCompleted;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>
      <AddTodo onAdd={handleAdd} />
      <Filter current={filterStatus} setFilter={setFilterStatus} />
      <TodoList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default TodoApp;
