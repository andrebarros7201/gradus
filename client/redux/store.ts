import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
