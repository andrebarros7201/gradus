import { useSelector } from 'react-redux';
import classes from './listItem.module.scss';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { RootState } from '@/redux/store';
import { Role } from '@/types/enums/RoleEnum';
import { UpdateGradeButton } from '@/components/admin/gradeButton/updateGradeButton/UpdateGradeButton';
import { DeleteGradeButton } from '@/components/admin/gradeButton/deleteGradeButton/DeleteGradeButton';

type Props = {
  grade: IGradeSimple;
};

export const GradeListItem = ({ grade }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div className={classes['item']}>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Id</p>
        <p>{grade.id}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Name</p>
        <p>{grade.studentName}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Date</p>
        <p>{grade.value}</p>
      </div>
      {(user?.role === Role.Admin || user?.role === Role.Professor) && (
        <div className={classes['item__buttons']}>
          <p className={classes['item__label']}>Actions</p>
          <UpdateGradeButton grade={grade} />
          <DeleteGradeButton grade={grade} />
        </div>
      )}
    </div>
  );
};
