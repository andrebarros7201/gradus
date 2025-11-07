import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { notificationReducer } from './slices/notificationSlice';
import { classReducer } from './slices/classSlice';
import { currentClassReducer } from './slices/currentClassSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
    class: classReducer,
    currentClass: currentClassReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
