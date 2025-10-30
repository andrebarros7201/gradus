import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { Role } from '@/types/RoleEnum';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: ReactNode | ReactNode[];
};

export const ProtectedRouteAdmin = ({ children }: Props) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<RootDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role != Role.Admin) {
      router.replace('/login');
      dispatch(setNotification({ type: 'error', message: 'Unauthorized to access this page' }));
    }
  }, [dispatch, isAuthenticated, router, user]);

  if (!isAuthenticated) return null;

  if (!user || user.role != Role.Admin) return null;

  return <>{children}</>;
};
