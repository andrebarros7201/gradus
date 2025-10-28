import { Button } from '@/components/ui/button/Button';
import classes from './headerLogoutButton.module.scss';
import { RootDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { userLogout } from '@/redux/slices/userSlice';
import { showNotification } from '@/redux/slices/notificationSlice';

export const HeaderLogoutButton = () => {
  const dispatch = useDispatch<RootDispatch>();

  async function handleLogout() {
    try {
      dispatch(userLogout());
      dispatch(showNotification({ message: 'Logout successful!', type: 'success' }));
    } catch (err) {
      dispatch(showNotification({ message: (err as string) || 'Logout failed!', type: 'error' }));
    }
  }

  return <Button label={'Logout'} onClick={handleLogout} variant="primary" />;
};
