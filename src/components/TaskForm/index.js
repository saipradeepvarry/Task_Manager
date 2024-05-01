import React, { useState } from 'react';
import './index.css'

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new task object
    const newTask = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (for demo purposes)
      name: taskName,
      description: description,
      dueDate: dueDate,
      status: 'pending' // Set initial status as 'pending'
    };
    // Pass the new task data to the parent component
    onAddTask(newTask);
    // Reset form fields
    setTaskName('');
    setDescription('');
    setDueDate('');
  };

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
