import React from 'react';
import '../styles/theme.css';

export default function Header() {
  return (
    <header className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1>Dashboard</h1>
          <p>Manage parking operations and view insights</p>
        </div>
      </div>
    </header>
  );
}
