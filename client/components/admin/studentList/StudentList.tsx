'use client';

import classes from './studentList.module.scss';
import { RootDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { INotification } from '@/types/slices/INotificationSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { List } from '@/components/ui/list/List';
import { Button } from '@/components/ui/button/Button';
import { fetchAllStudents } from '@/redux/slices/studentSlice';

export const StudentList = () => {
  const dispatch = useDispatch<RootDispatch>();
  const { studentList, pages } = useSelector((state: RootState) => state.student);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    try {
      dispatch(fetchAllStudents({ page: index }));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }, [dispatch, index]);

  return (
    <main className={classes['list']}>
      <List type={'student'} list={studentList} />
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
