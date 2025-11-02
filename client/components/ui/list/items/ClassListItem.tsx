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
      <p>{item.id}</p>
      <p>{item.name}</p>
      <p>{item.schoolYear}</p>
      <p>{item.isActive === true ? 'Yes' : 'No'}</p>
      <div className={classes['item__buttons']}>
        <UpdateUserButton item={item} type={'class'} />
        <DeleteUserButton item={item} type={'class'} />
      </div>
    </div>
  );
};
