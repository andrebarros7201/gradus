import { Button } from '@/components/ui/button/Button';
import { deleteGrade as deleteGradeEvaluation } from '@/redux/slices/evaluationSlice';
import { deleteGrade as deleteGradeStudent } from '@/redux/slices/studentSlice';
import { setNotification } from '@/redux/slices/notificationSlice';
import { RootDispatch } from '@/redux/store';
import { IGradeSimple } from '@/types/interfaces/IGradeSimple';
import { INotification } from '@/types/slices/INotificationSlice';
import { useDispatch } from 'react-redux';

type Props = {
  grade: IGradeSimple;
  fromStudent?: boolean;
};
export const DeleteGradeButton = ({ grade, fromStudent = false }: Props) => {
  const dispatch = useDispatch<RootDispatch>();
  async function handleDelete() {
    try {
      let response;
      if (fromStudent) {
        response = await dispatch(deleteGradeStudent({ gradeId: grade.id })).unwrap();
      } else {
        response = await dispatch(
          deleteGradeEvaluation({ gradeId: grade.id, evaluationId: grade.evaluationId }),
        ).unwrap();
      }
      const { notification } = response;
      dispatch(setNotification(notification));
    } catch (e) {
      const error = e as { notification: INotification };
      dispatch(setNotification(error.notification));
    }
  }
  return <Button label={'Delete'} variant="danger" onClick={handleDelete} />;
};
