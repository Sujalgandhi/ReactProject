import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm">
      <div className="container">
        {/* Brand Name */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <i className="bi bi-person-circle me-2 fs-4"></i>
          <span>Student Management</span>
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <Link to="/" className="nav-link text-light fw-bold">
                <i className="bi bi-list-ul me-2"></i>Student List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="btn btn-primary ms-lg-3">
                <i className="bi bi-plus-circle me-1"></i>Add Student
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
