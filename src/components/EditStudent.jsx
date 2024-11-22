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
        console.log("Failed to update student:", error);
      });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!student)
    return <div className="text-center mt-5 text-danger">Student not found</div>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4 text-primary">Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter student's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Roll Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter roll number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Class</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
