'use client';

import classes from './page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/redux/store';
import { use, useEffect } from 'react';
import { clearCurrentClass, fetchCurrentClass } from '@/redux/slices/classSlice';

type Props = {
  params: Promise<{ classId: string }>;
};

export default function ClassPage({ params }: Props) {
  const { currentClass } = useSelector((state: RootState) => state.class);
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

  return <main>{currentClass?.name}</main>;
}
