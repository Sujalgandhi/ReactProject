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
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h3 className="mb-0">Add New Student</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter student's name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="rollNumber" className="form-label fw-bold">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={student.rollNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter roll number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="class" className="form-label fw-bold">
                    Class
                  </label>
                  <input
                    type="text"
                    id="class"
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
                    className="btn btn-outline-secondary"
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
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
