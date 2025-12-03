'use client';

import { AdminDashboard } from '@/components/admin/dashboard/AdminDashboard';
import { Page } from '@/components/page/Page';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { Role } from '@/types/enums/RoleEnum';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessorDashboard } from '@/components/professor/professorDashboard/ProfessorDashboard';

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

  return (
    <Page>
      {/* Display different dashboards based on user role */}
      {user.role === Role.Admin && <AdminDashboard />}
      {user.role === Role.Professor && <ProfessorDashboard />}
    </Page>
  );
}
