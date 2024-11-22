// StudentList.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const StudentList = () => {
  const students = useSelector((state) => state.students.students); // Adjust if needed based on state structure

  // Check if students is an array before mapping
  if (!Array.isArray(students) || students.length === 0) {
    return <p>No students available.</p>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.rollNumber}>
            {student.name} - {student.class}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
