import classes from './subjectDetails.module.scss';
import { ISubjectComplete } from '@/types/interfaces/ISubjectComplete';
import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';
import { DeleteSubjectButton } from '@/components/admin/subjectButton/deleteSubjectButton/DeleteSubjectButton';
import { UpdateSubjectButton } from '@/components/admin/subjectButton/updateSubjectButton/UpdateSubjectButton';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Role } from '@/types/enums/RoleEnum';

type Props = {
  item: ISubjectComplete;
};

export const SubjectDetails = ({ item }: Props) => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <main className={classes['subjectDetails']}>
      <div className={classes['subjectDetails__button']}>
        <ButtonLink label={'Go Back'} href={`/dashboard/class/${item.classId}`} />
        {user?.role === Role.Admin && <UpdateSubjectButton item={item} />}
        {user?.role === Role.Admin && <DeleteSubjectButton item={item} />}
      </div>
      <div className={classes['subjectDetails__field']}>
        <p className={classes['subjectDetails__label']}>Name</p>
        <p className={classes['subjectDetails__value']}>{item.name}</p>
      </div>
      <div className={classes['subjectDetails__field']}>
        <p className={classes['subjectDetails__label']}>Professor</p>
        <p className={classes['subjectDetails__value']}>{item.professor}</p>
      </div>
      <div className={classes['subjectDetails__field']}>
        <p className={classes['subjectDetails__label']}>Class</p>
        <p className={classes['subjectDetails__value']}>{item.class}</p>
      </div>
    </main>
  );
};
