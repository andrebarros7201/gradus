import classes from './classListItem.module.scss';
import { Button } from '@/components/ui/button/Button';
import { IClassSimple } from '@/types/IClassSimple';

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
        <Button label={'Update'} variant="secondary" />
        <Button label={'Delete'} variant="danger" />
      </div>
    </div>
  );
};
