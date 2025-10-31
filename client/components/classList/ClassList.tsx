'use client';

import classes from './classList.module.scss';
import { RootState } from '@/redux/store';
import { IClassSimple } from '@/types/IClass';
import { useSelector } from 'react-redux';
import { ClassListItem } from './classListItem/ClassListItem';

export const ClassList = () => {
  const { classes: classList } = useSelector((state: RootState) => state.class);

  return (
    <main className={classes['list']}>
      <div className={classes['list__header']}>
        <p>ID</p>
        <p>Name</p>
        <p>School Year</p>
        <p>Is Active</p>
        <p>Actions</p>
      </div>
      {classList.map((item: IClassSimple) => (
        <ClassListItem key={item.id} item={item} />
      ))}
    </main>
  );
};
