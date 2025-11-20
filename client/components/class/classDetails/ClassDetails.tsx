'use client';
import classes from './classDetails.module.scss';
import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';
import { UpdateUserButton } from '@/components/admin/userButton/updateUserButton/UpdateUserButton';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Role } from '@/types/enums/RoleEnum';
import { DeleteUserButton } from '@/components/admin/userButton/deleteUserButton/DeleteUserButton';

export const ClassDetails = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { currentClass } = useSelector((state: RootState) => state.class);

  return (
    <main className={classes.classDetails}>
      <div className={classes['classDetails__button']}>
        <ButtonLink label={'Go Back'} href={'/dashboard/class'} />
        {user?.role === Role.Admin && <UpdateUserButton type={'class'} item={currentClass} />}
        {user?.role === Role.Admin && <DeleteUserButton type={'class'} item={currentClass} />}
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>Name</p>
        <p className={classes['classDetails__value']}>{currentClass!.name}</p>
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>School Year</p>
        <p className={classes['classDetails__value']}>{currentClass!.schoolYear}</p>
      </div>
      <div className={classes['classDetails__field']}>
        <p className={classes['classDetails__label']}>Is Active</p>
        <p className={classes['classDetails__value']}>
          {currentClass!.isActive === true ? 'Yes' : 'No'}
        </p>
      </div>
    </main>
  );
};
