import { DeleteUserButton } from '@/components/admin/deleteUserButton/DeleteUserButton';
import classes from './listItem.module.scss';
import { IClassSimple } from '@/types/IClassSimple';
import { UpdateUserButton } from '@/components/admin/updateUserButton/UpdateUserButton';

type Props = {
  item: IClassSimple;
};

export const ClassListItem = ({ item }: Props) => {
  return (
    <div className={classes['item']}>
      <div className={classes['item__field']}>
        <p>Id</p>
        <p>{item.id}</p>
      </div>
      <div className={classes['item__field']}>
        <p>Name</p>
        <p>{item.name}</p>
      </div>
      <div className={classes['item__field']}>
        <p>School Year</p>
        <p>{item.schoolYear}</p>
      </div>
      <div className={classes['item__field']}>
        <p>Is Active</p>
        <p>{item.isActive === true ? 'Yes' : 'No'}</p>
      </div>
      <div className={classes['item__buttons']}>
        <p>Actions</p>
        <UpdateUserButton item={item} type={'class'} />
        <DeleteUserButton item={item} type={'class'} />
      </div>
    </div>
  );
};
