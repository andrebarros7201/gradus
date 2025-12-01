'use client';

import { Page } from '@/components/page/Page';
import { StudentDetails } from '@/components/student/studentDetails/StudentDetails';
import { fetchCurrentStudent } from '@/redux/slices/studentSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  params: Promise<{ studentId: string }>;
};

export default function StudentPage({ params }: Props) {
  const { currentStudent, isLoading } = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch<RootDispatch>();
  const { studentId } = use(params);

  useEffect(() => {
    dispatch(fetchCurrentStudent({ studentId: Number(studentId) }));
  }, [dispatch, studentId]);

  if (!isLoading && currentStudent) {
    return (
      <Page needAuth={true}>
        <StudentDetails student={currentStudent} />
      </Page>
    );
  }
}
