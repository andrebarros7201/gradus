"use client";

import { fetchUser } from '@/redux/slices/userSlice';
import { RootDispatch } from '@/redux/store';
import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  children: ReactNode | ReactNode[];
};

export const App = ({ children }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return <>{children}</>;
};
