import { IClassComplete } from '@/types/IClassComplete';
import { ICurrentClass } from '@/types/ICurrentClass';
import { INotification } from '@/types/INotificationSlice';
import { IStudentComplete } from '@/types/IStudentComplete';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: ICurrentClass = {
  currentClass: null,
  isLoading: false,
};

// Fetch current class
export const fetchCurrentClass = createAsyncThunk<
  { class: IClassComplete },
  { classId: number },
  { rejectValue: { notification: INotification } }
>('class/fetchCurrentClass', async ({ classId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/class/${classId}`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { class: data };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message ?? 'Failed to load class',
      },
    });
  }
});

export const updateStudent = createAsyncThunk<
  { student: IStudentComplete; notification: INotification },
  { studentId: number; studentName: string },
  { rejectValue: { notification: INotification } }
>('currentClass/updateStudent', async ({ studentId, studentName }, { rejectWithValue }) => {
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

const currentClassSlice = createSlice({
  name: 'currentClass',
  initialState,
  reducers: {
    clearCurrentClass: (state) => {
      state.currentClass = null;
    },
  },
  extraReducers: (builder) =>
    builder
      // Fetch Class
      .addCase(fetchCurrentClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentClass = action.payload.class;
      })
      .addCase(fetchCurrentClass.rejected, (state) => {
        state.isLoading = false;
        state.currentClass = null;
      })
      // Fetch Class
      .addCase(updateStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const { student } = action.payload;
        state.isLoading = false;
        const studentIndex = state.currentClass!.students.findIndex((s) => s.id === student.id);
        console.log(student);
        if (studentIndex === -1) return; // Student not found

        state.currentClass!.students[studentIndex].name = student.name;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const currentClassReducer = currentClassSlice.reducer;
export const { clearCurrentClass } = currentClassSlice.actions;
