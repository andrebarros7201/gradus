"use client";

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

type Props = {
  children: ReactNode | ReactNode[];
};

export const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};
