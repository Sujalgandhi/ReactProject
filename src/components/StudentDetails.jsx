// components/StudentDetails.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteStudent, updateStudent } from '../Actions/StudentActions';

const StudentDetails = ({ student }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteStudent(student.id));
  };

  const handleUpdate = () => {
    const updatedStudent = { ...student, name: `${student.name} Updated` };
    dispatch(updateStudent(updatedStudent));
  };

  return (
    <div>
      <h3>{student.name}</h3>
      <p>Roll Number: {student.rollNumber}</p>
      <p>Class: {student.class}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default StudentDetails;
