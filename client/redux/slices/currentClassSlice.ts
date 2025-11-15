import { IClassComplete } from '@/types/IClassComplete';
import { ICurrentClassSlice } from '@/types/ICurrentClassSlice';
import { INotification } from '@/types/INotificationSlice';
import { IStudentComplete } from '@/types/IStudentComplete';
import { ISubjectSimple } from '@/types/ISubjectSimple';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: ICurrentClassSlice = {
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

// Create Student
export const createStudent = createAsyncThunk<
  { student: IStudentComplete; notification: INotification },
  { studentName: string; classId: number },
  { rejectValue: { notification: INotification } }
>('currentClass/createStudent', async ({ studentName, classId }, { rejectWithValue }) => {
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

// Update Student
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

// Delete Student
export const deleteStudent = createAsyncThunk<
  { studentId: number; notification: INotification },
  { studentId: number },
  { rejectValue: { notification: INotification } }
>('currentClass/deleteStudent', async ({ studentId }, { rejectWithValue }) => {
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

// Create Subject
export const createSubject = createAsyncThunk<
  { subject: ISubjectSimple; notification: INotification },
  { name: string; professorId: number; classId: number },
  { rejectValue: { notification: INotification } }
>('currentClass/createSubject', async ({ name, professorId, classId }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/api/subject`,
      { name, professorId, classId },
      { withCredentials: true },
    );
    const { data } = response.data;
    return {
      notification: { type: 'success', message: 'Subject created successfully' },
      subject: { id: data.id, name: data.name, professor: data.professor },
    };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message || 'Failed to create subject',
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

        if (studentIndex === -1) return; // Student not found

        state.currentClass!.students[studentIndex].name = student.name;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.isLoading = false;
      })
      // Create Student
      .addCase(createStudent.fulfilled, (state, action) => {
        const { student } = action.payload;
        state.isLoading = false;
        state.currentClass?.students.push(student);
      })
      .addCase(createStudent.rejected, (state) => {
        state.isLoading = false;
      })
      // Create Subject
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        const { subject } = action.payload;
        state.isLoading = false;
        state.currentClass?.subjects.push(subject);
      })
      .addCase(createSubject.rejected, (state) => {
        state.isLoading = false;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        const { studentId } = action.payload;
        const studentIndex = state.currentClass!.students.findIndex((s) => s.id === studentId);

        if (studentIndex === -1) return; // Student not found

        state.currentClass!.students.splice(studentIndex, 1);
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.isLoading = false;
      }),
});

export const currentClassReducer = currentClassSlice.reducer;
export const { clearCurrentClass } = currentClassSlice.actions;
