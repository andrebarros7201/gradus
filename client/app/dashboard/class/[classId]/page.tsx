'use client';

import classes from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/redux/store';
import { use, useEffect } from 'react';
import { clearCurrentClass, fetchCurrentClass } from '@/redux/slices/classSlice';
import { Page } from '@/components/page/Page';
import { ClassDetails } from '@/components/class/classDetails/ClassDetails';
import { ClassViewToggler } from '@/components/class/classViewToggler/ClassViewToggler';

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

    // Clear current class value on dismount
    return () => {
      dispatch(clearCurrentClass());
    };
  }, [dispatch, classId]);

  return (
    !isLoading &&
    currentClass && (
      <Page>
        <ClassDetails item={currentClass} />
        <ClassViewToggler item={currentClass} />
      </Page>
    )
  );
}
