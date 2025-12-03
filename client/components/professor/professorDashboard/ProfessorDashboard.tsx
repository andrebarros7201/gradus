import classes from './professorDashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from '@/redux/store';
import { List } from '@/components/ui/list/List';
import { useEffect } from 'react';
import { setSubjectList } from '@/redux/slices/subjectSlice';

export const ProfessorDashboard = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { subjectList } = useSelector((state: RootState) => state.subject);
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {
    dispatch(setSubjectList({ subjectList: user!.professor!.subjects }));
  }, []);

  return (
    <main className={classes.dashboard}>
      <h3 className={classes['dashboard__title']}>Welcome, {user!.name}</h3>
      <List type="subject" list={subjectList!} />
    </main>
  );
};
