'use client';

import { AdminDashboard } from '@/components/admin/dashboard/AdminDashboard';
import { Page } from '@/components/page/Page';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { Role } from '@/types/RoleEnum';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      dispatch(setNotification({ type: 'error', message: 'Unauthorized' }));
      router.replace('/login');
    }
  }, [dispatch, isAuthenticated, router, user]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return <Page>{user.role === Role.Admin ? <AdminDashboard /> : null}</Page>;
}
