import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudent } from "../redux/studentSlice";
import { Link } from "react-router-dom";

const StudentList = () => {
  const dispatch = useDispatch();
  const { students = [], loading, error } = useSelector((state) => state.students);

  const [search, setSearch] = useState("");
  const [filterByClass, setFilterByClass] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // Memoizing sorted and filtered students to avoid recalculating on every render
  const sortedStudents = useMemo(() => {
    return [...students].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.rollNumber - b.rollNumber;
      }
    });
  }, [students, sortBy]);

  const filteredStudents = useMemo(() => {
    return sortedStudents.filter((student) => {
      return (
        student.name.toLowerCase().includes(search.toLowerCase()) &&
        student.class.toLowerCase().includes(filterByClass.toLowerCase())
      );
    });
  }, [sortedStudents, search, filterByClass]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id))
        .unwrap()
        .then(() => {
          // Optimistic update: Remove student from the list after deletion
          const updatedStudents = students.filter((student) => student.id !== id);
          dispatch({ type: 'students/setStudents', payload: updatedStudents });
        })
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

        {/* Students Card Layout */}
        {filteredStudents.length > 0 ? (
          <div className="row">
            {filteredStudents.map((student) => (
              <div key={student.id} className="col-md-4 col-sm-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {student.name}
                    </h5>
                    <p className="card-text">
                      <strong>Roll Number:</strong> {student.rollNumber}
                    </p>
                    <p className="card-text">
                      <strong>Class:</strong> {student.class}
                    </p>
                  </div>
                  <div className="card-footer text-end">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
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
