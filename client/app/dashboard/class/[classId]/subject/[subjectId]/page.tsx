'use client';

import { Page } from '@/components/page/Page';
import { SubjectDetails } from '@/components/subject/subjectDetails/SubjectDetails';
import { clearCurrentSubject, fetchCurrentSubject } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  params: Promise<{ subjectId: string }>;
};
export default function SubjectPage({ params }: Props) {
  const { currentSubject, isLoading } = useSelector((state: RootState) => state.currentSubject);
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

  if (!isLoading && currentSubject) {
    return (
      <Page>
        <SubjectDetails item={currentSubject} />
      </Page>
    );
  }
}
