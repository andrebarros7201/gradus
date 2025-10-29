import { INotification, INotificationSlice } from '@/types/INotificationSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: INotificationSlice = {
  notification: null,
  isVisible: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotification>) => {
      state.notification = action.payload;
      state.isVisible = true;
    },
    closeNotification: (state) => {
      state.notification = null;
      state.isVisible = false;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { setNotification, closeNotification } = notificationSlice.actions;
