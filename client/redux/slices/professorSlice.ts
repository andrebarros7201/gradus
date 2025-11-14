import { INotification } from '@/types/INotificationSlice';
import { IProfessorSlice } from '@/types/IProfessorSlice';
import { IUserProfessor } from '@/types/IUser';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const initialState: IProfessorSlice = {
  professorList: null,
  isLoading: false,
};

export const fetchAllProfessors = createAsyncThunk<
  { professors: IUserProfessor[] },
  void,
  { rejectValue: { notification: INotification } }
>('professor/fetchAllProfessors', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/professor`, {
      withCredentials: true,
    });
    const { data } = response.data;
    return { professors: data };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message ?? 'Failed to load professors',
      },
    });
  }
});

const professorSlice = createSlice({
  name: 'professorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllProfessors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProfessors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.professorList = action.payload.professors;
      })
      .addCase(fetchAllProfessors.rejected, (state) => {
        state.isLoading = false;
        state.professorList = [];
      }),
});

export const professorReducer = professorSlice.reducer;
export const {} = professorSlice.actions;
