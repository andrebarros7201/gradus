import classes from './listItem.module.scss';
import { IStudentSimple } from '@/types/IStudentSimple';
import { Button } from '../../button/Button';
import { ButtonLink } from '../../buttonLink/ButtonLink';
import { UpdateStudentButton } from '@/components/admin/studentButton/UpdateStudentButton/UpdateStudentButton';

type Props = {
  item: IStudentSimple;
};

export const StudentListItem = ({ item }: Props) => {
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
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        <UpdateStudentButton item={item} />
        <Button label={'Delete'} variant={'danger'} />
        <ButtonLink label={'Go to'} href={`/student/${item.id}`} />
      </div>
    </div>
  );
};
