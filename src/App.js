import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Import CSS styles
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Login from './components/Login'; // Import the Login component
import TaskSummaryChart from './components/TaskSummaryChart'; // Import the TaskSummaryChart component

const App = () => {
  // State for tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
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
    ];
  });

  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // State for login error message
  const [loginError, setLoginError] = useState('');

  // State for task metrics
  const [taskMetrics, setTaskMetrics] = useState([]);

  // Function to save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to save login status to localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // Function to handle task submission
  const handleTaskSubmit = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to handle login
  const handleLogin = (username, password) => {
    if (username === 'user' && password === 'password') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect username or password. Please try again.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Function to handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Function to handle task status update
  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to calculate task metrics
  const calculateTaskMetrics = useCallback(() => {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'pending').length;
    const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
    setTaskMetrics([
      { name: 'Completed', count: completedTasks },
      { name: 'Pending', count: pendingTasks },
      { name: 'In Progress', count: inProgressTasks }
    ]);
  }, [tasks]);

  // Effect to calculate task metrics when tasks state changes
  useEffect(() => {
    calculateTaskMetrics();
  }, [tasks, calculateTaskMetrics]);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>Task Management App</h1>
        {isLoggedIn && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        // If logged in, render task list, task form, and task summary chart
        <div>
          <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onUpdateTaskStatus={handleUpdateTaskStatus} />
          <TaskForm onAddTask={handleTaskSubmit} />
          <TaskSummaryChart data={taskMetrics} />
        </div>
      ) : (
        // If not logged in, render login form
        <div>
          <Login onLogin={handleLogin} />
          {loginError && <div className="error-message">{loginError}</div>}
        </div>
      )}
    </div>
  );
};

export default App;
