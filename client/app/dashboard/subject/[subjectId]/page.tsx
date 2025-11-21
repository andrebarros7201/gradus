'use client';

import { CreateEvaluationButton } from '@/components/evaluation/createEvaluationButton/CreateEvaluationButton';
import { Page } from '@/components/page/Page';
import { SubjectDetails } from '@/components/subject/subjectDetails/SubjectDetails';
import { List } from '@/components/ui/list/List';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch, RootState } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { use, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentSubject, fetchCurrentSubject } from '@/redux/slices/subjectSlice';
import { clearCurrentClass, fetchCurrentClass } from '@/redux/slices/classSlice';
import { Role } from '@/types/enums/RoleEnum';

type Props = {
  params: Promise<{ subjectId: string; classId: string }>;
};
export default function SubjectPage({ params }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const { currentSubject, isLoading } = useSelector((state: RootState) => state.subject);
  const { evaluationList } = useSelector((state: RootState) => state.evaluation);
  const { subjectId } = use(params);
  const dispatch = useDispatch<RootDispatch>();

  // Fetch current subject on render
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

  // Fetch current class on render
  useEffect(() => {
    try {
      dispatch(fetchCurrentClass({ classId: currentSubject!.classId }));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }

    return () => {
      dispatch(clearCurrentClass());
    };
  }, [currentSubject, dispatch]);
  if (!isLoading && currentSubject) {
    return (
      <Page needAuth={true}>
        <SubjectDetails item={currentSubject} />
        {/* Only Professors and Admins can create evaluations */}
        {(user?.role === Role.Admin || user?.role === Role.Professor) && <CreateEvaluationButton />}
        <List list={evaluationList} type="evaluation" />
      </Page>
    );
  }
}
