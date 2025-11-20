export interface INotificationSlice {
  notification: INotification | null;
  isVisible: boolean;
}

export interface INotification {
  message: string;
  type: 'success' | 'error';
}
