'use client';

import classes from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/redux/store';
import { use, useEffect } from 'react';
import { Page } from '@/components/page/Page';
import { ClassDetails } from '@/components/class/classDetails/ClassDetails';
import { ClassViewToggler } from '@/components/class/classViewToggler/ClassViewToggler';
import { clearCurrentClass, fetchCurrentClass } from '@/redux/slices/classSlice';
import { clearSubjectList } from '@/redux/slices/subjectSlice';
import { clearStudentList } from '@/redux/slices/studentSlice';

type Props = {
  params: Promise<{ classId: string }>;
};

export default function ClassPage({ params }: Props) {
  const { currentClass, isLoading } = useSelector((state: RootState) => state.class);
  const { classId } = use(params);
  const dispatch = useDispatch<RootDispatch>();

  // Fetch Current Class
  useEffect(() => {
    dispatch(fetchCurrentClass({ classId: Number(classId) }));

    return () => {
      dispatch(clearCurrentClass());
      dispatch(clearSubjectList());
      dispatch(clearStudentList());
    };
  }, [dispatch, classId]);

  if (!isLoading && currentClass) {
    return (
      <Page needAuth={true}>
        <ClassDetails />
        <ClassViewToggler />
      </Page>
    );
  }
}
