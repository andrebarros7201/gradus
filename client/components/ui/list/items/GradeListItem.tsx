import classes from './listItem.module.scss';
import { IGradeSimple } from '@/types/IGradeSimple';

type Props = {
  grade: IGradeSimple;
};

export const GradeListItem = ({ grade }: Props) => {
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
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        {/* TODO Create Update and Delete Button*/}
      </div>
    </div>
  );
};
