// TaskList.js

import React from 'react';
import './index.css'

const TaskList = ({ tasks, onDeleteTask, onUpdateTaskStatus }) => {
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
              <span>Status: {task.status}</span>
            </div>
            <div className="task-actions">
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              <select value={task.status} onChange={(e) => onUpdateTaskStatus(task.id, e.target.value)}>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
