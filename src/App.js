// App.js

import React, { useState } from 'react';
import './App.css'; // Import CSS styles
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login'; // Import the Login component

const App = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Task 1',
      description: 'Description for Task 1',
      dueDate: '2024-05-01',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Task 2',
      description: 'Description for Task 2',
      dueDate: '2024-05-02',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Task 3',
      description: 'Description for Task 3',
      dueDate: '2024-05-03',
      status: 'completed'
    }
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [loginError, setLoginError] = useState('');

  const handleTaskSubmit = (newTask) => {
    // Add the new task to the existing tasks array
    setTasks([...tasks, newTask]);
  };

  const handleLogin = (username, password) => {
    // Perform authentication logic here (e.g., check against hardcoded credentials)
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect username or password. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="header">
        <h2 className='header-name'>Task Manager</h2>
        {isLoggedIn && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
      {isLoggedIn ? (
        <div>
          <TaskList tasks={tasks} />
          <TaskForm onAddTask={handleTaskSubmit} />
        </div>
      ) : (
        <div>
          <Login onLogin={handleLogin} />
          {loginError && <div className="error-message">{loginError}</div>}
        </div>
      )}
    </div>
  );
};

export default App;