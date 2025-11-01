'use client';

import classes from './classList.module.scss';
import { RootState } from '@/redux/store';
import { IClassSimple } from '@/types/IClassSimple';
import { useSelector } from 'react-redux';
import { ClassListItem } from './classListItem/ClassListItem';

// TODO create a single reusable list component that accepts user/grade/class/subject list

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
