import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';
import classes from './studentDetails.module.scss';
import { IStudentComplete } from '@/types/interfaces/IStudentComplete';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { UpdateStudentButton } from '@/components/admin/studentButton/updateStudentButton/UpdateStudentButton';
import { DeleteStudentButton } from '@/components/admin/studentButton/deleteStudentButton/DeleteStudentButton';
import { Role } from '@/types/enums/RoleEnum';
import { List } from '@/components/ui/list/List';

type Props = {
  student: IStudentComplete;
};

export const StudentDetails = ({ student }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <main className={classes.profile}>
      <div className={classes['profile__header']}>
        <div className={classes['profile__buttons']}>
          <ButtonLink label={'Go Back'} href={'/dashboard/class'} />
          {user?.role === Role.Admin && <UpdateStudentButton item={student} />}
          {user?.role === Role.Admin && <DeleteStudentButton id={student.id} />}
        </div>
        <div className={classes['profile__field']}>
          <p className={classes['profile__field-label']}>Name</p>
          <p className={classes['profile__field-value']}>{student.name}</p>
        </div>
        <div className={classes['profile__field']}>
          <p className={classes['profile__field-label']}>Class</p>
          <p className={classes['profile__field-value']}>{student.class.name}</p>
        </div>
        <div className={classes['profile__field']}>
          <p className={classes['profile__field-label']}>School Year</p>
          <p className={classes['profile__field-value']}>{student.class.schoolYear}</p>
        </div>
      </div>
      {student.grades.length > 0 ? (
        <List type="gradeStudent" list={student.grades} />
      ) : (
        <h3>This student does not have grades</h3>
      )}
    </main>
  );
};
