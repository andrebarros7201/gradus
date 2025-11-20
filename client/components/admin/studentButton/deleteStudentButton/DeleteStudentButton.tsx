import { Button } from '@/components/ui/button/Button';
import { deleteStudent } from '@/redux/slices/currentClassSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/slices/INotificationSlice';
import { useDispatch } from 'react-redux';

type Props = {
  id: number;
};

export const DeleteStudentButton = ({ id }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  async function handleDelete() {
    try {
      const response = await dispatch(deleteStudent({ studentId: id })).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }
  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
