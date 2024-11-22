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
            console.error("Fetch Students Error:", error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add a new student
export const addStudent = createAsyncThunk(
    "students/addStudent",
    async (student, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, student);
            console.log("Added Student:", response.data);
            return response.data;
        } catch (error) {
            console.error("Add Student Error:", error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete a student by ID
export const deleteStudent = createAsyncThunk(
    "students/deleteStudent",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            console.log("Deleted Student ID:", id);
            return id;
        } catch (error) {
            console.error("Delete Student Error:", error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Edit a student by ID
export const editStudent = createAsyncThunk(
    "students/editStudent",
    async ({ id, updatedStudent }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedStudent);
            console.log("Edited Student:", response.data);
            return response.data;
        } catch (error) {
            console.error("Edit Student Error:", error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const studentSlice = createSlice({
    name: "students",
    initialState: { students: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Students
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch students.";
            })

            // Add Student
            .addCase(addStudent.fulfilled, (state, action) => {
                state.students.push(action.payload);
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.error = action.payload || "Failed to add student.";
            })

            // Delete Student
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter(
                    (student) => student.id !== action.payload
                );
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.error = action.payload || "Failed to delete student.";
            })

            // Edit Student
            .addCase(editStudent.fulfilled, (state, action) => {
                const index = state.students.findIndex(
                    (student) => student.id === action.payload.id
                );
                if (index !== -1) {
                    state.students[index] = action.payload;
                }
            })
            .addCase(editStudent.rejected, (state, action) => {
                state.error = action.payload || "Failed to edit student.";
            });
    },
});

export default studentSlice.reducer;
