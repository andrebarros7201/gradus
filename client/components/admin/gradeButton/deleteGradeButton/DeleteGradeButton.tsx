import { Button } from '@/components/ui/button/Button';
import { deleteGrade } from '@/redux/slices/subjectSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { INotification } from '@/types/slices/INotificationSlice';
import { useDispatch } from 'react-redux';

type Props = {
  grade: IGradeSimple;
};
export const DeleteGradeButton = ({ grade }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  async function handleDelete() {
    try {
      const response = await dispatch(
        deleteGrade({ gradeId: grade.id, evaluationId: grade.evaluationId }),
      ).unwrap();
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }
  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
