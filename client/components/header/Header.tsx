'use client';
import { useSelector } from 'react-redux';
import classes from './header.module.scss';
import { RootState } from '@/redux/store';
import { HeaderItem } from './headerItem/HeaderItem';
import { HeaderLogoutButton } from './headerLogoutButton/HeaderLogoutButton';

export const Header = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes.header}>
      <h2>Gradus</h2>
      {isAuthenticated ? (
        <div className={classes['header-group']}>
          <HeaderLogoutButton />
        </div>
      ) : (
        <div className={classes['header-group']}>
          <HeaderItem label="Register" href="/register" />
          <HeaderItem label="Login" href="/login" />
        </div>
      )}
    </div>
  );
};
