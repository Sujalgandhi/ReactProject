import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/studentSlice";
import { Link } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Fetch students on component mount
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Sort and filter students
  const filteredStudents = [...students]
    .filter((student) => {
      const studentName = (student.name || "").toLowerCase();
      const studentClass = (student.class || "").toLowerCase();
      const searchValue = search.toLowerCase();
      const classFilter = filterByClass.toLowerCase();

      return (
        studentName.includes(searchValue) &&
        studentClass.includes(classFilter)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
      } else {
        return (a.rollNumber || 0) - (b.rollNumber || 0);
      }
    });

  // Handle student deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id))
        .unwrap()
        .catch((error) => {
          console.error("Failed to delete student:", error);
        });
    }
  };

  // Render loading spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Render error message
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Error: {error}
      </div>
    );
  }

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
                  <td>{student.name || "N/A"}</td>
                  <td>{student.rollNumber || "N/A"}</td>
                  <td>{student.class || "N/A"}</td>
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
