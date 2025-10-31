'use client';
import { useSelector } from 'react-redux';
import classes from './header.module.scss';
import { RootState } from '@/redux/store';
import { HeaderItem } from './headerItem/HeaderItem';
import { Role } from '@/types/RoleEnum';
import { HeaderAuthItems } from './headerItem/authHeaderItems/HeaderAuthItems';

export const Header = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes.header}>
      <h2>Gradus</h2>
      {isLoading
        ? null // Don't render if still loading
        : isAuthenticated && (
            <div className={classes['header-group']}>
              <HeaderItem label={'Dashboard'} href={'/dashboard'} />
              {
                // Only Admins can create new users
                user && user.role === Role.Admin && (
                  <HeaderItem label="Create User" href="/register" />
                )
              }
            </div>
          )}
      <HeaderAuthItems />
    </div>
  );
};
