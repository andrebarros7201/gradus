import { IUserSlice } from "@/types/IUserSlice";
import { createSlice } from "@reduxjs/toolkit";

// Initial State Values
const initialState: IUserSlice = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => builder,
});

export const userReducer = userSlice.reducer;
export const {} = userSlice.actions;
