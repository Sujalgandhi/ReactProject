export const setLoading = () => ({
    type: 'SET_LOADING'
  });
  
  export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error
  });
  
  export const fetchStudents = () => async (dispatch) => {
    dispatch(setLoading());
    try {
      const res = await fetch('http://localhost:5174/students');
      const data = await res.json();
      dispatch({ type: 'FETCH_STUDENTS', payload: data });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  export const addStudent = (student) => async (dispatch) => {
    try {
      const res = await fetch('http://localhost:5174/students', {
        method: 'POST',
        body: JSON.stringify(student),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({ type: 'ADD_STUDENT', payload: data });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  export const updateStudent = (student) => async (dispatch) => {
    try {
      const res = await fetch(`http://localhost:5174/students/${student.id}`, {
        method: 'PUT',
        body: JSON.stringify(student),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      dispatch({ type: 'UPDATE_STUDENT', payload: data });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  export const deleteStudent = (id) => async (dispatch) => {
    try {
      await fetch(`http://localhost:5174/students/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'DELETE_STUDENT', payload: id });
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
  
  export const handleError = (errorMessage) => {
    return {
      type: 'SET_ERROR',
      payload: errorMessage,
    };
  };
  