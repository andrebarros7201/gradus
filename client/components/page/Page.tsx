import { ReactNode, useEffect } from 'react';
import classes from './page.module.scss';
import { RootDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setNotification } from '@/redux/slices/notificationSlice';

type Props = {
  children: ReactNode | ReactNode[];
  needAuth?: boolean;
};

export const Page = ({ children, needAuth }: Props) => {
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<RootDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (needAuth && !isAuthenticated && !isLoading) {
      router.replace('/login');
      dispatch(setNotification({ type: 'error', message: 'Unauthorized' }));
    }
  }, [dispatch, isAuthenticated, isLoading, needAuth, router]);

  return <main className={classes['page__wrapper']}>{children}</main>;
};
