'use client';

import { CreateEvaluationButton } from '@/components/evaluation/createEvaluationButton/CreateEvaluationButton';
import { Page } from '@/components/page/Page';
import { SubjectDetails } from '@/components/subject/subjectDetails/SubjectDetails';
import { List } from '@/components/ui/list/List';
import { clearCurrentClass, fetchCurrentClass } from '@/redux/slices/currentClassSlice';
import { clearCurrentSubject, fetchCurrentSubject } from '@/redux/slices/subjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  params: Promise<{ subjectId: string; classId: string }>;
};
export default function SubjectPage({ params }: Props) {
  const { currentSubject, isLoading } = useSelector((state: RootState) => state.currentSubject);
  const { subjectId, classId } = use(params);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    try {
      dispatch(fetchCurrentSubject({ subjectId: Number.parseInt(subjectId) }));
      dispatch(fetchCurrentClass({ classId: Number(classId) }));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }

    return () => {
      dispatch(clearCurrentSubject());
      dispatch(clearCurrentClass());
    };
  }, [classId, dispatch, subjectId]);

  if (!isLoading && currentSubject) {
    return (
      <Page>
        <SubjectDetails item={currentSubject} />
        <CreateEvaluationButton />
        <List list={currentSubject.evaluations} type="evaluation" />
      </Page>
    );
  }
}
