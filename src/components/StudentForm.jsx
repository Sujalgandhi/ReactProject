import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../redux/studentSlice";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    class: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(student));
    setStudent({ name: "", rollNumber: "", class: "" });
    navigate("/"); // Redirect to the home page after submission
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary mb-4">Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter student's name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={student.rollNumber}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter roll number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Class</label>
            <input
              type="text"
              name="class"
              value={student.class}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter class"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
