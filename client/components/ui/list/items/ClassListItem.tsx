import classes from './listItem.module.scss';
import { deleteClass } from '@/redux/slices/classSlice';
import { Button } from '@/components/ui/button/Button';
import { RootDispatch } from '@/redux/store';
import { IClassSimple } from '@/types/IClassSimple';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/redux/slices/notificationSlice';
import { INotification } from '@/types/INotificationSlice';

type Props = {
  item: IClassSimple;
};

export const ClassListItem = ({ item }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  async function handleDelete() {
    try {
      const response = await dispatch(deleteClass({ userId: item.userId })).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return (
    <div className={classes['item']}>
      <p>{item.id}</p>
      <p>{item.name}</p>
      <p>{item.schoolYear}</p>
      <p>{item.isActive === true ? 'Yes' : 'No'}</p>
      <div className={classes['item__buttons']}>
        <Button label={'Update'} variant="secondary" />
        <Button label={'Delete'} variant="danger" onClick={handleDelete} />
      </div>
    </div>
  );
};
