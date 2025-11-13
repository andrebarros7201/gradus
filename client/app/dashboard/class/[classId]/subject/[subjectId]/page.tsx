'use client';

import { clearCurrentSubject, fetchCurrentSubject } from '@/redux/slices/currentSubject';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { use, useEffect } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  params: Promise<{ subjectId: string }>;
};
export default function SubjectPage({ params }: Props) {
  const { subjectId } = use(params);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    try {
      dispatch(fetchCurrentSubject({ subjectId: Number.parseInt(subjectId) }));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }

    return () => {
      dispatch(clearCurrentSubject());
    };
  }, [dispatch, subjectId]);

  return <h2>{subjectId}</h2>;
}
