import { ICurrentSubjectSlice } from '@/types/ICurrentSubjectSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ICurrentSubjectSlice = {
  currentSubject: null,
  isLoading: false,
};

const currentSubjectSlice = createSlice({
  name: 'currentSubject',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export const currentSubjectReducer = currentSubjectSlice.reducer;
export const {} = currentSubjectSlice.actions;
