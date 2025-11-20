import { Button } from '@/components/ui/button/Button';
import classes from './classViewToggler.module.scss';
import { List } from '@/components/ui/list/List';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CreateSubjectButton } from '@/components/admin/subjectButton/createSubjectButton/CreateSubjectButton';
import { Role } from '@/types/enums/RoleEnum';
import { CreateStudentButton } from '@/components/admin/studentButton/createStudentButton/CreateStudentButton';

export const ClassViewToggler = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { studentList } = useSelector((state: RootState) => state.student);
  const { subjectList } = useSelector((state: RootState) => state.subject);
  const [index, setIndex] = useState<number>(0);

  const views = [
    { label: 'Students', component: <List type="student" list={studentList} /> },
    { label: 'Subjects', component: <List type="subject" list={subjectList} /> },
  ];

  return (
    <main className={classes.view}>
      <div className={classes['view__buttons']}>
        <div className={classes['view__button-group']}>
          {views.map((item, index) => (
            <Button label={item.label} key={item.label} onClick={() => setIndex(index)} />
          ))}
        </div>
        <div className={classes['view__button-group']}>
          {user?.role === Role.Admin && <CreateSubjectButton />}
          {user?.role === Role.Admin && <CreateStudentButton />}
        </div>
      </div>
      <div className={classes['view__component']}>{views[index].component}</div>
    </main>
  );
};
