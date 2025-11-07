import classes from './listItem.module.scss';
import { Button } from '../../button/Button';
import { ISubjectSimple } from '@/types/ISubjectSimple';
import { ButtonLink } from '../../buttonLink/ButtonLink';

type Props = {
  item: ISubjectSimple;
};

export const SubjectListItem = ({ item }: Props) => {
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
        <p className={classes['item__label']}>Professor</p>
        <p>{item.professor}</p>
      </div>
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        <Button label={'Update'} variant="secondary" />
        <Button label={'Delete'} variant="danger" />
        <ButtonLink label={'Go to'} href={`/subject/${item.id}`} />
      </div>
    </div>
  );
};
