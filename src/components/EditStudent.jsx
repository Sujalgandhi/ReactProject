import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editStudent } from "../redux/studentSlice";

const EditStudent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading } = useSelector((state) => state.students);

  const student = students.find(
    (student) => student.id === id || student.id === Number(id)
  );

  const [name, setName] = useState(student?.name || "");
  const [rollNumber, setRollNumber] = useState(student?.rollNumber || "");
  const [className, setClassName] = useState(student?.class || "");

  useEffect(() => {
    if (!student && !loading) {
      navigate("/");
    }
  }, [student, navigate, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedStudent = { name, rollNumber, class: className };

    dispatch(editStudent({ id, updatedStudent }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to update student:", error);
      });
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  if (!student)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Student not found.
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary fw-bold">
          <i className="bi bi-pencil-square me-2"></i>Edit Student
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter student's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Roll Number Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Roll Number</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>

          {/* Class Input */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Class</label>
            <input
              type="text"
              className="form-control rounded-3"
              placeholder="Enter class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-secondary px-4 rounded-pill"
              onClick={() => navigate("/")}
            >
              <i className="bi bi-x-circle me-1"></i>Cancel
            </button>
            <button type="submit" className="btn btn-primary px-4 rounded-pill">
              <i className="bi bi-check-circle me-1"></i>Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
