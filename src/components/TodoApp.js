import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
    setTask(storedTasks);
  }, []);

  useEffect(() => {
    // Lưu dữ liệu vào localStorage khi task thay đổi
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTask([...task, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const editTask = () => {
    if (editingTaskId !== null && newTask.trim() !== "") {
      const updatedTasks = task.map((task) =>
        task.id === editingTaskId ? { ...task, text: newTask } : task
      );
      setTask(updatedTasks);
      setEditingTaskId(null);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = task.filter((task) => task.id !== taskId);
    setTask(updatedTasks);
    setEditingTaskId(null);
  };
  const handleEditClick = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setNewTask(taskText);
  };

  const tongleTaskComplete = (taskId) => {
    const updatedTasks = task.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTask(updatedTasks);
  };
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {task.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => tongleTaskComplete(task.id)}>
              {task.completed ? "Not Done" : "Done"}
            </button>
            <button
              onClick={() => {
                handleEditClick(task.id, task.text);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {editingTaskId !== null ? (
          <button onClick={editTask}>Save Changes</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
