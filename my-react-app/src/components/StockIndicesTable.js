import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import data from '../assets/monthly_international_major_stock_price_indices_20240822.json';
import '../styles/StockIndicesTable.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockIndicesTable() {
  const [indices, setIndices] = useState([]);
  const [visibleIndices, setVisibleIndices] = useState({});

  useEffect(() => {
    const detectedIndices = Object.keys(data[0])
      .filter(key => key !== '月別')
      .map((key, index) => ({
        key,
        label: key,
        color: `hsl(${index * 36}, 70%, 50%)`
      }));
    setIndices(detectedIndices);
    const initialVisibility = {};
    detectedIndices.forEach(index => {
      initialVisibility[index.key] = true;
    });
    setVisibleIndices(initialVisibility);
  }, []);

  const dates = data.map(item => item['月別']);

  const toggleIndexVisibility = (indexKey) => {
    setVisibleIndices(prev => ({
      ...prev,
      [indexKey]: !prev[indexKey]
    }));
  };

  const chartData = {
    labels: dates,
    datasets: indices
      .filter(index => visibleIndices[index.key])
      .map(index => ({
        label: index.label,
        data: data.map(item => item[index.key]),
        borderColor: index.color,
        backgroundColor: index.color + '40',
        borderWidth: 2,
        pointRadius: 0,
      })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="stock-indices-container">
      <h1 className="main-title">International Major Stock Price Indices</h1>
      <div className="chart-legend-container">
        <div className="chart-container">
          <Line options={options} data={chartData} />
        </div>
        <div className="legend-container">
          {indices.map(index => (
            <div key={index.key} className="legend-item">
              <span className="legend-label" style={{color: index.color}}>{index.label}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={visibleIndices[index.key]}
                  onChange={() => toggleIndexVisibility(index.key)}
                />
                <span className="slider" style={{'--slider-color': index.color}}></span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="tables-container">
        {indices.map(index => (
          <div key={index.key} className={`table-wrapper ${visibleIndices[index.key] ? '' : 'hidden'}`}>
            <h3>{index.label}</h3>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  {dates.map(date => (
                    <th key={date}>{date}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{index.label}</td>
                  {data.map((item, i) => (
                    <td key={i}>{item[index.key]}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockIndicesTable;