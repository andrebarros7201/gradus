'use client';

import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { Role } from '@/types/enums/RoleEnum';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  children: ReactNode | ReactNode[];
};

export const ProtectedRouteAdmin = ({ children }: Props) => {
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.user);
  const { isVisible } = useSelector((state: RootState) => state.notification);
  const dispatch = useDispatch<RootDispatch>();
  const router = useRouter();

  useEffect(() => {
    // Only check after loading finishes
    if (!isLoading) {
      if (!isAuthenticated || user?.role != Role.Admin) {
        router.replace('/login');

        // This fixes the logout notification overlap
        if (!isVisible)
          dispatch(setNotification({ type: 'error', message: 'Unauthorized to access this page' }));
      }
    }
  }, [dispatch, isAuthenticated, isLoading, isVisible, router, user]);

  if (!isAuthenticated) return null;

  if (!isAuthenticated || !user || user.role != Role.Admin) return null;

  return <>{children}</>;
};
