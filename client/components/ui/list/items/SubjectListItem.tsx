import classes from './listItem.module.scss';
import { Button } from '../../button/Button';
import { ISubjectSimple } from '@/types/ISubjectSimple';

type Props = {
  item: ISubjectSimple;
};

export const SubjectListItem = ({ item }: Props) => {
  return (
    <div className={classes['item']}>
      <p>{item.id}</p>
      <p>{item.name}</p>
      <p>{item.professor}</p>
      <div className={classes['item__buttons']}>
        <Button label={'Update'} variant="secondary" />
        <Button label={'Delete'} variant="danger" />
      </div>
    </div>
  );
};
