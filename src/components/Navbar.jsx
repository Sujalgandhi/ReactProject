// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/students">Student List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/add-student">Add Student</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
