import classes from './headerAuthItems.module.scss';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { HeaderLogoutButton } from '../../headerLogoutButton/HeaderLogoutButton';
import { HeaderItem } from '../HeaderItem';

export const HeaderAuthItems = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  return (
    <div className={classes.wrapper}>
      {isAuthenticated ? <HeaderLogoutButton /> : <HeaderItem label="Login" href="/login" />}
    </div>
  );
};
