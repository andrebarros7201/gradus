'use client';

import { RootDispatch, RootState } from '@/redux/store';
import classes from './notification.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '@/redux/slices/notificationSlice';

export const Notification = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { notification, isVisible } = useSelector((state: RootState) => state.notification);

  function handleCloseNotification() {
    dispatch(closeNotification());
  }
  return (
    isVisible &&
    notification && (
      <div className={`${classes.notification} ${classes[notification.type]}`}>
        <div className={classes.top}>
          <h3 className={classes['notification__title']}>{notification.type}</h3>
          <button
            className={classes['notification__close-button']}
            onClick={handleCloseNotification}
          >
            X
          </button>
        </div>
        <p className={classes['notification__message']}>{notification.message}</p>
      </div>
    )
  );
};
