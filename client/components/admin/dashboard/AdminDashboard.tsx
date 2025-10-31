'use client';

import { Card } from '@/components/ui/card/Card';
import classes from './adminDashboard.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const AdminDashboard = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <main className={classes.dashboard}>
      <h3>Welcome back, {user?.name}</h3>
      <div className={classes['dashboard__cards']}>
        <Card label={'Classes'} description={'Manage classes'} href={'/dashboard/class'} />
        <Card label={'Classes'} description={'Manage classes'} href={'/dashboard/class'} />
        <Card label={'Classes'} description={'Manage classes'} href={'/dashboard/class'} />
      </div>
    </main>
  );
};
