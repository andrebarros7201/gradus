import classes from './list.module.scss';
import { IClassSimple } from '@/types/IClassSimple';
import { ISubjectSimple } from '@/types/ISubjectSimple';
import { ClassListItem } from './items/ClassListItem';
import { SubjectListItem } from './items/SubjectListItem';
import { IStudentSimple } from '@/types/IStudentSimple';
import { StudentListItem } from './items/StudentListItem';

type Class = {
  type: 'class';
  list: IClassSimple[];
};

type Subject = {
  type: 'subject';
  list: ISubjectSimple[];
};

type Student = {
  type: 'student';
  list: IStudentSimple[];
};

type Props = Class | Subject | Student;

export const List = ({ type, list }: Props) => {
  // Get headers according to list type
  const headers =
    type === 'class'
      ? ['Id', 'Name', 'School Year', 'Is Active', 'Actions']
      : type === 'subject'
      ? ['Id', 'Name', 'Professor', 'Actions']
      : type === 'student'
      ? ['Id', 'Name', 'Actions']
      : [];

  return (
    <div className={classes.list}>
      <div className={classes['list__header']}>
        {headers.map((header) => (
          <p key={header} className={classes['list__header-item']}>
            {header}
          </p>
        ))}
      </div>
      {type === 'class' && list.map((item) => <ClassListItem key={item.id} item={item} />)}
      {type === 'subject' && list.map((item) => <SubjectListItem key={item.id} item={item} />)}
      {type === 'student' && list.map((item) => <StudentListItem key={item.id} item={item} />)}
    </div>
  );
};
