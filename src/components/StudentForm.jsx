// components/StudentForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../Actions/StudentActions';
import '/StudentForm.css'; // Import the CSS file

const StudentForm = () => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [className, setClassName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = { name, rollNumber, class: className };
    dispatch(addStudent(student));
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Add a New Student</h2>
      <input
        type="text"
        placeholder="Name"
        className="input-field"
        onChange={(e) => setName(e.target.value)}
        value={name}
        required
      />
      <input
        type="text"
        placeholder="Roll Number"
        className="input-field"
        onChange={(e) => setRollNumber(e.target.value)}
        value={rollNumber}
        required
      />
      <input
        type="text"
        placeholder="Class"
        className="input-field"
        onChange={(e) => setClassName(e.target.value)}
        value={className}
        required
      />
      <button type="submit" className="submit-button">Add Student</button>
    </form>
  );
};

export default StudentForm;
