import { Button } from '@/components/ui/button/Button';
import { setNotification } from '@/redux/slices/notificationSlice';
import { deleteUser } from '@/redux/slices/userSlice';
import { RootDispatch } from '@/redux/store';
import { IClassSimple } from '@/types/IClassSimple';
import { INotification } from '@/types/INotificationSlice';
import { useDispatch } from 'react-redux';

type ClassProps = {
  type: 'class';
  item: IClassSimple;
};

type Props = ClassProps;

export const DeleteUserButton = ({ item, type }: Props) => {
  const dispatch = useDispatch<RootDispatch>();

  async function handleDelete() {
    try {
      const response = await dispatch(deleteUser({ userId: item.userId, type })).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }

  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
