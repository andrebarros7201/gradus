import { ButtonLink } from '@/components/ui/buttonLink/ButtonLink';
import classes from './classDetails.module.scss';

import { IClassComplete } from '@/types/IClassComplete';

type Props = {
  item: IClassComplete;
};

export const ClassDetails = ({ item }: Props) => {
  return (
    <main className={classes.classDetails}>
      <div className={classes['classDetails__button']}>
        <ButtonLink label={'Go Back'} href={'/dashboard/class'} />
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
