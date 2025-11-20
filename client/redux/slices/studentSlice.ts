import { IStudentSlice } from '@/types/slices/IStudentSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import { IStudentComplete } from '@/types/interfaces/IStudentComplete';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IStudentSimple } from '@/types/interfaces/IStudentSimple';

const initialState: IStudentSlice = {
  currentStudent: null,
  studentList: [],
  isLoading: false,
};

// Fetch current student
export const fetchCurrentStudent = createAsyncThunk<
  { student: IStudentComplete },
  { studentId: number },
  { rejectValue: { notification: INotification } }
>('student/fetchCurrentStudent', async ({ studentId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/student/${studentId}`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { student: data };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to load student data',
      },
    });
  }
});

// Create Student
export const createStudent = createAsyncThunk<
  { student: IStudentComplete; notification: INotification },
  { studentName: string; classId: number },
  { rejectValue: { notification: INotification } }
>('student/createStudent', async ({ studentName, classId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/api/student`,
      { name: studentName, classId },
      { withCredentials: true },
    );
    const { data } = response.data;
    return {
      notification: { type: 'success', message: 'Student created successfully' },
      student: data,
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to create student',
      },
    });
  }
});

// Update student
export const updateStudent = createAsyncThunk<
  { student: IStudentComplete; notification: INotification },
  { studentId: number; studentName: string },
  { rejectValue: { notification: INotification } }
>('student/updateStudent', async ({ studentId, studentName }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(
      `${process.env.SERVER_URL}/api/student/${studentId}`,
      { name: studentName },
      { withCredentials: true },
    );
    const { data } = response.data;
    return {
      notification: { type: 'success', message: 'Student updated successfully' },
      student: data,
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to update student',
      },
    });
  }
});

// Delete Student
export const deleteStudent = createAsyncThunk<
  { studentId: number; notification: INotification },
  { studentId: number },
  { rejectValue: { notification: INotification } }
>('student/deleteStudent', async ({ studentId }, { rejectWithValue }) => {
  try {
    await axios.delete(`${process.env.SERVER_URL}/api/student/${studentId}`, {
      withCredentials: true,
    });
    return {
      notification: { type: 'success', message: 'Student deleted successfully' },
      studentId,
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to delete student',
      },
    });
  }
});

const currentStudentSlice = createSlice({
  name: 'currentStudent',
  initialState,
  reducers: {
    setStudentList: (state, action: PayloadAction<{ studentList: IStudentSimple[] }>) => {
      state.studentList = action.payload.studentList;
    },
    clearStudentList: (state) => {
      state.studentList = [];
    },
  },
  extraReducers: (builder) =>
    builder
      // Fetch current student
      .addCase(fetchCurrentStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentStudent = action.payload.student;
      })
      .addCase(fetchCurrentStudent.rejected, (state) => {
        state.isLoading = false;
        state.currentStudent = null;
      })
      // Create student
      .addCase(createStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        const { student } = action.payload;
        state.isLoading = false;
        state.studentList.push(student);
      })
      .addCase(createStudent.rejected, (state) => {
        state.isLoading = false;
      })
      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const { student } = action.payload;
        state.isLoading = false;
        const studentIndex = state.studentList.findIndex((s) => s.id === student.id);

        if (studentIndex === -1) return; // Student not found

        state.studentList[studentIndex].name = student.name;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const { studentId } = action.payload;
        const studentIndex = state.studentList.findIndex((s) => s.id === studentId);

        if (studentIndex === -1) return; // Student not found

        state.studentList.splice(studentIndex, 1);
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const studentReducer = currentStudentSlice.reducer;
export const { setStudentList, clearStudentList } = currentStudentSlice.actions;
