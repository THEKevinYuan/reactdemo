import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

function TestNav() {
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
      </div>
    </Router>
  );
}

export default TestNav;