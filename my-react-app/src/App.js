import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockIndicesTable from './components/StockIndicesTable';

function Home() {
  return <h2>Welcome to the Stock Indices App</h2>;
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stock-indices">Stock Indices</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stock-indices" element={<StockIndicesTable />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;