import React from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mt-4">
      <h2>Student Details</h2>
      <p>Details of student with ID: {id}</p>
    </div>
  );
};

export default StudentDetails;
