import { Button } from '@/components/ui/button/Button';
import classes from './classViewToggler.module.scss';
import { List } from '@/components/ui/list/List';
import { IClassComplete } from '@/types/interfaces/IClassComplete';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { CreateSubjectButton } from '@/components/admin/subjectButton/createSubjectButton/CreateSubjectButton';
import { Role } from '@/types/enums/RoleEnum';
import { CreateStudentButton } from '@/components/admin/studentButton/createStudentButton/CreateStudentButton';

type Props = {
  item: IClassComplete;
};

export const ClassViewToggler = ({ item }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [index, setIndex] = useState<number>(0);

  const views = [
    { label: 'Students', component: <List type="student" list={item.students} /> },
    { label: 'Subjects', component: <List type="subject" list={item.subjects} /> },
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
