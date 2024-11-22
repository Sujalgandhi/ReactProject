import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5173/students";

// Fetch students from API
export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetched Students:", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add a new student
export const addStudent = createAsyncThunk(
    "students/addStudent",
    async (student, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, student);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Delete a student by ID
export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id; // Return the student ID to remove from state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Edit a student by ID
export const editStudent = createAsyncThunk(
    "students/editStudent",
    async ({ id, updatedStudent }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
            return response.data; // Return the updated student
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const studentSlice = createSlice({
    name: "students",
    initialState: { students: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.students.push(action.payload); // Add new student
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                // Filter out the student that was deleted
                state.students = state.students.filter(student => student.id !== action.payload);
            })
            .addCase(editStudent.fulfilled, (state, action) => {
                // Update the student in the state with the new data
                const index = state.students.findIndex(student => student.id === action.payload.id);
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            });
    },
});

export default studentSlice.reducer;
