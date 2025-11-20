import { ICurrentStudentSlice } from '@/types/ICurrentStudentSlice';
import { INotification } from '@/types/INotificationSlice';
import { IStudentComplete } from '@/types/IStudentComplete';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: ICurrentStudentSlice = {
  currentStudent: null,
  isLoading: false,
};

export const fetchCurrentStudent = createAsyncThunk<
  { student: IStudentComplete },
  { studentId: number },
  { rejectValue: { notification: INotification } }
>('currentStudent/fetchCurrentStudent', async ({ studentId }, { rejectWithValue }) => {
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

const currentStudentSlice = createSlice({
  name: 'currentStudent',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
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
      }),
});

export const currentStudentReducer = currentStudentSlice.reducer;
export const {} = currentStudentSlice.actions;
