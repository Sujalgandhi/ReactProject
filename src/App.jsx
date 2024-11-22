import React from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm />
      <ErrorBoundary>
        <StudentList />
      </ErrorBoundary>
    </div>
  );
};

export default App;
