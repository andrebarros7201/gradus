import classes from './list.module.scss';
import { ISubjectSimple } from '@/types/interfaces/ISubjectSimple';
import { ClassListItem } from './items/ClassListItem';
import { SubjectListItem } from './items/SubjectListItem';
import { IStudentSimple } from '@/types/interfaces/IStudentSimple';
import { StudentListItem } from './items/StudentListItem';
import { EvaluationListItem } from './items/EvaluationListItem';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { GradeClassListItem } from './items/GradeClassListItem';
import { IClassSimple } from '@/types/interfaces/IClassSimple';
import { IEvaluation } from '@/types/interfaces/IEvaluation';
import { GradeStudentListItem } from './items/GradeStudentListItem';

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

type GradeClass = {
  type: 'gradeClass';
  list: IGradeSimple[];
};

type GradeStudent = {
  type: 'gradeStudent';
  list: IGradeSimple[];
};

type Props = Class | Subject | Student | Evaluation | GradeClass | GradeStudent;

export const List = ({ type, list }: Props) => {
  // Get headers according to list type
  const headers =
    type === 'class'
      ? ['Id', 'Name', 'School Year', 'Is Active', 'Actions']
      : type === 'subject'
      ? ['Id', 'Name', 'Professor', 'Actions']
      : type === 'student'
      ? ['Id', 'Name', 'Class', 'Actions']
      : type === 'evaluation'
      ? ['Id', 'Name', 'Date', 'Type', 'Action']
      : type === 'gradeClass'
      ? ['Id', 'Student', 'Value', 'Action']
      : ['Id', 'Subject', 'Value', 'Action'];

  return (
    <div className={classes.list}>
      <div className={classes['list__header']}>
        {headers.map((header) => {
          if (header === 'Class' && type === 'student' && list[0]?.className === null) {
            return;
          }
          return (
            <p key={header} className={classes['list__header-item']}>
              {header}
            </p>
          );
        })}
      </div>
      {type === 'class' && list.map((item) => <ClassListItem key={item.id} item={item} />)}
      {type === 'subject' && list.map((item) => <SubjectListItem key={item.id} item={item} />)}
      {type === 'student' && list.map((item) => <StudentListItem key={item.id} item={item} />)}
      {type === 'gradeClass' &&
        list.map((item) => <GradeClassListItem key={item.id} grade={item} />)}
      {type === 'gradeStudent' &&
        list.map((item) => <GradeStudentListItem key={item.id} grade={item} />)}
      {type === 'evaluation' &&
        list.map((item) => <EvaluationListItem key={item.id} item={item} />)}
    </div>
  );
};
