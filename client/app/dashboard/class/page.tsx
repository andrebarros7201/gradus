'use client';

import { ClassList } from '@/components/classList/ClassList';
import { Page } from '@/components/page/Page';
import { fetchAllClasses } from '@/redux/slices/classSlice';
import { RootDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ClassPage() {
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(fetchAllClasses());
  }, [dispatch]);

  return (
    <Page>
      <h3>Class Management</h3>
      <ClassList/>
    </Page>
  );
}
