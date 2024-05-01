// TaskList.js

import React from 'react';
import './index.css'

const TaskList = ({ tasks }) => {
  const calculateTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffMs = due - now;
    if (diffMs <= 0) {
      return 'Time is up!';
    } else {
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      return `${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s`;
    }
  };

  return (
    <div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span className={`status-indicator ${task.status}`}></span>
            <div className="task-details">
              <h3>{task.name}</h3>
              <p>{task.description}</p>
              <span>Due: {task.dueDate}</span>
              <span>Time remaining: {calculateTimeRemaining(task.dueDate)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
