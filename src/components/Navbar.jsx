import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary py-3 shadow">
      <div className="container">
        {/* Brand Name */}
        <Link to="/" className="navbar-brand fw-bold">
          <i className="bi bi-person-circle me-2"></i>Student Management
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
          <div className="ms-auto">
            <Link to="/" className="btn btn-light me-2">
              <i className="bi bi-list"></i> Student List
            </Link>
            <Link to="/add" className="btn btn-outline-light">
              <i className="bi bi-plus-circle"></i> Add Student
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
