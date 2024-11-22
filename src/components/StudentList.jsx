import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/studentSlice";
import { Link, useNavigate } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const navigate = useNavigate(); // For navigating to the edit page if needed

  const [search, setSearch] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      return a.rollNumber - b.rollNumber;
    }
  });

  const filteredStudents = sortedStudents.filter((student) => {
    return (
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      student.class.toLowerCase().includes(filterByClass.toLowerCase())
    );
  });

  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id))
        .unwrap()
        .catch((error) => {
          console.error("Failed to delete student:", error);
        });
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Error: {error}
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary mb-4">Student List</h2>

        {/* Search and Filter Section */}
        <div className="row mb-4">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Search by Name</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="Search by student name"
            />
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">Filter by Class</label>
            <input
              type="text"
              value={filterByClass}
              onChange={(e) => setFilterByClass(e.target.value)}
              className="form-control"
              placeholder="Enter class to filter"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="name">Name</option>
              <option value="rollNumber">Roll Number</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        {filteredStudents.length > 0 ? (
          <table className="table table-striped">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.class}</td>
                  <td>
                    <Link
                      to={`/edit/${student.id}`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info text-center">
            No students match your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
