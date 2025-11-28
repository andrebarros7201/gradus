'use client';

import classes from './classList.module.scss';
import { RootDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '../ui/list/List';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button/Button';
import { fetchAllClasses } from '@/redux/slices/classSlice';
import { INotification } from '@/types/slices/INotificationSlice';
import { setNotification } from '@/redux/slices/notificationSlice';

export const ClassList = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { classes: classList, pages } = useSelector((state: RootState) => state.class);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    try {
      dispatch(fetchAllClasses({ page: index }));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }, [dispatch, index]);

  return (
    <main className={classes['list']}>
      <List type={'class'} list={classList} />
      <div className={classes['list__footer']}>
        <Button
          label={'Prev Page'}
          disabled={index === 1}
          onClick={() => setIndex((prev) => --prev)}
        />
        <h4>Page {index}</h4>
        <Button
          disabled={index === pages}
          label={'Next Page'}
          onClick={() => setIndex((prev) => ++prev)}
        />
      </div>
    </main>
  );
};
