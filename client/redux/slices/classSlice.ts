import { IClassSlice } from '@/types/IClassSlice';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IClassSlice = {
  isLoading: false,
  classes: [],
};

const classSlice = createSlice({
  name: 'classSlice',
  initialState,
  reducers: {},
  extraReducers: (build) => build,
});

export const classReducer = classSlice.reducer;
