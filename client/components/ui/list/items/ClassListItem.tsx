import { DeleteUserButton } from '@/components/admin/userButton/deleteUserButton/DeleteUserButton';
import classes from './listItem.module.scss';
import { IClassSimple } from '@/types/IClassSimple';
import { UpdateUserButton } from '@/components/admin/userButton/updateUserButton/UpdateUserButton';
import { usePathname } from 'next/navigation';
import { ButtonLink } from '../../buttonLink/ButtonLink';

type Props = {
  item: IClassSimple;
};

export const ClassListItem = ({ item }: Props) => {
  const pathname = usePathname();

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
        <p className={classes['item__label']}>School Year</p>
        <p>{item.schoolYear}</p>
      </div>
      <div className={classes['item__field']}>
        <p className={classes['item__label']}>Is Active</p>
        <p>{item.isActive === true ? 'Yes' : 'No'}</p>
      </div>
      <div className={classes['item__buttons']}>
        <p className={classes['item__label']}>Actions</p>
        <ButtonLink label={'Go to'} href={`${pathname}/${item.id}`} />
        <UpdateUserButton item={item} type={'class'} />
        <DeleteUserButton item={item} type={'class'} />
      </div>
    </div>
  );
};
