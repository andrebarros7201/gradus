import classes from './subjectDetails.module.scss';
import { ISubjectComplete } from '@/types/ISubjectComplete';
import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';

type Props = {
  item: ISubjectComplete;
};

export const SubjectDetails = ({ item }: Props) => {
  return (
    <main className={classes['subjectDetails']}>
      <div className={classes['subjectDetails__button']}>
        <ButtonLink label={'Go Back'} href={`/dashboard/class/${item.classId}`} />
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
