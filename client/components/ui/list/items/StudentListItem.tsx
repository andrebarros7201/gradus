import classes from './listItem.module.scss';
import { IStudentSimple } from '@/types/IStudentSimple';
import { Button } from '../../button/Button';
import { ButtonLink } from '../../buttonLink/ButtonLink';

type Props = {
  item: IStudentSimple;
};

export const StudentListItem = ({ item }: Props) => {
  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
  }

  async function handleUpdate(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();
  }

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
        <Button label={'Update'} variant="secondary" onClick={handleUpdate} />
        <Button label={'Delete'} variant={'danger'} onClick={handleDelete} />
        <ButtonLink label={'Go to'} href={`/student/${item.id}`} />
      </div>
    </div>
  );
};
