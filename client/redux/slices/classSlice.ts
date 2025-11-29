import { IClassComplete } from '@/types/interfaces/IClassComplete';
import { IClassSimple } from '@/types/interfaces/IClassSimple';
import { IClassSlice } from '@/types/slices/IClassSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { RootDispatch } from '../store';
import { setStudentList } from './studentSlice';
import { ISubjectSimple } from '@/types/interfaces/ISubjectSimple';
import { setSubjectList } from './subjectSlice';
import { IStudentSimple } from '@/types/interfaces/IStudentSimple';

const initialState: IClassSlice = {
  isLoading: false,
  pages: null,
  classes: [],
  currentClass: null,
};

// Fetch All Classes
export const fetchAllClasses = createAsyncThunk<
  { classes: IClassSimple[]; numberPages: number },
  { page: number },
  { rejectValue: { notification: INotification } }
>('class/fetchAllClasses', async ({ page }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/class?page=${page}`, {
      withCredentials: true,
    });
    const { data: classes, numberPages } = response.data;
    return { classes, numberPages };
  } catch (e) {
    const error = e as AxiosError<{ message: string }>;
    return rejectWithValue({
      notification: {
        type: 'error',
        message: error.response?.data.message ?? 'Failed to load classes',
      },
    });
  }
});

// Fetch current class
export const fetchCurrentClass = createAsyncThunk<
  { class: IClassComplete },
  { classId: number },
  { rejectValue: { notification: INotification }; dispatch: RootDispatch }
>('class/fetchCurrentClass', async ({ classId }, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${process.env.SERVER_URL}/api/class/${classId}`, {
      withCredentials: true,
    });
    const { data } = response.data;

    // Create a clean student list
    const studentList: IStudentSimple[] = data.students.map((s: IStudentSimple) => ({
      id: s.id,
      name: s.name,
      className: null,
    }));

    dispatch(setStudentList({ studentList }));
    dispatch(setSubjectList({ subjectList: data.subjects }));
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

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {
    clearCurrentClass: (state) => {
      state.currentClass = null;
    },
    updateClass: (
      state,
      action: PayloadAction<{
        userId: number;
        name: string;
        username: string;
        schoolYear: string;
        isActive: boolean;
      }>,
    ) => {
      const { userId, name, username, schoolYear, isActive } = action.payload;
      const indexClass = state.classes.findIndex((c) => c.userId === userId);

      // Don't change if index equals -1
      if (indexClass === -1) return;

      state.classes[indexClass].name = name;
      state.classes[indexClass].username = username;
      state.classes[indexClass].schoolYear = schoolYear;
      state.classes[indexClass].isActive = isActive;
    },
    removeClass: (state, action: PayloadAction<{ userId: number }>) => {
      const indexClass = state.classes.findIndex((c) => c.userId === action.payload.userId);

      // Don't change if index equals -1
      if (indexClass === -1) return;

      state.classes.splice(indexClass, 1);
    },
    addSubject: (state, action: PayloadAction<{ newSubject: ISubjectSimple }>) => {
      state.currentClass?.subjects.push(action.payload.newSubject);
    },
    removeSubject: (state, action: PayloadAction<{ subjectId: number }>) => {
      const { subjectId } = action.payload;
      const subjectIndex = state.currentClass!.subjects.findIndex((s) => s.id === subjectId);

      // Don't change if index equals -1
      if (subjectId === -1) return;
      state.currentClass?.subjects.splice(subjectIndex, 1);
    },
  },
  extraReducers: (builder) =>
    builder
      // Fetch All Classes
      .addCase(fetchAllClasses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllClasses.fulfilled, (state, action) => {
        state.isLoading = true;
        state.classes = action.payload.classes;
        state.pages = action.payload.numberPages;
      })
      .addCase(fetchAllClasses.rejected, (state) => {
        state.isLoading = false;
        state.classes = [];
        state.pages = null;
      })
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
      }),
});

export const classReducer = classSlice.reducer;
export const { addSubject, removeSubject, clearCurrentClass, updateClass, removeClass } =
  classSlice.actions;
