import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  professorList: null,
  isLoading: false,
};

const professorSlice = createSlice({
  name: 'professorSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export const professorReducer = professorSlice.reducer;
export const {} = professorSlice.actions;
