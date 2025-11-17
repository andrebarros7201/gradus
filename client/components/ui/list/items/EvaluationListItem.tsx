import classes from './listItem.module.scss';
import { IEvaluation } from '@/types/IEvaluation';
import { EvaluationType } from '@/types/EvaluationEnum';

type Props = {
  item: IEvaluation;
};

export const EvaluationListItem = ({ item }: Props) => {
  return (
    <div className={classes['item']}>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Id</p>
        <p>{item.id}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Name</p>
        <p>{item.name}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Date</p>
        <p>{item.date}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Type</p>
        <p>{item.evaluationType === EvaluationType.Exam ? 'Exam' : 'Presentation'}</p>
      </div>
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        {/* TODO Create Update and Delete Button*/}
      </div>
    </div>
  );
};
