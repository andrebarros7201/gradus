import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
