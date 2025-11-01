'use client';

import classes from './classList.module.scss';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { List } from '../ui/list/List';

export const ClassList = () => {
  const { classes: classList } = useSelector((state: RootState) => state.class);

  return (
    <main className={classes['list']}>
    <List type={'class'} list={classList} />
    </main>
  );
};
