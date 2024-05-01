// TaskSummaryChart.js

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './index.css'; // Import the CSS file for styling

const TaskSummaryChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data.length) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous Chart instance
    }

    const labels = data.map(item => item.name);
    const counts = data.map(item => item.count);

    const ctx = chartRef.current.getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Task Counts',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category', // Using category scale for categorical data
            labels: labels
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    chartInstanceRef.current = newChartInstance; // Save reference to the new Chart instance

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // Cleanup previous Chart instance on component unmount
      }
    };
  }, [data]);

  return (
    <div className="chart-container">
      <h2 className="chart-title">Task Summary</h2>
      <canvas ref={chartRef}></canvas>
      <ul className="chart-legend">
        <li className="chart-legend-item">
          <span className="chart-legend-color" style={{ backgroundColor: 'rgba(75, 192, 192, 1)' }}></span>
          <span className="chart-legend-label">Completed</span>
        </li>
        <li className="chart-legend-item">
          <span className="chart-legend-color" style={{ backgroundColor: 'rgba(255, 99, 132, 1)' }}></span>
          <span className="chart-legend-label">Pending</span>
        </li>
        <li className="chart-legend-item">
          <span className="chart-legend-color" style={{ backgroundColor: 'rgba(255, 205, 86, 1)' }}></span>
          <span className="chart-legend-label">In Progress</span>
        </li>
      </ul>
    </div>
  );
};

export default TaskSummaryChart;
