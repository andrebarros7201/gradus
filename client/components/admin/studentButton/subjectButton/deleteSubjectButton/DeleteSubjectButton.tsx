import { Button } from '@/components/ui/button/Button';
import { deleteCurrentSubject } from '@/redux/slices/currentSubjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { INotification } from '@/types/INotificationSlice';
import { ISubjectComplete } from '@/types/ISubjectComplete';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

type Props = {
  item: ISubjectComplete;
};

export const DeleteSubjectButton = ({ item }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  const router = useRouter();

  async function handleDelete() {
    try {
      const response = await dispatch(deleteCurrentSubject({ subjectId: item.id })).unwrap();
      dispatch(setNotification(response.notification));
      router.replace(`/dashboard/class/${item.classId}`);
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }
  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
