'use client';
import { useSelector } from 'react-redux';
import classes from './header.module.scss';
import { RootState } from '@/redux/store';
import { HeaderItem } from './headerItem/HeaderItem';
import { HeaderLogoutButton } from './headerLogoutButton/HeaderLogoutButton';
import { Role } from '@/types/RoleEnum';

export const Header = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes.header}>
      <h2>Gradus</h2>
      {isLoading ? null : isAuthenticated ? (
        <div className={classes['header-group']}>
          {
            // Only Admins can create new users
            user && user.role === Role.Admin && <HeaderItem label="Create User" href="/register" />
          }
          <HeaderLogoutButton />
        </div>
      ) : (
        <div className={classes['header-group']}>
          <HeaderItem label="Login" href="/login" />
        </div>
      )}
    </div>
  );
};
