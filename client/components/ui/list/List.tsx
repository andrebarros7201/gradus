import classes from './list.module.scss';
import { ISubjectSimple } from '@/types/interfaces/ISubjectSimple';
import { ClassListItem } from './items/ClassListItem';
import { SubjectListItem } from './items/SubjectListItem';
import { IStudentSimple } from '@/types/interfaces/IStudentSimple';
import { StudentListItem } from './items/StudentListItem';
import { EvaluationListItem } from './items/EvaluationListItem';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { GradeListItem } from './items/GradeListItem';
import { IClassSimple } from '@/types/interfaces/IClassSimple';
import { IEvaluation } from '@/types/interfaces/IEvaluation';

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

type Evaluation = {
  type: 'evaluation';
  list: IEvaluation[];
};

type Grade = {
  type: 'grade';
  list: IGradeSimple[];
};

type Props = Class | Subject | Student | Evaluation | Grade;

export const List = ({ type, list }: Props) => {
  // Get headers according to list type
  const headers =
    type === 'class'
      ? ['Id', 'Name', 'School Year', 'Is Active', 'Actions']
      : type === 'subject'
      ? ['Id', 'Name', 'Professor', 'Actions']
      : type === 'student'
      ? ['Id', 'Name', 'Actions']
      : type === 'evaluation'
      ? ['Id', 'Name', 'Date', 'Type', 'Action']
      : ['Id', 'Student', 'Value', 'Action'];

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
      {type === 'grade' && list.map((item) => <GradeListItem key={item.id} grade={item} />)}
      {type === 'evaluation' &&
        list.map((item) => <EvaluationListItem key={item.id} item={item} />)}
    </div>
  );
};
