import classes from './listItem.module.scss';
import { Button } from '../../button/Button';
import { ISubjectSimple } from '@/types/ISubjectSimple';

type Props = {
  item: ISubjectSimple;
};

export const SubjectListItem = ({ item }: Props) => {
  return (
    <div className={classes['item']}>
      <div>
        <p className={classes['item__label']}>Id</p>
        <p>{item.id}</p>
      </div>
      <div>
        <p className={classes['item__label']}>Name</p>
        <p>{item.name}</p>
      </div>
      <div>
        <p className={classes['item__label']}>Professor</p>
        <p>{item.professor}</p>
      </div>
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        <Button label={'Update'} variant="secondary" />
        <Button label={'Delete'} variant="danger" />
      </div>
    </div>
  );
};
