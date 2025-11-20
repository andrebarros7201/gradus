'use client';
import classes from './classDetails.module.scss';
import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';
import { IClassComplete } from '@/types/interfaces/IClassComplete';
import { UpdateUserButton } from '@/components/admin/userButton/updateUserButton/UpdateUserButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Role } from '@/types/enums/RoleEnum';
import { DeleteUserButton } from '@/components/admin/userButton/deleteUserButton/DeleteUserButton';

type Props = {
  item: IClassComplete;
};

export const ClassDetails = ({ item }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <main className={classes.classDetails}>
      <div className={classes['classDetails__button']}>
        <ButtonLink label={'Go Back'} href={'/dashboard/class'} />
        {user?.role === Role.Admin && <UpdateUserButton type={'class'} item={item} />}
        {user?.role === Role.Admin && <DeleteUserButton type={'class'} item={item} />}
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>Name</p>
        <p className={classes['classDetails__value']}>{item.name}</p>
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>School Year</p>
        <p className={classes['classDetails__value']}>{item.schoolYear}</p>
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>Is Active</p>
        <p className={classes['classDetails__value']}>{item.isActive === true ? 'Yes' : 'No'}</p>
      </div>
    </main>
  );
};
